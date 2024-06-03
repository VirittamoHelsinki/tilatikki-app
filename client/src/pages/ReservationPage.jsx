import React from 'react';
import { useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import Header from '../components/Header';
import FilterForm from '../components/FilterForm';
import BookingResults from '../components/BookingResults';

const ReservationPage = () => {
	const [filterValues, setFilterValues] = useState({});

	const handleFilterChange = (newFilterValues) => {
		setFilterValues(newFilterValues);
	}

  return (
    <>
    <Header/>
    <Container maxWidth="lg" style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '20px' }}>
      <Box sx={{ width: '30%', padding: '20px', border: '1px solid #ddd', borderRadius: '4px' }}>
		<FilterForm onFilterChange={handleFilterChange} />
      </Box>

      {/* Middle Section - Data Display */}
      <Box sx={{ width: '30%', padding: '20px', border: '1px solid #ddd', borderRadius: '4px' }}>
        <Typography variant="h6" gutterBottom>
          Data Display
        </Typography>
        <Box>
          {/* Placeholder for dynamic data */}
          <Typography variant="body1">
            No data to display yet.
          </Typography>

			<BookingResults filterValues={filterValues}/>

        </Box>
      </Box>

      {/* Right Section - Empty */}
      <Box sx={{ width: '30%', padding: '20px', border: '1px solid #ddd', borderRadius: '4px' }}>
        <Typography variant="h6" gutterBottom>
          Empty Section
        </Typography>
        <Box>
          {/* This section is intentionally left empty */}
        </Box>
      </Box>
    </Container>
    </>
  );
}

export default ReservationPage;
