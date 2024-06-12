import React, { useState, useEffect } from 'react';
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
import { useCreateReservationMutation } from '../api/reservations';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';  // Import Finnish locale
import { getCookie } from '../utils/Cookies';
import { fetchUserDataByEmail } from '../api/userApi';

dayjs.locale('en-gb');

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

const ReservationDialog = ({ isOpen, onClose, roomId }) => {
	const [title, setTitle] = useState('');
	const [groupSize, setGroupSize] = useState('');
	const [startDate, setStartDate] = useState(null);
	const [startTime, setStartTime] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [endTime, setEndTime] = useState(null);
	const [recurrence, setRecurrence] = useState('');
	const [additionalInfo, setAdditionalInfo] = useState('');
	const [name, setName] = useState('')
	const [surname, setSurname] = useState('')
	const [user, setUser] = useState()

	const createReservationMutation = useCreateReservationMutation();

	useEffect(() => {
		const email = getCookie('UserEmail');
		if (email) {
			fetchUserDataByEmail(email)
				.then(userData => {
					setName(userData.name);
					setSurname(userData.surname);
					setUser(userData)
					console.log('user: ', user)
				})
				.catch(error => {
					console.error('Error fetching user data:', error);
				});
		}
	}, []);


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

	const handleSave = (e) => {
		// Handle save action
		e.preventDefault();

		const startDateTime = dayjs(startDate).set('hour', dayjs(startTime).hour()).set('minute', dayjs(startTime).minute()).toISOString();
		const endDateTime = dayjs(endDate).set('hour', dayjs(endTime).hour()).set('minute', dayjs(endTime).minute()).toISOString();

		const reservationData = {
			userId: user._id, // userId
			startTime: startDateTime, // date
			endTime: endDateTime, // date
			purpose: title, // string
			roomId: roomId, // roomId
			groupsize: groupSize, // integer
			recurrence: recurrence,
			additionalInfo: additionalInfo
		}

		console.log('reservationData: ', reservationData)

		createReservationMutation.mutate(reservationData);
		onClose();
	};

	const handleCancel = () => {
		onClose();
	};

	return (
		<ThemeProvider theme={theme}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
					<Box>
						<DialogTitle>Luo varaus</DialogTitle>
						<Box sx={{ marginTop: 2 }}>
							<Typography variant="h6">Varauksen tekijä</Typography>
							<Typography variant="body1">{user.name} {user.surname}</Typography>
						</Box>
					</Box>
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
									ampm={false}
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
									ampm={false}
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
