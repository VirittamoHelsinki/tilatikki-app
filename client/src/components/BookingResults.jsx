import React, { useState, useEffect } from 'react';
import ReservationCard from './ReservationCard'; // Make sure this path is correct
import { Box, Button } from '@mui/material';
import { fetchUserDataByEmail } from '../api/userApi';
import { fetchTotalPeopleReserved } from '../api/rooms';
import { getCookie } from '../utils/Cookies';

const BookingResults = ({ classrooms, date, startTime, endTime }) => {
	const [currentPage, setCurrentPage] = useState(0);
	const [filterMode, setFilterMode] = useState('free');
	const [user, setUser] = useState({});
	const [freeRooms, setFreeRooms] = useState([]);
	const [partiallyFreeRooms, setPartiallyFreeRooms] = useState([]);
	const [reservedRooms, setReservedRooms] = useState([]);

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
				const totalPeople = date && startTime && endTime ? await fetchTotalPeopleReserved(roomId, date, startTime, endTime) : null;
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
	}, [classrooms, date, startTime, endTime, fetchTotalPeopleReserved]);

	useEffect(() => {
		console.log('free rooms: ', freeRooms);
		console.log('partially free: ', partiallyFreeRooms);
		console.log('reserved: ', reservedRooms);
	}, [freeRooms, partiallyFreeRooms, reservedRooms]);

	// Filter the classrooms
	const filteredClassrooms = Object.entries(classrooms).filter(([key, value]) => {
		const userReservations = value.reservations.filter((reservation) => {
			return reservation.user._id === user._id;
		});
		if (filterMode === 'reservations') {
			return userReservations.length > 0;
		} else if (filterMode === 'free') {
			return freeRooms.concat(partiallyFreeRooms).some(room => room._id === value._id);
		}
		return false;
	});

	const paginatedClassrooms = filteredClassrooms.slice(
		currentPage * itemsPerPage,
		(currentPage + 1) * itemsPerPage
	);

	return (
		<Box>
			<h3>Huoneet</h3>
			{Object.keys(classrooms).length > 0 && (
				<>
					<Box display="flex" justifyContent="center" mb={2}>
						<Button onClick={() => handleFilterChange('reservations')} variant={filterMode === 'reservations' ? 'contained' : 'outlined'}>
							Omat Varaukset
						</Button>
						<Button onClick={() => handleFilterChange('free')} variant={filterMode === 'free' ? 'contained' : 'outlined'}>
							Vapaat
						</Button>
					</Box>
					<Box sx={{ maxHeight: '500px', overflowY: 'auto' }}>
						{paginatedClassrooms.map(([key, value]) => {
							const filteredUsersReservations = value.reservations.filter(reservation => reservation.user._id === user._id);
							if (filterMode === 'reservations') {
								return (
									<React.Fragment key={key}>
										{filteredUsersReservations.map((reservation) => (
											<ReservationCard
												key={reservation._id}
												roomId={reservation.room}
												roomNumber={value.number}
												purpose={reservation.purpose}
												status="Varattu"
												capacity={value.capacity}
												reservationDate={reservation.reservationDate}
												startTime={reservation.startTime}
												endTime={reservation.endTime}
												groupsize={reservation.groupsize}
											/>
										))}
									</React.Fragment>
								);
							} else if (filterMode === 'free') {
								if (freeRooms.some(room => room._id === value._id)) {
									return (
										<ReservationCard
											key={key}
											roomId={value._id}
											roomNumber={value.number}
											purpose="Ei varauksia"
											status="Vapaa"
											capacity={value.capacity}
											reservationDate=""
											startTime=""
											endTime=""
											groupsize={0}
										/>
									);
								} else {
									const partiallyFreeRoom = partiallyFreeRooms.find(room => room._id === value._id);
									if (partiallyFreeRoom) {
										return (
											<ReservationCard
												key={key}
												roomId={value._id}
												roomNumber={value.number}
												purpose="Osittain varattu"
												status="Osittain vapaa"
												capacity={value.capacity}
												reservationDate=""
												startTime=""
												endTime=""
												groupsize={partiallyFreeRoom.total}
											/>
										);
									}
								}
							}
							return null;
						})}
					</Box>
					<Box display="flex" justifyContent="space-between" mt={2}>
						<Button onClick={handlePreviousPage} disabled={currentPage === 0}>
							Edellinen
						</Button>
						<Button
							onClick={handleNextPage}
							disabled={currentPage >= Math.ceil(filteredClassrooms.length / itemsPerPage) - 1}
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
