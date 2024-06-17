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
	'06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00',
	'09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
	'13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00',
	'16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
	'20:00', '20:30', '21:00', '21:30', '22:00', '22:30'
];

const groupSizes = Array.from({ length: 20 }, (_, index) => (index + 1) * 5);


const FilterForm = ({onClassroomChange, schoolData}) => {
	const [selectedBuildings, setSelectedBuildings] = useState([]);
	const [availableFloors, setAvailableFloors] = useState([1]);
	const [selectedFloor, setSelectedFloor] = useState('');
	const [startingTime, setStartingTime] = useState('');
	const [endingTime, setEndingTime] = useState('');
	const [groupSize, setGroupSize] = useState('');
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
		setGroupSize(e.target.value);
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
					allRooms = allRooms.concat(floorObject.rooms.map((room) => `${building.name} - ${selectedFloor} - ${room.number}`));
				}
			}
			else {
				building.floors.forEach((floor) => {
					allRooms = allRooms.concat(floor.rooms.map((room) => `${building.name} - ${floor.number} - ${room.number}`));
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

	const filterByGroupsize = (classrooms) => {
		if (groupSize) {
			return classrooms.filter(room => room.capacity >= groupSize);
		}
		return classrooms;
	};

	const filterByClassroomOrFloor = (buildings) => {
		let classrooms = [];

		buildings.forEach((building) => {
			if (classroom) {
				const parts = classroom.split(' - ');
				const buildingName = parts[0];
				const floorNumber = parseInt(parts[1]);
				const className = parts[2];

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

	const filterByDate = (classrooms) => {
		let filteredClassrooms = [];

		if (selectedDate) {
			classrooms.forEach((room) => {
				if (room.reservations.length == 0) {
					filteredClassrooms = filteredClassrooms.concat(room);
					return ;
				}

				let freeTimeFound = room.reservations.some((reservation) => {
					if (reservation.groupsize < room.capacity) {
							if (groupSize) {
								if (reservation.groupsize + groupSize <= room.capacity) {
									return true;
								}
							}
							else {
								return true;
							}
						}
						return false;
				});

				if (freeTimeFound) {
					filteredClassrooms = filteredClassrooms.concat(room);
				}
				else {
					// loop through
				}
			})
		}
		else {
			filteredClassrooms = [...classrooms];
		}
		return filteredClassrooms;
	};

	const filterResults = () => {
		const buildings = filterByBuilding();
		let classrooms = filterByClassroomOrFloor(buildings);
		classrooms = filterByGroupsize(classrooms);
		// classrooms = filterByDate(classrooms);

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
			groupSize,
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
			console.log('testing');
			setRequiredEndTime(true);
			setRequired(true);
		}
		else {
			console.log('not testiong');
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
		setGroupSize('');
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
		gap: '50px',
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
		paddingBottom: '10px'
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
				<p style={{color: 'red', marginLeft: '43%', marginBottom: '-3%', marginTop: '0',
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
							value={groupSize}
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
				<Button variant="contained" type="submit" fullWidth onClick={checkRequired}
					sx={{
						mt: 3,
						mb: 2,
						backgroundColor: '#18181B',
						'&:hover': {
							backgroundColor: '#2b2b2b'
						}
					}}>
					Hae tiloja
				</Button>

				<button type="button" onClick={resetStates} style={clearButtonStyle}>
					Tyhjennä hakuehdot
				</button>

			</form>

		</>
	  )
}

export default FilterForm
