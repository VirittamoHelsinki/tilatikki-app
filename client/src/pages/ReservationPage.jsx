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
import FloorPlanBase from '../components/floorplans/FloorPlanBase1';
import FloorPlan1 from '../components/floorplans/FloorPlan1';
import FloorPlan2 from '../components/floorplans/FloorPlan2';
import FloorPlan3 from '../components/floorplans/FloorPlan3';
import FloorPlan4 from '../components/floorplans/FloorPlan4';
import FloorPlan5 from '../components/floorplans/FloorPlan5';
import Calendar from '../components/Calendar';

const ReservationPage = () => {
  const [filteredClassrooms, setFilteredClassrooms] = useState([]);
  const [filterValues, setFilterValues] = useState(null);
  const [floor, setFloor] = React.useState('floor1');

  const [ selectedComponent, setSelectedComponent ] = React.useState('pohjakarttanäkymä');


  // For calendarview (temporary)
  const [ calendarBuilding, setCalendarBuilding ] = useState(null);
  const [ calendarFloor, setCalendarFloor ] = useState(null);
  const [ calendarRoom, setCalendarRoom ] = useState(null);


  const handleChange = (event, newFloor) => {
    setFloor(newFloor);
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

  console.log(data)

  return (
    <>
      <Header />

      <Grid container sx={{ backgroundColor: '#f2f5f9', padding: '6px', gap: '6px', 'borderRadius': '10px', 'marginTop': '10px', 'marginLeft': '20px', 'width': 'fit-content' }}>
        <Grid item>
          <Button
            onClick={() => setSelectedComponent('pohjakarttanäkymä')}
            sx={{ color: 'black', padding: '6px 10px', 'borderRadius': '6px', backgroundColor: selectedComponent === 'pohjakarttanäkymä' ? 'white' : 'transparent', 'fontWeight': 500 }}
          >
            Pohjakarttanäkymä
          </Button>
        </Grid>
        <Grid item>
          <Button
          onClick={() => setSelectedComponent('kalenterinäkymä')}
          sx={{ color: 'black', padding: '6px 10px', 'borderRadius': '6px', backgroundColor: selectedComponent === 'kalenterinäkymä' ? 'white' : 'transparent', 'fontWeight': 500 }}
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
                <FilterForm onClassroomChange={handleClassroomChange} schoolData={data} />
              </Box>
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
                <ToggleButtonGroup
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
                </ToggleButtonGroup>
                <Box>
                  {/* <FloorPlanBase></FloorPlanBase> */}
                  <FloorPlan5 />
                </Box>
              </Box>
            </>
          )
        }

        {
          selectedComponent === "kalenterinäkymä" && (
            <>
              <Box sx={{ width: '30%', padding: '20px', border: '1px solid #ddd', borderRadius: '4px' }}>
                <Typography sx={{ marginBottom: '20px', fontWeight: 'bold' }} variant="h5">{data.name}</Typography>
                <Typography sx={{ marginBottom: '40px' }}>Kolmikerroksinen koulurakennus, jossa on noin 150 opetustilaa</Typography>

                <Grid container spacing={2} fullWidth>
                  <Grid item lg={5}>
                    <FormControl fullWidth>
                      <InputLabel id="building-label">Rakennus</InputLabel>
                      <Select
                        labelId="building-label"
                        id="building-select"
                        name="building"
                        required
                        fullWidth
                        label="Rakennus"
                        placeholder="Valitse rakennus"
                        value={calendarBuilding}
                        onChange={(event) => setCalendarBuilding(event.target.value)}
                      >
                        {
                          data.buildings.map((buildingData) => {
                            return <MenuItem key={`menu-item-${buildingData.name}`} value={buildingData.name}>{buildingData.name}</MenuItem>
                          })
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item lg={5}>
                    <FormControl fullWidth>
                      <InputLabel id="floor-label">Valitse kerros</InputLabel>
                      <Select
                        labelId="floor-label"
                        id="floor-select"
                        name="floor"
                        required
                        fullWidth
                        label="Valitse kerros"
                        placeholder="Valitse kerros"
                        value={calendarFloor}
                        onChange={(event) => setCalendarFloor(event.target.value)}
                      >
                        {
                          [ 1, 2, 3].map((value) => {
                            return <MenuItem key={`menu-item-${value}`} value={value}>{value}</MenuItem>
                          })
                        }
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item lg={10}>
                    <FormControl fullWidth>
                      <InputLabel id="room-label">Opetustila</InputLabel>
                      <Select
                        labelId="room-label"
                        id="room-select"
                        name="room"
                        required
                        fullWidth
                        label="Valitse opetustila"
                        placeholder="Valitse opetustila"
                        value={calendarRoom}
                        onChange={(event) => setCalendarRoom(event.target.value)}
                      >
                        {
                          data.buildings[0].floors[0].rooms.map((room) => {
                            return <MenuItem key={`menu-item-${room.number}`} value={room.number}>{room.number}</MenuItem>
                          })
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

              </Box>
              <Box sx={{ width: '100%', padding: '20px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#fbfbfb' }}>
                {
                  (calendarBuilding && calendarFloor && calendarRoom)
                    ? <Calendar />
                    : <Typography>Nähdäksesi kalenterin valitse ensin rakennus, kerros ja opetustila.</Typography>
                }
              </Box>
            </>
          )
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
