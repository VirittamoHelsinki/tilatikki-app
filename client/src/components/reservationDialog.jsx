import React, { useState } from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	TextField,
	MenuItem,
	Select,
	InputLabel,
	FormControl,
	Grid,
	ThemeProvider,
	createTheme
} from '@mui/material';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const theme = createTheme({
	palette: {
		primary: {
			main: '#000000', // set primary color to black
		},
	},
	components: {
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
						borderColor: '#000000', // black border when focused
					},
				},
			},
		},
		MuiInputLabel: {
			styleOverrides: {
				root: {
					'&.Mui-focused': {
						color: '#000000', // black label when focused
					},
				},
			},
		},
	},
});

const ReservationDialog = ({ isOpen, onClose }) => {
	const [title, setTitle] = useState('');
	const [groupSize, setGroupSize] = useState('');
	const [startDate, setStartDate] = useState(null);
	const [startTime, setStartTime] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [endTime, setEndTime] = useState(null);
	const [recurrence, setRecurrence] = useState('');
	const [additionalInfo, setAdditionalInfo] = useState('');

	const handleTitleChange = (event) => {
		setTitle(event.target.value);
	};

	const handleGroupSizeChange = (event) => {
		setGroupSize(event.target.value);
	};

	const handleStartDateChange = (date) => {
		setStartDate(date);
	};

	const handleStartTimeChange = (time) => {
		setStartTime(time);
	};

	const handleEndDateChange = (date) => {
		setEndDate(date);
	};

	const handleEndTimeChange = (time) => {
		setEndTime(time);
	};

	const handleRecurrenceChange = (event) => {
		setRecurrence(event.target.value);
	};

	const handleAdditionalInfoChange = (event) => {
		setAdditionalInfo(event.target.value);
	};

	const handleSave = () => {
		// Handle save action
		onClose();
	};

	const handleCancel = () => {
		onClose();
	};

	return (
		<ThemeProvider theme={theme}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
					<DialogTitle>Luo varaus</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							margin="dense"
							id="title"
							label="Varauksen nimi"
							fullWidth
							value={title}
							onChange={handleTitleChange}
						/>
						<FormControl fullWidth margin="dense">
							<InputLabel id="group-size-label">Ryhmän koko (max. 100 oppilasta)</InputLabel>
							<Select
								labelId="group-size-label"
								id="group-size"
								value={groupSize}
								onChange={handleGroupSizeChange}
							>
								{[...Array(101).keys()].map((size) => (
									<MenuItem key={size} value={size}>
										{size}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<Grid container spacing={2} marginTop={1}>
							<Grid item xs={6}>
								<DatePicker
									label="Aloituspäivä"
									value={startDate}
									onChange={handleStartDateChange}
									renderInput={(params) => <TextField {...params} fullWidth />}
								/>
							</Grid>
							<Grid item xs={6}>
								<TimePicker
									label="Aloitusaika"
									value={startTime}
									onChange={handleStartTimeChange}
									renderInput={(params) => <TextField {...params} fullWidth />}
								/>
							</Grid>
							<Grid item xs={6}>
								<DatePicker
									label="Lopetuspäivä"
									value={endDate}
									onChange={handleEndDateChange}
									renderInput={(params) => <TextField {...params} fullWidth />}
								/>
							</Grid>
							<Grid item xs={6}>
								<TimePicker
									label="Lopetusaika"
									value={endTime}
									onChange={handleEndTimeChange}
									renderInput={(params) => <TextField {...params} fullWidth />}
								/>
							</Grid>
						</Grid>
						<FormControl fullWidth margin="dense">
							<InputLabel id="recurrence-label">Toistuvuus</InputLabel>
							<Select
								labelId="recurrence-label"
								id="recurrence"
								value={recurrence}
								onChange={handleRecurrenceChange}
							>
								<MenuItem value="none">Älä toista</MenuItem>
								<MenuItem value="daily">Päivittäin</MenuItem>
								<MenuItem value="weekly">Viikottain</MenuItem>
								<MenuItem value="monthly">Kuukausittain</MenuItem>
							</Select>
						</FormControl>
						<TextField
							margin="dense"
							id="additional-info"
							label="Lisätietoa"
							fullWidth
							multiline
							rows={4}
							value={additionalInfo}
							onChange={handleAdditionalInfoChange}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCancel} style={{ color: 'black' }}>Peruuta</Button>
						<Button onClick={handleSave} variant="contained" style={{ backgroundColor: 'black', color: 'white' }}>
							Varaa tila
						</Button>
					</DialogActions>
				</Dialog>
			</LocalizationProvider>
		</ThemeProvider>
	);
};

export default ReservationDialog;
