import { Box, Grid, Typography, Divider, TextField, MenuItem, Select, FormControl, InputLabel, Button, FormControlLabel, Switch } from "@mui/material"
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
                <InputLabel id="group-size-label">Koulussa*</InputLabel>
                <Select
                  labelId="group-size-label"
                  id="group-size-select"
                  name="groupSize"
                  required
                  fullWidth
                  label="Koulussa"
                  defaultValue={1}
                >
                  {
                    Array.from({ length: 100 }).map((_, index) => (
                      <MenuItem key={index} value={index + 1}>{index + 1}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>

            </Grid>

            <Grid item lg={6}>
              <FormControl fullWidth>
                <InputLabel id="group-size-label">Rakennuksessa*</InputLabel>
                <Select
                  labelId="group-size-label"
                  id="group-size-select"
                  name="groupSize"
                  required
                  fullWidth
                  label="Rakennuksessa"
                  defaultValue={1}
                  disabled
                >
                  {
                    Array.from({ length: 100 }).map((_, index) => (
                      <MenuItem key={index} value={index + 1}>{index + 1}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>

            <Grid item lg={12}>
              <Divider />
            </Grid>


            <AdminCreateReservationDialog />
          </Grid>

        </Box>
      
      </Grid>
      



      <Box>
        <Calendar reservations={reservations} />
      </Box>
    </Box>  
    


  )

}

export default AdminSemesterReservation