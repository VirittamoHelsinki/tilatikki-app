import React, { useState, useEffect } from 'react';
import ReservationCard from './ReservationCard'; // Make sure this path is correct
import { Box, Button, Typography } from '@mui/material';
import { fetchUserDataByEmail } from '../api/userApi';
import { fetchTotalPeopleReserved } from '../api/rooms';
import { getCookie } from '../utils/Cookies';


const BookingResults = ({ classrooms, filterValues }) => {
	const [currentPage, setCurrentPage] = useState(0);
	const [filterMode, setFilterMode] = useState('free');
	const [user, setUser] = useState({})
	const [freeRooms, setFreeRooms] = useState([]);
	const [partiallyFreeRooms, setPartiallyFreeRooms] = useState([]);
	const [reservedRooms, setReservedRooms] = useState([]);


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

	const itemsPerPage = 5;


	const handleNextPage = () => {
		if (currentPage < Math.ceil(Object.keys(classrooms).length / itemsPerPage) - 1) {
			setCurrentPage(currentPage + 1);
		}
	};

	const handlePreviousPage = () => {
		if (currentPage > 0) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleFilterChange = (mode) => {
		setFilterMode(mode);
		setCurrentPage(0);
	};

	useEffect(() => {
		const setRooms = async () => {
			const calculateTotalPeopleInTimeSlot = async (roomId) => {
				const totalPeople = filterValues.selectedDate && filterValues.startingTime && filterValues.endingTime ? await fetchTotalPeopleReserved(roomId, filterValues.selectedDate, filterValues.startingTime, filterValues.endingTime) : null;
				return totalPeople ? totalPeople.totalPeople : null;
			};

			// Temporary arrays to hold the rooms
			const freeRoomsTemp = [];
			const partiallyFreeRoomsTemp = [];
			const reservedRoomsTemp = [];

			// Loop through the classrooms and classify them based on the total people
			for (const room of classrooms) {
				const total = await calculateTotalPeopleInTimeSlot(room._id);

				if (total === null) {
					return;
				}

				if (total === 0) {
					freeRoomsTemp.push({ ...room, total: total });
				} else if (total > 0 && total < room.capacity) {
					partiallyFreeRoomsTemp.push({ ...room, total: total });
				} else {
					reservedRoomsTemp.push({ ...room, total: total });
				}
			}

			// Set the state with the classified rooms
			setFreeRooms(freeRoomsTemp);
			setPartiallyFreeRooms(partiallyFreeRoomsTemp);
			setReservedRooms(reservedRoomsTemp);
		};

		if (classrooms.length > 0) {
			setRooms();
		}
	}, [classrooms, filterValues, fetchTotalPeopleReserved]);

	// Filter the classrooms

	const filteredClassrooms = Object.entries(classrooms).filter(([key, value]) => {
		const userReservations = value.reservations.filter((reservation) => {
			return reservation.user._id === user._id
		})
		if (filterMode === 'reservations') {
			return userReservations.length > 0
		} else if (filterMode === 'free') {
			return true
		}
		return false;
	});

	const paginatedClassrooms = filteredClassrooms.slice(
		currentPage * itemsPerPage,
		(currentPage + 1) * itemsPerPage
	);


	return (
		<Box>
			<Typography variant="h6">Vapaat tilat ja varaukset</Typography>
			{Object.keys(classrooms).length > 0 && (
				<>
					<Box display="flex" justifyContent="center" mb={2}>
						<Button onClick={() => handleFilterChange('reservations')} variant={filterMode === 'reservations' ? 'contained' : 'outlined'}
							sx={{
								textTransform: 'none',
								backgroundColor: filterMode === 'reservations' ? '#0f172A' : 'transparent',
								color: filterMode === 'reservations' ? '#FFFFFF' : '#0f172A',
								borderColor: '#0f172A',
								'&:hover': {
									backgroundColor: filterMode === 'reservations' ? '#0f172A' : '#e0e0e0',
								},
							}}
						>
							Omat Varaukset
						</Button>
						<Button onClick={() => handleFilterChange('free')} variant={filterMode === 'free' ? 'contained' : 'outlined'}
							sx={{
								textTransform: 'none',
								backgroundColor: filterMode === 'free' ? '#0f172A' : 'transparent',
								color: filterMode === 'free' ? '#FFFFFF' : '#0f172A',
								borderColor: '#0f172A',
								'&:hover': {
									backgroundColor: filterMode === 'free' ? '#0f172A' : '#e0e0e0',
								},
							}}
						>
							Vapaat
						</Button>
					</Box>
					<Box sx={{ maxHeight: '500px', overflowY: 'auto' }}>
						{paginatedClassrooms.map(([key, value]) => {
							// Filter the reservations from the classrooms
							const filteredUserReservations = value.reservations.filter(reservation => reservation.user._id === user._id);

							const matchRoom = partiallyFreeRooms.filter((room) => room._id === value._id)
							return (
								<React.Fragment key={key}>
									{filteredUserReservations.length > 0 && filterMode === 'reservations' ? (
										filteredUserReservations.map((reservation) => (
											<ReservationCard
												key={reservation._id}
												roomId={reservation.room}
												roomNumber={value.number}
												purpose={reservation.purpose}
												status="Varattu"
												capacity={value.capacity}
												reservationDate={reservation.reservationDate}
												reservationEndDate={reservation.reservationEndDate}
												startTime={reservation.startTime}
												endTime={reservation.endTime}
												groupsize={reservation.groupsize}
												filterValues={filterValues}
											/>
										))
									) : (

										<>
											{
												(matchRoom.length > 0 && matchRoom[0]._id === value._id ?
													<ReservationCard
														key={key}
														roomId={value._id}
														roomNumber={value.number}
														status="Osittain vapaa"
														reservationDate=""
														startTime=""
														endTime=""
														groupsize={matchRoom.length > 0 && matchRoom[0].total}
														capacity={value.capacity}
														filterValues={filterValues}

													/>
													: (<ReservationCard
														key={key}
														roomId={value._id}
														roomNumber={value.number}
														status="Vapaa"
														reservationDate=""
														startTime=""
														endTime=""
														groupsize={0}
														capacity={value.capacity}
														filterValues={filterValues}

													/>))
											}
										</>
									)}
								</React.Fragment>
							);
						})}
					</Box>
					<Box display="flex" justifyContent="space-between" mt={2}>
						<Button onClick={handlePreviousPage} disabled={currentPage === 0}
							sx={{
								textTransform: 'none',
								backgroundColor: '#0f172A',
								color: '#FFFFFF',
								'&:hover': {
									backgroundColor: '#0f172A',
								},
								'&:disabled': {
									backgroundColor: '#e0e0e0',
									color: '#9e9e9e',
								},
							}}
						>
							Edellinen
						</Button>
						<Button
							onClick={handleNextPage}
							disabled={currentPage >= Math.ceil(filteredClassrooms.length / itemsPerPage) - 1}
							sx={{
								textTransform: 'none',
								backgroundColor: '#0f172A',
								color: '#FFFFFF',
								'&:hover': {
									backgroundColor: '#0f172A',
								},
								'&:disabled': {
									backgroundColor: '#e0e0e0',
									color: '#9e9e9e',
								},
							}}
						>
							Seuraava
						</Button>
					</Box>
				</>
			)}
		</Box>
	);
};

export default BookingResults;
