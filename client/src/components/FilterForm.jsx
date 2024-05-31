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

// TODO change this to real data from the DB
const buildings = [
	{
		name: 'Päärakennus',
		floors: 6,
		rooms: 56,
	},
	{
		name: 'Lisärakennus',
		floors: 2,
		rooms: 9,
	},
	{
		name: 'Parakki',
		floors: 1,
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
const FilterForm = () => {
	const [selectedBuildings, setSelectedBuildings] = useState([]);
	const [availableFloors, setAvailableFloors] = useState([1]);
	const [selectedFloor, setSelectedFloor] = useState('');
	const [startingTime, setStartingTime] = useState('');
	const [endingTime, setEndingTime] = useState('');
	const [groupSize, setGroupSize] = useState('');

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
	};

	const handleStartingTime = (e) => {
		setStartingTime(e.target.value);
	}
	const handleEndingTime = (e) => {
		setEndingTime(e.target.value);
	}

	const handleGroupSize = (e) => {
		setGroupSize(e.target.value);
	}

	const generateFloorList = (maxFloor) => {
		return Array.from({ length: maxFloor}, (_, index) => index + 1);
	}

	useEffect(() => {
		const maxFloorValue = selectedBuildings.reduce((max, building) =>
		building.floors > max ? building.floors : max, 1
		);

		console.log('selectedBuildings', selectedBuildings);
		setAvailableFloors(generateFloorList(maxFloorValue));
		setSelectedFloor(1);
		console.log('maxFloorValue', maxFloorValue);
		console.log('availableFloors', availableFloors);
	  }, [selectedBuildings]);

return (
	<>
	<Typography variant="h6" gutterBottom>
		 TODO: school name here
	</Typography>
	<Typography variant="h7" gutterBottom>
		 TODO: school intro here
	</Typography>

	<form>

		<FormControl required sx={{ m: 1, width: 300 }}>
		<InputLabel id="building-checkbox-label">Rakennus</InputLabel>
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
					<MenuItem key={time} value={time}>
						<ListItemText primary={time} />
					</MenuItem>
				))}
			</Select>

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


		<Button variant="contained" type="submit" fullWidth
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
