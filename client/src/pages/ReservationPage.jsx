import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSchoolQuery } from '../api/schools';
import { Container, Box, TextField, Button, Typography, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Header from '../components/Header';
import FilterForm from '../components/FilterForm';
import BookingResults from '../components/BookingResults';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FloorPlan from '../components/FloorPlan';
import Calendar from '../components/Calendar';
import ReservationPageCalendar from '../components/ReservationPageCalendar';

const ReservationPage = () => {
  const [filteredClassrooms, setFilteredClassrooms] = useState([]);
  const [filterValues, setFilterValues] = useState(null);
  const [floor, setFloor] = React.useState('floor1');
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const [selectedComponent, setSelectedComponent] = React.useState('pohjakarttanäkymä');

  // For calendarview (temporary)
  const [calendarBuilding, setCalendarBuilding] = useState(null);
  const [calendarFloor, setCalendarFloor] = useState(null);
  const [calendarRoom, setCalendarRoom] = useState(null);


  const handleChange = (event, newFloor) => {
    setFloor(newFloor);
  };

  const handleFilterApply = () => {
    setIsFilterApplied(true);
  };

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

  const handleFilterValues = (newValues) => {
    setFilterValues(newValues);
  }

  const handleClassroomChange = (newClassrooms) => {
    setFilteredClassrooms(newClassrooms);
  };

  const roomProps1 = {
    101: { x: 0, y: 0, width: 127, height: 81, i: 0 },
    102: { x: 0, y: 85, width: 82, height: 81, i: 1 },
    103: { x: 0, y: 170, width: 48, height: 47, i: 2 },
    104: { x: 402, y: 0, width: 150, height: 81, i: 3 },
    105: { x: 131, y: 0, width: 107, height: 60, i: 4 },
    106: { x: 242, y: 0, width: 107, height: 60, i: 5 },
    107: { x: 353, y: 0, width: 45, height: 45, i: 6 },
    108: { x: 468, y: 85, width: 84, height: 78, i: 7 },
    109: { x: 468, y: 167, width: 84, height: 46, i: 8 },
    110: { x: 468, y: 217, width: 84, height: 46, i: 9 },
    111: { x: 512, y: 267, width: 40, height: 40, i: 10 },
  };

  const roomProps2 = {
    201: { x: 242, y: 0, width: 107, height: 60, i: 0 },
    202: { x: 353, y: 0, width: 45, height: 45, i: 1 },
    203: { x: 402, y: 0, width: 150, height: 81, i: 2 },
    204: { x: 468, y: 85, width: 84, height: 78, i: 3 },
    205: { x: 512, y: 167, width: 40, height: 46, i: 4 },
    206: { x: 468, y: 217, width: 84, height: 46, i: 5 },
    207: { x: 512, y: 267, width: 40, height: 40, i: 6 },
    208: { x: 131, y: 0, width: 107, height: 81, i: 7 },
    209: { x: 0, y: 0, width: 127, height: 81, i: 8 },
    210: { x: 0, y: 85, width: 82, height: 81, i: 9 },
    211: { x: 0, y: 170, width: 82, height: 47, i: 10 },
  };

  const roomProps3 = {
    101: { x: 197, y: 0, width: 45, height: 45, i: 0 },
    102: { x: 246, y: 0, width: 150, height: 45, i: 1 },
    103: { x: 400, y: 0, width: 84, height: 78, i: 2 },
    104: { x: 438, y: 82, width: 46, height: 46, i: 3 },
    105: { x: 438, y: 132, width: 46, height: 46, i: 4 },
    106: { x: 400, y: 182, width: 84, height: 46, i: 5 },
    107: { x: 86, y: 0, width: 107, height: 81, i: 6 },
    108: { x: 0, y: 0, width: 82, height: 81, i: 7 },
    109: { x: 0, y: 85, width: 82, height: 81, i: 8 },
    110: { x: 0, y: 170, width: 82, height: 58, i: 9 },
  };

  const roomProps4 = {
    201: { x: 197, y: 0, width: 45, height: 45, i: 0 },
    202: { x: 246, y: 0, width: 63, height: 45, i: 1 },
    203: { x: 313, y: 0, width: 83, height: 45, i: 2 },
    204: { x: 400, y: 0, width: 84, height: 78, i: 3 },
    205: { x: 400, y: 82, width: 84, height: 46, i: 4 },
    206: { x: 438, y: 132, width: 46, height: 46, i: 5 },
    207: { x: 400, y: 182, width: 84, height: 46, i: 6 },
    208: { x: 86, y: 0, width: 107, height: 45, i: 7 },
    209: { x: 0, y: 0, width: 82, height: 81, i: 8 },
    210: { x: 0, y: 85, width: 82, height: 81, i: 9 },
    211: { x: 0, y: 170, width: 82, height: 58, i: 10 },
  };

  const roomProps5 = {
    101: { x: 170, y: 0, width: 45, height: 45, i: 0 },
    102: { x: 219, y: 0, width: 63, height: 45, i: 1 },
    103: { x: 286, y: 0, width: 83, height: 66, i: 2 },
    104: { x: 286, y: 70, width: 83, height: 57, i: 3 },
    105: { x: 286, y: 131, width: 83, height: 46, i: 4 },
    106: { x: 323, y: 181, width: 46, height: 46, i: 5 },
    107: { x: 86, y: 0, width: 80, height: 60, i: 6 },
    108: { x: 0, y: 0, width: 82, height: 81, i: 7 },
    109: { x: 0, y: 85, width: 82, height: 81, i: 8 },
    110: { x: 0, y: 170, width: 82, height: 58, i: 9 },
  };


  const passFloorPlanProps = (filteredClassrooms) => {
    if (filteredClassrooms.length === 0) return { roomProps: {}, floorNumber: null };
    switch (filteredClassrooms[0].floor) {
      case '6666fdca9786f9616159b563':
        return { roomProps: roomProps1, floorNumber: 1 };
      case '6666fdca9786f9616159b570':
        return { roomProps: roomProps2, floorNumber: 2 };
      case '6666fe699786f9616159b57e':
        return { roomProps: roomProps3, floorNumber: 3 };
      case '6666fe699786f9616159b58b':
        return { roomProps: roomProps4, floorNumber: 4 };
      case '6666fe699786f9616159b594':
        return { roomProps: roomProps5, floorNumber: 5 };
      default:
        return { roomProps: {}, floorNumber: null };
    }
  };

  return (
    <>
      <Header />

      <Grid container sx={{ backgroundColor: '#f2f5f9', padding: '6px', gap: '6px', 'borderRadius': '10px', 'marginTop': '10px', 'marginLeft': '20px', 'width': 'fit-content' }}>
        <Grid item>
          <Button
            onClick={() => setSelectedComponent('pohjakarttanäkymä')}
            sx={{  textTransform: 'none', color: 'black', padding: '6px 10px', 'borderRadius': '6px', backgroundColor: selectedComponent === 'pohjakarttanäkymä' ? 'white' : 'transparent', 'fontWeight': 500 }}
          >
            Pohjakarttanäkymä
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={() => setSelectedComponent('kalenterinäkymä')}
            sx={{  textTransform: 'none', color: 'black', padding: '6px 10px', 'borderRadius': '6px', backgroundColor: selectedComponent === 'kalenterinäkymä' ? 'white' : 'transparent', 'fontWeight': 500 }}
          >
            Kalenterinäkymä
          </Button>
        </Grid>
      </Grid>

      <Container maxWidth="" style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '20px' }}>

        {/* Middle Section - Data Display */}
        {
          selectedComponent === "pohjakarttanäkymä" && (

            <>
              <Box sx={{ width: '30%', padding: '20px', border: '1px solid #ddd', borderRadius: '4px' }}>
                <FilterForm onClassroomChange={handleClassroomChange} schoolData={data} onApply={handleFilterApply} onFilterChange={handleFilterValues} />

              </Box>
              <Box sx={{ width: '30%', padding: '20px', border: '1px solid #ddd', borderRadius: '4px' }}>

                <Box>
                  <BookingResults classrooms={filteredClassrooms} filterValues={filterValues} />
                </Box>
              </Box>
              <Box sx={{ width: '100%', padding: '20px', border: '1px solid #ddd', borderRadius: '4px' }}>
                {/* <ToggleButtonGroup
                  color="primary"
                  value={floor}
                  exclusive
                  onChange={handleChange}
                  aria-label="Platform"
                  sx={{ marginRight: 2 }}
                >
                  <ToggleButton value="floor1">1. kerros</ToggleButton>
                  <ToggleButton value="floor2">2. kerros</ToggleButton>
                </ToggleButtonGroup>
                <ToggleButtonGroup
                  color="primary"
                  value={floor}
                  exclusive
                  onChange={handleChange}
                  aria-label="Platform"
                  sx={{ marginBottom: 10 }}
                >
                  <ToggleButton value="buildingA">Rakennus A</ToggleButton>
                  <ToggleButton value="buildingB">Rakennus B</ToggleButton>
                </ToggleButtonGroup> */}
                <Box>
                  {isFilterApplied && (
                    <FloorPlan
                      floorData={filteredClassrooms}
                      roomProps={passFloorPlanProps(filteredClassrooms).roomProps}
                      floorNumber={passFloorPlanProps(filteredClassrooms).floorNumber}
                    />
                  )}
                </Box>
              </Box>
            </>
          )
        }

        {
          selectedComponent === "kalenterinäkymä" && <ReservationPageCalendar data={data} />
        }

      </Container>
      {
        selectedComponent === "pohjakarttanäkymä" && (
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
        )
      }
    </>
  );
}

export default ReservationPage;
