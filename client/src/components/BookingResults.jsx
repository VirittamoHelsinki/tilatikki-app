import React from 'react'
import { Typography } from '@mui/material';

const BookingResults = ({ classrooms }) => {

	console.log('classrooms', classrooms);

  return (
	<>
		<Typography></Typography>
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

export default BookingResults
