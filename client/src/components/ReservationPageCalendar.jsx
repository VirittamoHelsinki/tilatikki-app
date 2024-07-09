import { useState } from 'react';
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'

import Calendar from './Calendar';

const ReservationPageCalendar = ({ data }) => {

  const [calendarBuilding, setCalendarBuilding] = useState(null);
  const [calendarFloor, setCalendarFloor] = useState(null);
  const [calendarRoom, setCalendarRoom] = useState(null);

  const numbersToWord = [
    "Yksi", "Kaksi", "Kolmi", "Neli", "Viisi", "Kuusi", "Seitsen", "Kahdeksan", "Yhdeksän", "Kymmenen"
  ]

  const floorCount = data.buildings[0].floors.length
  const roomCount = data.buildings[0].floors.reduce((acc, floor) => acc + floor.rooms.length, 0)

  const descriptionString = `${numbersToWord[floorCount - 1]}kerroksinen koulurakennus, jossa on ${roomCount} opetustilaa.`

  console.log(data);
  console.log(calendarBuilding, calendarFloor, calendarRoom);
  console.log(data.buildings[calendarBuilding]);

  return (
    <>
      <Box sx={{ width: '30%', padding: '20px', border: '1px solid #ddd', borderRadius: '4px' }}>
        <Typography sx={{ marginBottom: '20px', fontWeight: 'bold' }} variant="h5">{data.name}</Typography>
        <Typography sx={{ marginBottom: '40px' }}>{ descriptionString }</Typography>

        <Grid container spacing={2} fullWidth>
          <Grid item lg={6}>
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
                  data.buildings.map((buildingData, index) => {
                    return <MenuItem key={`menu-item-building-${buildingData.name}`} value={index}>{buildingData.name}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={6}>
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
                onChange={(event) => setCalendarFloor(event.target.value)}

              >
                {
                  calendarBuilding !== null && data.buildings[calendarBuilding].floors.map((floorData, index) => {
                    return <MenuItem key={`menu-item-building-${floorData.number}`} value={index}>{`${floorData.number}. kerros`}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
          </Grid>

          <Grid item lg={12}>
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
                disabled={calendarFloor === null || calendarBuilding === null}
              >
                {
                  calendarBuilding !== null && calendarFloor !== null && data.buildings[calendarBuilding].floors[calendarFloor].rooms.map((room) => {
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
          (calendarBuilding !== null && calendarFloor !== null && calendarRoom !== null)
            ? <Calendar />
            : <Typography>Nähdäksesi kalenterin valitse ensin rakennus, kerros ja opetustila.</Typography>
        }
      </Box>
    </>
  )
}

export default ReservationPageCalendar