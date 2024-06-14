import React from 'react';
import ReservationCard from './ReservationCard'; // Make sure this path is correct

const BookingResults = ({ classrooms }) => {
	console.log('classrooms', classrooms);

	return (
		<>
			<h3>Classrooms</h3>
			{classrooms && Object.entries(classrooms).map(([key, value]) => (
				<ReservationCard
					key={key}
					roomNumber={value.roomNumber}
					purpose={value.purpose}
					status={value.status}
					capacity={value.capacity}
					startTime={value.startTime}
					endTime={value.endTime}
				/>
			))}
		</>
	);
};

export default BookingResults;
