import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSchoolQuery } from '../api/schools';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import Header from '../components/Header';
import FilterForm from '../components/FilterForm';
import BookingResults from '../components/BookingResults';
import FloorPlanBase from '../components/floorplans/FloorPlanBase1';
import FloorPlan1 from '../components/floorplans/FloorPlan1';
import FloorPlan2 from '../components/floorplans/FloorPlan2';
import FloorPlan3 from '../components/floorplans/FloorPlan3';
import FloorPlan4 from '../components/floorplans/FloorPlan4';
import FloorPlan5 from '../components/floorplans/FloorPlan5';

const ReservationPage = () => {
  const [filteredClassrooms, setFilteredClassrooms] = useState([]);

  const { id } = useParams();
  const { data, error, isLoading } = useSchoolQuery(id);

  useEffect(() => {
    console.log('id: ', id)
    console.log('data: ', data)
  }, [])

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleClassroomChange = (newClassrooms) => {
	setFilteredClassrooms(newClassrooms);
  };

  return (
    <>
      <Header />
      <Container maxWidth="" style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '20px' }}>
        <Box sx={{ width: '30%', padding: '20px', border: '1px solid #ddd', borderRadius: '4px' }}>
          <FilterForm onClassroomChange={handleClassroomChange} schoolData={data} />
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

            <BookingResults classrooms={filteredClassrooms} />

          </Box>
        </Box>
        <Box sx={{ width: '100%', padding: '20px', border: '1px solid #ddd', borderRadius: '4px' }}>
          <Typography variant="h6" gutterBottom>
            Pohjapiirrustus
          </Typography>
          <Box>
            {/* <FloorPlanBase></FloorPlanBase> */}
            {/* <FloorPlan5 /> */}
          </Box>
        </Box>
      </Container>
      <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
          <Box sx={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#94D0AD', marginRight: '10px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)' }} />
          <Typography>Vapaa</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
          <Box sx={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#F4BD89', marginRight: '10px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)' }} />
          <Typography>Osittain vapaa</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#EA7272', marginRight: '10px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)' }} />
          <Typography>Varattu</Typography>
        </Box>
      </Box>
    </>
  );
}

export default ReservationPage;
