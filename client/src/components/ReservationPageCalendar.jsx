import { useEffect, useState } from 'react';
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { getReservations } from '../api/reservations';
import moment from 'moment';

import ReservationDialog from './ReservationDialog';

import Calendar from './Calendar';
import { fetchRoomById } from '../api/rooms';

const ReservationPageCalendar = ({ data }) => {
  // Store ids in state
  const [calendarBuilding, setCalendarBuilding] = useState(data.buildings[0]._id);
  const [calendarFloor, setCalendarFloor] = useState(data.buildings[0].floors[0]._id);
  const [calendarRoom, setCalendarRoom] = useState(data.buildings[0].floors[0].rooms[0]._id);

  // State for displaying the reservationdialog modal
  const [ newReservationDialogDefaultData, setReservationDialogDefaultData ] = useState(null);

  // Filtervalues because code reusability is horrible
  const [filterValues, setFilterValues] = useState({
    selectedDate: null,
    startingTime: null,
    endingTime: null,
  })

  useEffect(() => {
    const building = data.buildings.find((building) => building._id === calendarBuilding)

    setCalendarFloor( building.floors[0]._id )
    setCalendarRoom( building.floors[0].rooms[0]._id )
  }, [ calendarBuilding ])

  useEffect(() => {
    const building = data.buildings.find((building) => building._id === calendarBuilding)
    const floor = building.floors.find((floor) => floor._id === calendarFloor)

    setCalendarRoom( floor.rooms[0]._id )
  }, [ calendarFloor ])


  // When a user clicks a block, get its data and open the modal
  // for editing purposes
  const calendarBlockClickFn = async (reservationData) => {
    console.log("calendarBlockClickFn");
    console.log(reservationData);

    const room = await fetchRoomById(reservationData.room);

    setReservationDialogDefaultData({
      room,
      date: reservationData.date,
      startTime: reservationData.startTime,
      endTime: reservationData.endTime,
    })
  }

  // This is called when a user is in the daily view and clicks "luo uusi varaus"
  const calendarNewReservationFn = async (date, gridRow) => {
    // Calculate time of day from the "luo uusi varaus" element's gridRow
    const [ start, end ] = gridRow.split(" / ").map((value) => Number(value) - 1) // -1 because gridRow is 1-based
    const startHour = Math.floor(start / 4)
    const startMinute = ((start % 4) * 15).toString().padEnd(2, "0")

    const endHour = Math.floor(end / 4)
    const endMinute = ((end % 4) * 15).toString().padEnd(2, "0")

    const startTime = `${startHour}:${startMinute}`
    const endTime = `${endHour}:${endMinute}`
    

    const room = calendarRoom
    setReservationDialogDefaultData({ room, date: date.toDate(), startTime, endTime })
  }
  

  const numbersToWord = [
    "Yksi", "Kaksi", "Kolmi", "Neli", "Viisi", "Kuusi", "Seitsen", "Kahdeksan", "Yhdeksän", "Kymmenen"
  ]

  const floorCount = data.buildings[0].floors.length
  const roomCount = data.buildings[0].floors.reduce((acc, floor) => acc + floor.rooms.length, 0)

  const descriptionString = `${numbersToWord[floorCount - 1]}kerroksinen koulurakennus, jossa on ${roomCount} opetustilaa.`


  const building = data.buildings.find((building) => building._id === calendarBuilding)
  const floor = building?.floors.find((floor) => floor._id === calendarFloor)
  const room = floor?.rooms.find((room) => room._id === calendarRoom)

  const reservations = room?.reservations.map(reservation => {
    return {
      ...reservation,
      
      label: reservation.purpose,
      date: moment(reservation.reservationDate),
      startTime: reservation.startTime,
      endTime: reservation.endTime,
    }
  })
    
  

  return (
    <>
      {
        newReservationDialogDefaultData && (
          <ReservationDialog
            roomId={room._id}
            roomNumber={room.number}
            capacity={room.capacity}
            groupsize={0} // CURRENTLY REVERSED SPOTS IN A ROOM
            onClose={() => setReservationDialogDefaultData(null)}
            isOpen={!!newReservationDialogDefaultData}
            filterValues={{
              selectedGroupSize: 0, // HOW MANY SPOTS A USER WANTS IN A ROOM
              selectedDate: newReservationDialogDefaultData.date,
              startingTime: newReservationDialogDefaultData.startTime,
              endingTime: newReservationDialogDefaultData.endTime,
            }}
          />
        )
      }
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
                    return <MenuItem key={`menu-item-building-${buildingData.name}`} value={buildingData._id}>{buildingData.name}</MenuItem>
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
                value={calendarFloor}
              >
                {
                  building?.floors.map((floorData, index) => {
                    return <MenuItem key={`menu-item-building-${floorData.number}`} value={floorData._id}>{`${floorData.number}. kerros`}</MenuItem>
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
              >
                {
                  floor?.rooms.map((floorData, index) => {
                    return <MenuItem key={`menu-item-${floorData.number}`} value={floorData._id}>{floorData.number}</MenuItem>
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
            ? <Calendar calendarData={reservations} onBlockClickFn={calendarBlockClickFn} onNewReservationFn={calendarNewReservationFn} />
            : <Typography>Nähdäksesi kalenterin valitse ensin rakennus, kerros ja opetustila.</Typography>
        }
      </Box>
    </>
  )
}

export default ReservationPageCalendar