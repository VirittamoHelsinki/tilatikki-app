import { Box, Grid, Typography, Divider, TextField, MenuItem, Select, FormControl, InputLabel, Button, FormControlLabel, Switch } from "@mui/material"
import Calendar from "./Calendar"
import { useEffect, useState } from "react"
import { getReservations } from "../api/reservations"
import { useAllSchoolsQuery } from "../api/schools"
import moment from "moment"
import AdminCreateReservationDialog from "./AdminCreateReservationDialog"
import { useForm } from "react-hook-form"
import dayjs from "dayjs"

const AdminSemesterReservation = () => {
  const { data: schoolData } = useAllSchoolsQuery()
  const { watch, register, resetField } = useForm({
    defaultValues: {
      school: null,
      building: null,
    }
  })

  const [ reservationDialogDefaultData, setReservationDialogDefaultData ] = useState(null)
  const [ reservations, setReservations ] = useState([])

  useEffect(() => {
    const fetchReservations = async () => {
      // Map to change format for reservations to fit calendar
      const fetchedReservations = (await getReservations())
        .map(reservation => {
          return {
            ...reservation,
            
            label: reservation.purpose,
            date: moment(reservation.reservationDate),
            startTime: reservation.startTime,
            endTime: reservation.endTime,
          }
        })
        .filter((revervation) => {
          return watch("building").floors.some((floor) => floor.rooms.some((room) => room._id === revervation.room))
        })

      setReservations(fetchedReservations)
      console.log('Fetched reservations:', fetchedReservations);
    }
    
    setReservations([])
    if (watch("school") && watch("building")) {
      console.log("USE EFFECT", watch("school"), watch("building"));
      fetchReservations()
    }
    
  }, [ watch("school"), watch("building") ])

  useEffect(() => {
    resetField("building")
  }, [ watch("school") ])

  const rooms = watch("building")?.floors.flatMap((floor) => floor.rooms) || []

  // This is called when a user is in the daily view and clicks "luo uusi varaus"
  const calendarNewReservationFn = async (date, gridRow) => {
    // Calculate time of day from the "luo uusi varaus" element's gridRow
    const [ start, end ] = gridRow.split(" / ").map((value) => Number(value) - 1) // -1 because gridRow is 1-based
    const startHour = Math.floor(start / 4)
    const startMinute = ((start % 4) * 15).toString().padEnd(2, "0")

    const endHour = Math.floor(end / 4)
    const endMinute = ((end % 4) * 15).toString().padEnd(2, "0")

    const startTime = (`${startHour}:${startMinute}`)
    const endTime = (`${endHour}:${endMinute}`)

    
    setReservationDialogDefaultData({
      reservationDate: dayjs(date.toDate()),
      startTime: dayjs(`1970-01-01T${startTime.split(':').map(part => part.padStart(2, '0')).join(':')}`),
      endTime:  dayjs(`1970-01-01T${endTime.split(':').map(part => part.padStart(2, '0')).join(':')}`),
    })
  }

  if (!schoolData) {
    return <p>loading...</p>
  }

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "4fr 8fr", gap: "32px", }}>
      <Grid item lg={4}>

        <Box>
          <Grid container spacing={2}>
            <Grid item lg={12}>
              <Typography component="h1" variant="h5">Lukukausivaraukset</Typography>
            </Grid>

            <Grid item lg={12}>
              <Typography component="p" variant="subtitle1">Tee varauksia koko lukukaudelle.</Typography>
            </Grid>

            <Grid item lg={12}>
              <Divider />
            </Grid>

            <Grid item lg={12}>
              <Typography component="p" variant="subtitle1">Näytä varaukset kalenterissa</Typography>
            </Grid>

            <Grid item lg={6}>
              <FormControl fullWidth>
                <InputLabel id="school-filter-label">Koulussa*</InputLabel>
                <Select
                  labelId="school-filter-label"
                  id="school-filter"
                  name="school"
                  required
                  fullWidth
                  label="Koulussa"
                  { ...register("school") }
                >
                  {
                    schoolData.map((school, index) => (
                      <MenuItem key={index} value={school}>{ school.name }</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>

            </Grid>

            <Grid item lg={6}>
              <FormControl fullWidth>
                <InputLabel id="building-filter-label">Rakennuksessa*</InputLabel>
                <Select
                  labelId="building-filter-label"
                  id="building-filter"
                  name="building"
                  required
                  fullWidth
                  label="Rakennuksessa"
                  disabled={!watch("school")}
                  { ...register("building") }
                >
                  {
                    watch("school")?.buildings.map((building, index) => (
                      <MenuItem key={index} value={building}>{ building.name }</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>

            <Grid item lg={12}>
              <Divider />
            </Grid>


            <AdminCreateReservationDialog
              rooms={rooms}
              reservationDialogDefaultData={reservationDialogDefaultData}
              disabled={ !!!watch("building") }
            />
          </Grid>

        </Box>
      
      </Grid>
      



      <Box>
        <Calendar calendarData={reservations} onNewReservationFn={calendarNewReservationFn}  />
      </Box>
    </Box>  
    


  )

}

export default AdminSemesterReservation