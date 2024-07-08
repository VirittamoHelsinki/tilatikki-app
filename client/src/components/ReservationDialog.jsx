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
import CreateReservationForm from '../components/CreateReservationForm';

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
	const [reservationData, setReservationData] = useState({})
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

	const handleSave = () => {

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


	return (
		<ThemeProvider theme={theme}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
					<DialogContent>
						<CreateReservationForm
							roomNumber={roomNumber}
							roomId={roomId}
							reservationGroupSize={groupSize}
							handleGroupSizeChange={handleGroupSizeChange}
							groupsize={groupsize}
							capacity={capacity}
							user={user}
							onClose={onClose}
						/>

					</DialogContent>
				</Dialog>
			</LocalizationProvider>
		</ThemeProvider>
	);
};

export default ReservationDialog;
