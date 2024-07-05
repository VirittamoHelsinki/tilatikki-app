import { Grid, Typography, Divider, TextField, MenuItem, Select, FormControl, InputLabel, Button, FormControlLabel, Switch } from "@mui/material"
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import Calendar from "./Calendar"
import { useEffect, useState } from "react"
import { getReservations } from "../api/reservations"
import moment from "moment"
import { fiFI } from "@mui/x-date-pickers/locales"
import dayjs from "dayjs"
import AdminCreateReservationDialog from "./AdminCreateReservationDialog"

const AdminSemesterReservation = () => {

  const [ reservations, setReservations ] = useState([])

  useEffect(() => {
    const fetchReservations = async () => {
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

      setReservations(fetchedReservations)

      console.log('Fetched reservations:', fetchedReservations);
    }
    
    fetchReservations()
  }, [])

  const hours = 24
  const divideHourIntoSections = 4
  const timeSelectionOptions = Array.from({ length: hours * divideHourIntoSections }).map((_, index) => {
    const hour = Math.floor(index / divideHourIntoSections)
    const minute = (index % 4) * 15
    return `${hour}:${minute.toString().padStart(2, '0')}`
  })

  return (

    <Grid container spacing={0}>
      <Grid item xs={4}>
        
        <AdminCreateReservationDialog />
  

      </Grid>
      <Grid item xs={8}>
        <Calendar calendarData={reservations}/>
      </Grid>
    </Grid>  
    


  )

}

export default AdminSemesterReservation