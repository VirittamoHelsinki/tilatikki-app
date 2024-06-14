import React, { useState } from 'react';
import ReservationCard from './ReservationCard'; // Make sure this path is correct
import { Box, Button } from '@mui/material';

const BookingResults = ({ classrooms }) => {
	const [currentPage, setCurrentPage] = useState(0);

	const itemsPerPage = 5;

	console.log('classrooms: ', classrooms)

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

	const paginatedClassrooms = Object.entries(classrooms).slice(
		currentPage * itemsPerPage,
		(currentPage + 1) * itemsPerPage
	);


	return (
		<Box>
			<h3>Huoneet</h3>
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
									startTime={reservation.startTime}
									endTime={reservation.endTime}
									groupsize={reservation.groupsize}
								/>
							))
						) : (
							<ReservationCard
								key={key}
								roomNumber={value.number}
								purpose="Ei varauksia"
								status="Vapaa"
								capacity={value.capacity}
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
					disabled={currentPage >= Math.ceil(Object.keys(classrooms).length / itemsPerPage) - 1}
				>
					Seuraava
				</Button>
			</Box>
		</Box>
	);
};

export default BookingResults;
