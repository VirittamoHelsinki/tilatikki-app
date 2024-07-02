import { Grid, Typography, Divider, TextField, MenuItem, Select, FormControl, InputLabel, Button } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import Calendar from "./Calendar"
import { useEffect, useState } from "react"
import { getReservations } from "../api/reservations"
import moment from "moment"

const AdminSemesterReservation = () => {

  const [ reservations, setReservations ] = useState([])

  useEffect(() => {
    const fetchReservations = async () => {
      const fetchedReservations = (await getReservations())
        .map(reservation => {
          const startDate = moment(reservation.startTime);
          const endDate = moment(reservation.endTime);
          console.log(startDate.day());
          return {
            ...reservation,
            
            label: reservation.purpose,
            startDate: startDate,
            startTime: startDate.format('HH:mm'),
            endDate: endDate,
            endTime: endDate.format('HH:mm'),
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
        
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <Typography component="h1" variant="h5">
              Lukukausivaraukset
            </Typography>

            <Typography component="p" variant="subtitle1">
              Tee varauksia koko lukukaudelle.
            </Typography>

            <Divider sx={{ mt: 4, mb: 4 }} />
          </Grid>

          <Grid item lg={10}>
            <TextField
              autoComplete="reservationName"
              name="reservationName"
              required
              fullWidth
              id="reservationName"
              label="Varauksen nimi"
            />
          </Grid>

          <Grid item lg={10}>
            <TextField
              autoComplete="reservationName"
              name="reservationName"
              required
              fullWidth
              id="reservationName"
              label="Lisää opettaja"
            />
          </Grid>

          <Grid item lg={5}>
            <LocalizationProvider localeText={"fi"} dateAdapter={AdapterDayjs}>
              <DatePicker
                autoComplete="reservationName"
                name="reservationName"
                required
                fullWidth
                id="reservationName"
                label="Valitse aloituspäivä"
              />
            </LocalizationProvider>
          </Grid>


          <Grid item lg={5}>
            <FormControl fullWidth>
              <InputLabel id="start-time-label">Valitse aloitusaika</InputLabel>
                <Select
                  labelId="start-time-label"
                  id="start-time-selec"
                  name="startTime"
                  required
                  fullWidth
                  label="Valitse aloitusaika"
                  defaultValue={timeSelectionOptions[0]}
                >
                  {
                    timeSelectionOptions.map((value) => {
                      return <MenuItem key={`menu-item-${value}`} value={value}>{value}</MenuItem>
                    })
                  }
                </Select>
            </FormControl>
          </Grid>

          <Grid item lg={5}>
            <LocalizationProvider localeText={"fi"} dateAdapter={AdapterDayjs}>
              <DatePicker
                autoComplete="reservationName"
                name="reservationName"
                required
                fullWidth
                id="reservationName"
                label="Valitse lopetuspäivä"
              />
            </LocalizationProvider>
          </Grid>

          <Grid item lg={5}>
            <FormControl fullWidth>
              <InputLabel id="end-time-label">Valitse lopetusaika</InputLabel>
              <Select
                labelId="end-time-label"
                id="end-time-select"
                name="startTime"
                required
                fullWidth
                label="Valitse lopetusaika"
                defaultValue={timeSelectionOptions[timeSelectionOptions.length - 1]}
              >
                {
                  timeSelectionOptions.map((value) => {
                    return <MenuItem key={`menu-item-${value}`} value={value}>{value}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
          </Grid>

          <Grid item lg={5}>
          <FormControl fullWidth>
              <InputLabel id="group-size-label">Ryhmän koko</InputLabel>
              <Select
                labelId="group-size-label"
                id="group-size-select"
                name="groupSize"
                required
                fullWidth
                label="Ryhmäkoko"
                defaultValue={10}
              >
                {
                  Array.from({ length: 100 }).map((_, index) => {
                    const value = index + 1
                    return <MenuItem key={`menu-item-${value}`} value={value}>{value}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
          </Grid>

          <Grid item lg={5}>
            <FormControl fullWidth>
              <InputLabel id="classroom-label">Opetustila</InputLabel>
              <Select
                labelId="classroom-label"
                id="classroom-select"
                name="classroom"
                required
                fullWidth
                label="Opetustila"
                defaultValue={"Vihreä lohikäärme"}
              >
                <MenuItem value="Vihreä lohikäärme">Vihreä lohikäärme</MenuItem>
                <MenuItem value="Punainen panda">Punainen panda</MenuItem>
                <MenuItem value="Sininen siili">Sininen siili</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item lg={10}>
            <FormControl fullWidth>
              <InputLabel id="repetition-label">Toistuvuus</InputLabel>
              <Select
                labelId="repetition-label"
                id="repetition-select"
                name="repetition"
                required
                fullWidth
                label="Toistuvuus"
                defaultValue={"Älä toista"}
              >
                <MenuItem value="Älä toista">Älä toista</MenuItem>
                <MenuItem value="Päivittäin">Päivittäin</MenuItem>
                <MenuItem value="Viikottain">Viikottain</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item lg={10}>
            <TextField
              autoComplete="reservationName"
              name="reservationName"
              fullWidth
              id="reservationName"
              label="Lisätietoja"
              multiline
              rows={4}
            />
          </Grid>

          <Grid item lg={3}>          
            <Button
              type="submit"
              variant="contained"
              sx={{ 
                mt: 3, 
                mb: 2,
                backgroundColor: '#18181B', // Change this to your desired color
                '&:hover': {
                  backgroundColor: '#2b2b2b' // Change this to a lighter shade of your color
                }
              }}
            >
              Varaa tila
            </Button>
          </Grid>

        </Grid>
  

      </Grid>
      <Grid item xs={8}>
        <Calendar calendarData={reservations}/>
      </Grid>
    </Grid>  
    


  )

}

export default AdminSemesterReservation