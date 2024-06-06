import React from 'react'

const BookingResults = ({filterValues}) => {

	console.log('filterValues', filterValues);

  return (
	<>
		<h3>Filter values</h3>
		<ul>
			{Object.entries(filterValues).map(([key, value]) => (
				<li key={key}>
					<strong>{key}:</strong> {JSON.stringify(value)}
				</li>
			))}
		</ul>
	</>

  )
}

export default BookingResults
