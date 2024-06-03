import React, { useEffect, useState } from 'react'
import { Container, Box, TextField, Button, Typography } from '@mui/material';
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

// TODO change this to real data from the DB
const buildings = [
	{
		name: 'Päärakennus',
		floors: {
			1: ['101', '102', '103', '104'],
			2: ['201', '202', '203', '204', '205'],
			3: ['301', '302', '303', '304', '305', '306'],
			4: ['401', '402', '403', '404'],
			5: ['501', '502', '503'],
			6: ['601', '602', '603', '604'],
		},
		rooms: 26,
	},
	{
		name: 'Lisärakennus',
		floors: {
			1: ['101', '102', '103', '104'],
			2: ['201', '202', '203'],
			3: ['301', '302'],
		},
		rooms: 9,
	},
	{
		name: 'Parakki',
		floors: {
			1: ['101', '102', '103'],
		},
		rooms: 3,
	},
];

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

// need to pass buildings as props?
const FilterForm = ({onFilterChange}) => {
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

	const handleSelectedBuildings = (event) => {
		const {
			target: { value },
		} = event;

		console.log('value', value);

		const selectedValues = typeof value === 'string' ? value.split(',') : value;
		const selectedBuildingObjects = selectedValues.map((name) =>
			buildings.find((building) => building.name === name)
		);
		setSelectedBuildings(selectedBuildingObjects);
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
				if (selectedFloor in building.floors) {
					allRooms = allRooms.concat(building.floors[selectedFloor].map((room) => `${building.name} - ${selectedFloor} - ${room}`));
				}
			}
			else {
				Object.keys(building.floors).forEach((floor) => {
					allRooms = allRooms.concat(building.floors[floor].map((room) => `${building.name} - ${floor} - ${room}`));
				});
			}
		})
		console.log('allRooms', allRooms);
		setAvailableClassrooms(allRooms);
	}

	const generateFloorList = (maxFloor) => {
		return Array.from({ length: maxFloor}, (_, index) => index + 1);
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
			onFilterChange(filterData);
			resetStates();
		}
		else {
			setRequired(true);
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
	}

	const handleDateChange = (newDate) => {
		setSelectedDate(newDate);
	}

	useEffect(() => {
		console.log('useEffect');
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
		setStartingTime('');
		setEndingTime('');
		setClassroom('');

		console.log('selectedBuildings', selectedBuildings);
		console.log('maxFloorValue', maxFloorValue);
		console.log('availableFloors', availableFloors);
	  }, [selectedBuildings, selectedFloor]);

	const filterFieldContainer = {
		display: 'flex',
		gap: '50px',
		alignItems: 'center'
	}

	const timeSlotStyle = {
		display: 'flex',
		flexDirection: 'column',
		minWidth: '50px',
		maxWidth: '100px',
		paddingLeft: '10px',
		paddingTop: '10px'
	}

	const buildingStyle = {
		display: 'flex',
		flexDirection: 'column',
		paddingTop: '10px',
		paddingBottom: '10px'
	}

	const groupStyle = {
		display: 'flex',
		flexDirection: 'column'
	}

	const selectWrapper = {
		display: 'flex',
		flexDirection: 'column',
		width: '310px',
		paddingLeft: '8px'
	};

	const buildingStyleLeft = {
		paddingTop: '20px'
	}


return (
	<>
	<Typography variant="h6" gutterBottom>
		 TODO: school name here
	</Typography>
	<Typography variant="h7" gutterBottom>
		 TODO: school intro here
	</Typography>

	<form>

		<button type="button" onClick={resetStates} style={{ marginLeft : '180px', marginTop: '60px'}}>
			Tyhjennä hakuehdot
		</button>

		<div style={filterFieldContainer}>
			<div style={buildingStyle, buildingStyleLeft}>
				<FormControl required sx={{ m: 1, width: 200 }}>
				<InputLabel id="building-checkbox-label" >Rakennus</InputLabel>
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
						{buildings.map((building) => (
							<MenuItem key={building.name} value={building.name}>
							<Checkbox checked={selectedBuildings.some((selected) => selected.name === building.name)} />
							<ListItemText primary={building.name} />
						</MenuItem>
						))}
					</Select>
				</FormControl>
			</div>
			<div style={buildingStyle}>
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
				<p style={{color: 'red', paddingLeft: '10px', marginTop: '-10px', marginBottom: '20px',
				fontFamily: "Helvetica"}}>
					*Pakollinen
				</p>
			)}
		</>

		<Box sx={selectWrapper}>
			<LocalizationProvider dateAdapter={AdapterDayjs} >
			<DatePicker
				label="Päivämäärä"
				value={selectedDate}
				onChange={handleDateChange}
				format="DD.MM.YYYY"
				slotProps={{
				textField: { fullWidth: true },
				}}
			/>
			</LocalizationProvider>
		</Box>

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
			<div style={timeSlotStyle}>
			<InputLabel id="endtime-select-label">Lopetusaika</InputLabel>
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
		</div>

		<div style={filterFieldContainer}>
			<div style={groupStyle, buildingStyleLeft}>
				<FormControl sx={{ m: 1, width: 200 }}>
					<InputLabel id="classroom-select-label">Opetustila</InputLabel>
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
			<div style={groupStyle}>
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


			<Button variant="contained" type="submit" fullWidth onClick={handleSubmit}
				sx={{
					mt: 3,
					mb: 2,
					backgroundColor: '#18181B', // Change this to your desired color
					'&:hover': {
						backgroundColor: '#2b2b2b' // Change this to a lighter shade of your color
					}
				}}>
				Hae tiloja
			</Button>
		</form>
	</>
  )
}

export default FilterForm
