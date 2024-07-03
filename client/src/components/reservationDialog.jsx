import React, { useState, useEffect } from 'react';
import {
	Dialog,
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
	Typography,
	createTheme,
	Box
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
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

const ReservationDialog = ({ roomId, isOpen, onClose, roomNumber, capacity, groupsize }) => {
	const [title, setTitle] = useState('');
	const [groupSize, setGroupSize] = useState('');
	const [reservationDate, setReservationDate] = useState(null)
	const [reservationEndDate, setReservationEndDate] = useState(null)
	const [startTime, setStartTime] = useState(null);
	const [endTime, setEndTime] = useState(null);
	const [recurrence, setRecurrence] = useState('');
	const [additionalInfo, setAdditionalInfo] = useState('');
	const [user, setUser] = useState({ name: '' })

	const createReservationMutation = useCreateReservationMutation();

	useEffect(() => {
		const email = getCookie('UserEmail');
		if (email) {
			fetchUserDataByEmail(email)
				.then(userData => {
					setUser(userData)
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

	const handleReservationDateChange = (date) => {
		setReservationDate(date);
	};

	const handleReservationEndDateChange = (date) => {
		setReservationEndDate(date);
	};

	const handleStartTimeChange = (time) => {
		setStartTime(time);
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

		const formatTime = (time) => {
			return dayjs(time).format('HH:mm');
		}

		const generateRecurringReservations = (baseDate, endDate, interval, reservationData) => {
			let currentDate = dayjs(baseDate);
			const end = dayjs(endDate);
			const reservations = [];

			while (currentDate.isBefore(end) || currentDate.isSame(end, 'day')) {
				reservations.push({
					...reservationData,
					reservationDate: currentDate,
					startTime: startTime ? formatTime(startTime) : null,
					endTime: endTime ? formatTime(endTime) : null,
				});

				currentDate = currentDate.add(interval, 'day');
			}

			return reservations;
		}

		const reservationData = {
			userId: user._id, // userId
			reservationDate: reservationDate ? dayjs(reservationDate) : null,
			reservationEndDate: reservationEndDate ? dayjs(reservationEndDate) : null,
			startTime: startTime ? formatTime(startTime) : null,
			endTime: endTime ? formatTime(endTime) : null,
			purpose: title, // string
			roomId: roomId, // roomId
			groupsize: groupSize, // integer
			recurrence: recurrence,
			additionalInfo: additionalInfo
		}


		if (recurrence === 'none') {
			createReservationMutation.mutate(reservationData);
		} else if (recurrence === 'daily' && reservationEndDate) {
			const reservations = generateRecurringReservations(reservationDate, reservationEndDate, 1, reservationData);
			reservations.forEach(reservation => {
				createReservationMutation.mutate(reservation);
			});
		} else if (recurrence === 'weekly' && reservationEndDate) {
			const reservations = generateRecurringReservations(reservationDate, reservationEndDate, 7, reservationData);
			console.log('weekly reservations: ', reservations)
			reservations.forEach(reservation => {
				createReservationMutation.mutate(reservation);
			});
		} else {
			console.error('Invalid recurrence or missing end date');
		}

		onClose();
	};

	const handleCancel = () => {
		onClose();
	};



	return (
		<ThemeProvider theme={theme}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
					<DialogContent>
						<Box sx={{ marginTop: 0, marginBottom: 1 }}>
							<Typography variant="h4">{roomNumber}</Typography>
						</Box>
						<Box sx={{ marginTop: 0, marginBottom: 0, display: 'flex', alignItems: 'center' }}>
							{<Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
								<PeopleIcon sx={{ marginRight: 1 }} />{groupsize} / {capacity}
							</Typography>}
						</Box>
						<Box sx={{ marginTop: 1, marginBottom: 2 }}>
							<Typography variant="h6">Varauksen tekijä</Typography>
							<Typography variant="body2">{user.name} {user.surname}</Typography>
						</Box>
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
							<InputLabel id="group-size-label">Ryhmän koko (max. {capacity - groupsize} oppilasta)</InputLabel>
							<Select
								labelId="group-size-label"
								id="group-size"
								value={groupSize}
								onChange={handleGroupSizeChange}
								label={`Ryhmän koko (max. ${capacity - groupsize} oppilasta)`}  // Ensure the label is also set in the Select
							>
								{[...Array(capacity - groupsize).keys()].map((index) => {
									const size = index + 1; // Shift the range to start from 1
									return (
										<MenuItem key={size} value={size}>
											{size}
										</MenuItem>
									);
								})}
							</Select>
						</FormControl>
						<Grid container marginTop={1} marginBottom={1}>
							<Grid item lg={12}>
								<DatePicker
									label="Varauksen päivämäärä"
									value={reservationDate}
									onChange={handleReservationDateChange}
									renderInput={(params) => <TextField {...params} fullWidth />}
									slotProps={{ textField: { fullWidth: true } }}
								/>
							</Grid>
							<Grid container display={"flex"} rowSpacing={1} marginTop={1} justifyContent={"space-between"} alignItems={"center"}>
								<Grid item lg={6}>
									<TimePicker
										label="Aloitusaika"
										value={startTime}
										onChange={handleStartTimeChange}
										ampm={false}
									/>
								</Grid>
								<Grid item lg={6} >
									<TimePicker
										label="Lopetusaika"
										value={endTime}
										onChange={handleEndTimeChange}
										ampm={false}
									/>
								</Grid>
							</Grid>

						</Grid>

						<FormControl fullWidth margin="dense">
							<InputLabel id="recurrence-label">Toistuvuus</InputLabel>
							<Select
								labelId="recurrence-label"
								id="recurrence"
								value={recurrence}
								label={'Toistuvuus'}
								onChange={handleRecurrenceChange}
							>
								<MenuItem value="none">Älä toista</MenuItem>
								<MenuItem value="daily">Päivittäin</MenuItem>
								<MenuItem value="weekly">Viikottain</MenuItem>
							</Select>
						</FormControl>
						{
							recurrence && recurrence !== "none" &&
							<>
								<DatePicker
									label="Varauksen viimeinen päivämäärä"
									value={reservationDate}
									onChange={handleReservationEndDateChange}
									renderInput={(params) => <TextField {...params} fullWidth />}
									slotProps={{ textField: { fullWidth: true } }}
								/>
							</>
						}
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
