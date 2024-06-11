import React from 'react'

const BookingResults = ({classrooms}) => {

	console.log('classrooms', classrooms);

  return (
	<>
		<h3>Classrooms</h3>
		<ul>
			{Object.entries(classrooms).map(([key, value]) => (
				<li key={key}>
					<strong>{key}:</strong> {JSON.stringify(value)}
				</li>
			))}
		</ul>
	</>

  )
}

export default BookingResults
