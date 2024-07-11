import React, { useState, useEffect } from 'react';
import {
	Dialog,
	DialogContent,
	ThemeProvider,
	createTheme,
} from '@mui/material';
import { useCreateReservationMutation } from '../api/reservations';
import { getCookie } from '../utils/Cookies';
import { fetchUserDataByEmail } from '../api/userApi';
import CreateReservationForm from '../components/CreateReservationForm';


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

const ReservationDialog = ({ roomId, isOpen, onClose, roomNumber, capacity, groupsize, filterValues }) => {
	const [groupSize, setGroupSize] = useState(null);
	const [user, setUser] = useState({})

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


	const handleGroupSizeChange = (event) => {
		setGroupSize(event.target.value);
	};

	return (
		<ThemeProvider theme={theme}>
			<Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
				<DialogContent>
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
					/>

				</DialogContent>
			</Dialog>
		</ThemeProvider>
	);
};

export default ReservationDialog;
