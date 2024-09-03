import React, { useState, useEffect } from 'react';
import {
	Dialog, DialogContent, ThemeProvider, createTheme, Snackbar, Alert
} from '@mui/material';
import { useCreateReservationMutation, useUpdateReservationMutation } from '../api/reservations';
import { getCookie } from '../utils/Cookies';
import { fetchUserDataByEmail } from '../api/userApi';
import CreateReservationForm from '../components/CreateReservationForm';
import UpdateReservationForm from '../components/UpdateReservationForm';

const theme = createTheme({
	palette: {
		primary: {
			main: '#000000',
		},
	},
	components: {
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
						borderColor: '#000000',
					},
				},
			},
		},
		MuiInputLabel: {
			styleOverrides: {
				root: {
					'&.Mui-focused': {
						color: '#000000',
					},
				},
			},
		},
	},
});

const ReservationDialog = ({ roomId, isOpen, onClose, roomNumber, capacity, groupsize, filterValues, status, reservationId, reservationGroupId, reservationName }) => {
	const [groupSize, setGroupSize] = useState(null);
	const [user, setUser] = useState({});
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');

	const createReservationMutation = useCreateReservationMutation();
	const updateReservationMutation = useUpdateReservationMutation();

	useEffect(() => {
		const email = getCookie('UserEmail');
		if (email) {
			fetchUserDataByEmail(email)
				.then(userData => {
					setUser(userData);
				})
				.catch(error => {
					console.error('Error fetching user data:', error);
				});
		}
	}, []);

	const handleGroupSizeChange = (event) => {
		setGroupSize(event.target.value);
	};

	const handleCloseSnackbar = () => {
		setSnackbarOpen(false);
	};

	return (
		<ThemeProvider theme={theme}>
			<Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
				<DialogContent>
					{status !== "Varattu" ? (
						<CreateReservationForm
							createReservationMutation={createReservationMutation}
							roomNumber={roomNumber}
							roomId={roomId}
							reservationGroupSize={groupSize}
							handleGroupSizeChange={handleGroupSizeChange}
							groupsize={groupsize}
							capacity={capacity}
							user={user}
							onClose={onClose}
							filterValues={filterValues}
							setSnackbarMessage={setSnackbarMessage}  // Pass the function here
							setSnackbarOpen={setSnackbarOpen}        // Pass the function here
						/>
					) : (
						<UpdateReservationForm
							updateReservationMutation={updateReservationMutation}
							roomNumber={roomNumber}
							reservationId={reservationId}
							reservationGroupId={reservationGroupId}
							roomId={roomId}
							reservationName={reservationName}
							reservationGroupSize={groupSize}
							handleGroupSizeChange={handleGroupSizeChange}
							groupsize={groupsize}
							capacity={capacity}
							user={user}
							onClose={onClose}
							filterValues={filterValues}
						/>
					)}
				</DialogContent>
			</Dialog>

			<Snackbar
				open={snackbarOpen}
				autoHideDuration={4000}
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
			>
				<Alert
					onClose={handleCloseSnackbar}
					severity="success"
					sx={{ width: '100%' }}
				>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</ThemeProvider>
	);
};

export default ReservationDialog;
