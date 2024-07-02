import React, { useState } from 'react';
import ReservationCard from './ReservationCard'; // Make sure this path is correct
import { Box, Button } from '@mui/material';

const BookingResults = ({ classrooms }) => {
	const [currentPage, setCurrentPage] = useState(0);
	const [filterMode, setFilterMode] = useState('all'); // 'all', 'reservations', 'free'

	const itemsPerPage = 5;

	console.log('classrooms: ', classrooms);

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
		setCurrentPage(0); // Reset to first page when filter changes
	};

	const filteredClassrooms = Object.entries(classrooms).filter(([key, value]) => {
		if (filterMode === 'reservations') {
			return value.reservations.length > 0;
		} else if (filterMode === 'free') {
			return value.reservations.length === 0;
		}
		return true;
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
						<Button onClick={() => handleFilterChange('all')} variant={filterMode === 'all' ? 'contained' : 'outlined'}>
							Kaikki
						</Button>
						<Button onClick={() => handleFilterChange('reservations')} variant={filterMode === 'reservations' ? 'contained' : 'outlined'}>
							Varatut
						</Button>
						<Button onClick={() => handleFilterChange('free')} variant={filterMode === 'free' ? 'contained' : 'outlined'}>
							Vapaat
						</Button>
					</Box>
					<Box sx={{ maxHeight: '500px', overflowY: 'auto' }}>
						{paginatedClassrooms.map(([key, value]) => (
							<React.Fragment key={key}>
								{value.reservations.length > 0 ? (
									value.reservations.map((reservation) => (
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
									))
								) : (
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
								)}
							</React.Fragment>
						))}
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
