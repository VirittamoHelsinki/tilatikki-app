import React, { useEffect, useState } from 'react'
import { Container, Box, TextField, Button, Typography, FormLabel } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/de';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const timeSlots = [
	'06:00', '06:15', '06:30', '06:45', '07:00', '07:15', '07:30', '07:45',
	'08:00', '08:15', '08:30', '08:45', '09:00', '09:15', '09:30', '09:45',
	'10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45',
	'12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45',
	'14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45',
	'16:00', '16:15', '16:30', '16:45', '17:00', '17:15', '17:30', '17:45',
	'18:00', '18:15', '18:30', '18:45', '19:00', '19:15', '19:30', '19:45',
	'20:00', '20:15', '20:30', '20:45',	'21:00', '21:15', '21:30', '21:45',
	'22:00', '22:15', '22:30', '22:45'
  ];

const groupSizes = Array.from({ length: 20 }, (_, index) => (index + 1) * 5);


const FilterForm = ({onClassroomChange, schoolData}) => {
	const [selectedBuildings, setSelectedBuildings] = useState([]);
	const [availableFloors, setAvailableFloors] = useState([1]);
	const [selectedFloor, setSelectedFloor] = useState('');
	const [startingTime, setStartingTime] = useState('');
	const [endingTime, setEndingTime] = useState('');
	const [selectedGroupSize, setSelectedGroupSize] = useState('');
	const [classroom, setClassroom] = useState('');
	const [availableClassrooms, setAvailableClassrooms] = useState([]);
	const [selectedDate, setSelectedDate] = useState(null);
	const [required, setRequired] = useState(false);
	const [requiredEndTime, setRequiredEndTime] = useState(false);

	const handleSelectedBuildings = (event) => {
		const {
			target: { value },
		} = event;

		const selectedValues = typeof value === 'string' ? value.split(',') : value;
		const selectedBuildingObjects = selectedValues.map((name) =>
			schoolData.buildings.find((building) => building.name === name)
		);
		setSelectedBuildings(selectedBuildingObjects);
		setRequired(false);
	};

	const handleSelectedFloor = (event) => {
		setSelectedFloor(event.target.value);
		setClassroom('');
	};

	const handleStartingTime = (e) => {
		setStartingTime(e.target.value);
		if (endingTime) {
			if (e.target.value >= endingTime) {
				setEndingTime('');
			}
		}
	}

	const handleEndingTime = (e) => {
		setEndingTime(e.target.value);
		setRequiredEndTime(false);
	}

	const handleGroupSize = (e) => {
		setSelectedGroupSize(e.target.value);
	}

	const handleClassroom = (e) => {
		setClassroom(e.target.value);
	}

	const handleAvailableClassrooms = () => {
		let allRooms = [];

		selectedBuildings.forEach((building) => {
			if (selectedFloor != '') {

				const floorObject = building.floors.find(floor => floor.number === selectedFloor);
				if (floorObject) {
					allRooms = allRooms.concat(floorObject.rooms.map((room) => `${building.name} - ${room.number} - ${selectedFloor}`));
				}
			}
			else {
				building.floors.forEach((floor) => {
					allRooms = allRooms.concat(floor.rooms.map((room) => `${building.name} - ${room.number} - ${floor.number}`));
				});
			}
		})
		setAvailableClassrooms(allRooms);
	}

	const generateFloorList = (maxFloor) => {
		return Array.from({ length: maxFloor }, (_, index) => index + 1);
	}

	const filterByBuilding = () => {
		return schoolData.buildings.filter(schoolBuilding => selectedBuildings.some(selectedBuilding => selectedBuilding.name === schoolBuilding.name));
	};

	const filterByRoomCapacity = (classrooms) => {
		if (selectedGroupSize) {
			return classrooms.filter(room => room.capacity >= selectedGroupSize);
		}
		return classrooms;
	};

	const filterByClassroomOrFloor = (buildings) => {
		let classrooms = [];

		buildings.forEach((building) => {
			if (classroom) {
				const parts = classroom.split(' - ');
				const buildingName = parts[0];
				const className = parts[1];
				const floorNumber = parseInt(parts[2]);

				if (building.name === buildingName) {
					building.floors.forEach((floor) => {
						if (floor.number === floorNumber) {
							floor.rooms.forEach((room) => {
								if (room.number === className) {
									classrooms.push(room);
								}
							})
						}
					})
				}
			}
			else {
				building.floors.forEach((floor) => {
					if (!selectedFloor || floor.number === selectedFloor) {
						classrooms = classrooms.concat(floor.rooms);
					}
				})
			}
		})
		return classrooms;
	};

	const isSameDate = (date1, date2) => {
		if (date1.getFullYear() == date2.getFullYear() &&
		date1.getMonth() == date2.getMonth() &&
		date1.getDate() == date2.getDate()) {
			return true;
		}
		return false;
	}

	// format the date to match timeslots format -> '08:15'
	const formatTimestringToTimeslot = (timestring) => {
		const timeObject = new Date(timestring);
		const hour = timeObject.getHours();
		const minutes = timeObject.getMinutes();
		const paddedMinutes = String(minutes).padStart(2, '0');
		const paddedHour = String(hour).padStart(2, '0');

		return `${paddedHour}:${paddedMinutes}`;
	};

	const isWithinTimeslot = (time, startTime, endTime) => {
		return time >= startTime && time < endTime;
	}

	const createRoomTimeslotOccupancy = (room, selectedDay) => {
		const roomTimeslots = [];

		for (let i = 0; i < timeSlots.length; i++) {
			roomTimeslots.push({
				time: timeSlots[i],
				occupancy: 0,
				isFull: false,
			});
		};

		room.reservations.forEach((reservation) => {
			// if sameday reservation found, add occupancies to roomTimeslots
			if (isSameDate(selectedDay, new Date(reservation.startTime))) {
				const startTime = formatTimestringToTimeslot(reservation.startTime);
				const endTime = formatTimestringToTimeslot(reservation.endTime);

				console.log('reservation', reservation);

				// add groupsize to timeslot occupancy-property
				for (let i = 0; i < roomTimeslots.length; i++) {
					if (isWithinTimeslot(roomTimeslots[i].time, startTime, endTime)) {
						roomTimeslots[i].occupancy += reservation.groupsize;

						if (roomTimeslots[i].occupancy >= room.capacity) {
							roomTimeslots[i].isFull = true;
						}
					}
				}
			}
		})
		return roomTimeslots;
	};

	const roomHasAnyFreeTimeslot = (room) => {
		if (room.reservations.length == 0) {
			return true;
		}

		const roomTimeSlots = createRoomTimeslotOccupancy(room, selectedDate.$d);
		return roomTimeSlots.some((time) => {
			if (selectedGroupSize) {
				if (selectedGroupSize + time.occupancy < room.capacity) {
					return true;
				}
				return false;
			}
			else if (!time.isFull) {
				return true;
			}
			return false;
		});
	};

	const filterByDate = (classrooms) => {
		let filteredClassrooms = [];
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		if (selectedDate) {
			if (selectedDate.$d >= today) {
				classrooms.forEach((room) => {
					if (roomHasAnyFreeTimeslot(room)) {
						filteredClassrooms = filteredClassrooms.concat(room);
					}
				})
			}
		}
		// no date selected, add all rooms
		else {
			filteredClassrooms = [...classrooms];
		}
		return filteredClassrooms;
	};

	const filterResults = () => {
		const buildings = filterByBuilding();
		let classrooms = filterByClassroomOrFloor(buildings);
		classrooms = filterByRoomCapacity(classrooms);
		classrooms = filterByDate(classrooms);

		console.log('classrooms', classrooms);

		onClassroomChange(classrooms);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const filterData = {
			selectedBuildings,
			selectedFloor,
			selectedDate,
			startingTime,
			endingTime,
			selectedGroupSize,
			classroom,
		}

		if (selectedBuildings.length > 0) {
			if (startingTime && !endingTime) {
				setRequiredEndTime(true);
			}
			else {
				filterResults();
				// // clears form when sent
				// resetStates();

				// not needed if resetStates() is called
				setRequired(false);
				setRequiredEndTime(false);
			}
		}
		else if (startingTime && !endingTime) {
			setRequiredEndTime(true);
			setRequired(true);
		}
		else {
			setRequired(true);
		}
	}

	const checkRequired = () => {
		if (startingTime && !endingTime) {
			setRequiredEndTime(true);
		}
	}

	const resetStates = () => {
		setSelectedBuildings([]);
		setAvailableFloors([1]);
		setSelectedFloor('');
		setStartingTime('');
		setEndingTime('');
		setSelectedGroupSize('');
		setClassroom('');
		setAvailableClassrooms([]);
		setSelectedDate(null);
		setRequired(false);
		setRequiredEndTime(false);
	}

	const handleStartingDateChange = (newDate) => {
		setSelectedDate(newDate);
	}

	useEffect(() => {
		console.log('schoolData', schoolData);

		const maxFloorValue = selectedBuildings.reduce((max, building) =>
			Object.keys(building.floors).length > max ? Object.keys(building.floors).length : max, 1
		)

		setAvailableFloors(generateFloorList(maxFloorValue));
		if (selectedBuildings.length == 0) {
			setSelectedFloor('');
			setAvailableClassrooms([]);
		}
		else {
			if (selectedFloor > maxFloorValue) {
				setSelectedFloor('');
			}
			handleAvailableClassrooms();
		}
		setClassroom('');
	  }, [selectedBuildings, selectedFloor]);

	const filterFieldContainer = {
		display: 'flex',
		gap: '7%',
		alignItems: 'center'
	};

	const timeSlotStyle = {
		display: 'flex',
		flexDirection: 'column',
		minWidth: '50px',
		maxWidth: '100px',
		paddingLeft: '10px',
		paddingTop: '10px'
	};

	const buildingStyle = {
		display: 'flex',
		flexDirection: 'column',
		paddingTop: '10px',
		paddingBottom: '10px',
		width: '80%'
	};

	const groupStyle = {
		display: 'flex',
		flexDirection: 'column'
	};

	const sizeStyle = {
		paddingRight: '10px',
		marginTop: '4%'
	};

	const selectWrapper = {
		display: 'flex',
		flexDirection: 'column',
		width: '310px',
		paddingLeft: '8px'
	};

	const buildingStyleLeft = {
		paddingTop: '20px'
	};

	const dateStyle = {
		paddingTop: '15px'
	};

	const floorStyle = {
		marginTop: '4%'
	};

	const clearButtonStyle = {
		marginLeft: '10px',
		marginTop: '10px',
		border: 'none',
		background: 'none',
		textDecoration: 'underline',
		cursor: 'pointer',
		padding: '0',
		fontSize: 'inherit'
	};

	return (
		<>
		<Typography variant="h6" gutterBottom>
			 {schoolData.name}
		</Typography>
		<Typography variant="h7" gutterBottom>
			 {schoolData.address}
		</Typography>

		<form onSubmit={handleSubmit}>
			<div style={filterFieldContainer}>
				<div style={buildingStyle, buildingStyleLeft}>
					<FormControl sx={{ m: 1, width: 200 }}>
					<FormLabel required id="building-top-label">Rakennus</FormLabel>
					<InputLabel id="building-checkbox-label" > </InputLabel>
						<Select
							labelId="building-checkbox-label"
							id="building-multiple-checkbox"
							multiple
							value={selectedBuildings.map(building => building.name)}
							onChange={handleSelectedBuildings}
							input={<OutlinedInput label="Rakennus" />}
							renderValue={(selected) => (
								<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
								{selected.map((value) => (
									<Chip key={value} label={value} />
									))}
								</Box>
							)}
							MenuProps={MenuProps}
							>
							{schoolData.buildings.map((building) => (
								<MenuItem key={building.name} value={building.name}>
								<Checkbox checked={selectedBuildings.some((selected) => selected.name === building.name)} />
								<ListItemText primary={building.name} />
							</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
				<div style={buildingStyle, floorStyle}>
					<InputLabel id="floor-select-label">Kerros</InputLabel>
						<Select
							labelId="floor-select-label"
							id="floor-select"
							label="Kerros"
							value={selectedFloor}
							onChange={handleSelectedFloor}
							input={<OutlinedInput label="Kerros" />}
							MenuProps={MenuProps}
							>
							{availableFloors.map((floor) => (
								<MenuItem key={floor} value={floor}>
									<ListItemText primary={floor} />
								</MenuItem>
							))}
						</Select>
				</div>
			</div>

			<>
				{required && (
					<p style={{color: 'red', paddingLeft: '10px', marginTop: '0', marginBottom: '20px',
					fontFamily: "Helvetica"}}>
						*Pakollinen
					</p>
				)}
			</>

			<div style={dateStyle}>
				<Box sx={selectWrapper}>
					<FormLabel id="date-top-label">Päivämäärä</FormLabel>
					<LocalizationProvider dateAdapter={AdapterDayjs} >
					<DatePicker
						// label="Päivämäärä"
						value={selectedDate}
						onChange={handleStartingDateChange}
						format="DD.MM.YYYY"
						slotProps={{
						textField: { fullWidth: true },
						}}
					/>
					</LocalizationProvider>
				</Box>
			</div>

			{/* V1 with endDate */}
			{/* <div style={dateStyle}>
				<Box sx={selectWrapper}>
					<LocalizationProvider dateAdapter={AdapterDayjs} >
					<DatePicker
						label="Lopetuspäivämä	ärä"
						value={selectedEndDate}
						onChange={handleEndingDateChange}
						format="DD.MM.YYYY"
						slotProps={{
							textField: { fullWidth: true },
						}}
						/>
					</LocalizationProvider>
				</Box>
			</div> */}

			<div style={filterFieldContainer}>
				<div style={timeSlotStyle}>
				<InputLabel id="starttime-select-label">Aloitusaika</InputLabel>
					<Select
						labelId="starttime-select-label"
						id="starttime-select"
						label="Aloitusaika"
						value={startingTime}
						onChange={handleStartingTime}
						input={<OutlinedInput label="Aloitusaika" />}
						MenuProps={MenuProps}
						>
						{timeSlots.map((time) => (
							<MenuItem key={time} value={time}>
								<ListItemText primary={time} />
							</MenuItem>
						))}
					</Select>
				</div>

				{startingTime && (
					<div style={timeSlotStyle}>
					<InputLabel required id="endtime-select-label">Lopetusaika</InputLabel>
						<Select
							labelId="endtime-select-label"
							id="endtime-select"
							label="Lopetusaika"
							value={endingTime}
							onChange={handleEndingTime}
							input={<OutlinedInput label="Lopetusaika" />}
							MenuProps={MenuProps}
							>
							{timeSlots.map((time) => (
								startingTime ? (
									startingTime >= time ? (
										<MenuItem disabled={true} key={time} value={time}>
											<ListItemText primary={time} />
										</MenuItem>
									) : (
										<MenuItem key={time} value={time}>
											<ListItemText primary={time} />
										</MenuItem>
									)
								) : (
									<MenuItem key={time} value={time}>
										<ListItemText primary={time} />
									</MenuItem>
									)
							))}
						</Select>

					</div>
				)}
			</div>

			<div>
			{requiredEndTime && (
				<p style={{color: 'red', marginLeft: '40%', marginBottom: '-3%', marginTop: '0',
				fontFamily: "Helvetica"}}>
					*Pakollinen
				</p>
			)}
			</div>

			<div style={filterFieldContainer}>
				<div style={groupStyle, buildingStyleLeft}>
					<FormControl sx={{ m: 1, width: 200 }}>
						<FormLabel id="classroom-top-label">Opetustila</FormLabel>
						<InputLabel id="classroom-select-label"></InputLabel>
							<Select
								labelId="classroom-select-label"
								id="classroom-select"
								label="Opetustila"
								value={classroom}
								onChange={handleClassroom}
								input={<OutlinedInput label="Opetustila" />}
								MenuProps={MenuProps}
								>
								{availableClassrooms.map((room) => (
									<MenuItem key={room} value={room}>
										<ListItemText primary={room} />
									</MenuItem>
								))}
							</Select>
					</FormControl>
				</div>
				<div style={groupStyle, sizeStyle}>
					<InputLabel id="groupsize-select-label">Ryhmäkoko</InputLabel>
						<Select
							labelId="groupsize-select-label"
							id="groupsize-select"
							label="Ryhmäkoko"
							value={selectedGroupSize}
							onChange={handleGroupSize}
							input={<OutlinedInput label="Ryhmäkoko" />}
							MenuProps={MenuProps}
						>
							{groupSizes.map((size) => (
								<MenuItem key={size} value={size}>
									<ListItemText primary={size} />
								</MenuItem>
							))}
						</Select>
				</div>
			</div>

				{/* <Button variant="contained" type="submit" fullWidth onClick={handleSubmit} */}
				<Button variant="contained" type="submit" onClick={checkRequired}
					sx={{
						mt: 3,
						mb: 2,
						width: '35%',
						backgroundColor: '#18181B',
						'&:hover': {
							backgroundColor: '#2b2b2b'
						},
						marginLeft: '2%'
					}}>
						Hae tiloja
				</Button>

				<div>
					<button type="button" onClick={resetStates} style={clearButtonStyle}>
						Tyhjennä hakuehdot
					</button>
				</div>

			</form>

		</>
	  )
}

export default FilterForm
