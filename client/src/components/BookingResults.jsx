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
	<>
		<Typography>Luokat</Typography>
		<ul>
			{classrooms && Object.entries(classrooms).map(([key, value]) => (
					<li key={key}>
					<strong>{key}:</strong> {JSON.stringify(value)}
					</li>
				))}
		</ul>
	</>


	)
}

export default BookingResults;
