import React, { useEffect, useState } from 'react'
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

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


// need to pass buildings as props?
const FilterForm = () => {
	const [selectedBuildings, setSelectedBuildings] = useState([]);
	const [availableFloors, setAvailableFloors] = useState([1]);
	const [selectedFloor, setSelectedFloor] = useState(1);

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


	useEffect(() => {
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
		<FormControl sx={{ m: 1, width: 300 }}>
		<InputLabel id="building-checkbox-label">Rakennus</InputLabel>
			<Select
				labelId="building-checkbox-label"
				id="building-multiple-checkbox"
				multiple
				value={selectedBuildings.map(building => building.name)}
				onChange={handleSelectedBuildings}
				input={<OutlinedInput label="Rakennus" />}
				renderValue={ (selected) => selected.join(', ') }
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
