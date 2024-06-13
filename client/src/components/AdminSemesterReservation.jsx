import { Grid, Typography, Divider, TextField, MenuItem, Select, FormControl, InputLabel } from "@mui/material"
import { DatePicker, DigitalClock, LocalizationProvider, TimePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import Calendar from "./Calendar"

const AdminSemesterReservation = () => {

  const hours = 24
  const divideHourIntoSections = 4
  const timeSelectionOptions = Array.from({ length: hours * divideHourIntoSections }).map((_, index) => {
    const hour = Math.floor(index / divideHourIntoSections)
    const minute = (index % 4) * 15
    return `${hour}:${minute.toString().padStart(2, '0')}`
  })

  console.log(timeSelectionOptions);

  return (

    <Grid container spacing={0}>
      <Grid item xs={4}>
        
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <Typography component="h1" variant="h5">
              Käyttäjätiedot
            </Typography>

            <Typography component="p" variant="subtitle1">
              Muokkaa omia käyttäjätietojasi.
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
            <TextField
              autoComplete="reservationName"
              name="reservationName"
              required
              fullWidth
              id="reservationName"
              label="Opetustila"
            />
          </Grid>

          <Grid item lg={10}>
            <TextField
              autoComplete="reservationName"
              name="reservationName"
              required
              fullWidth
              id="reservationName"
              label="Toistuvuus"
            />
          </Grid>

          <Grid item lg={10}>
            <TextField
              autoComplete="reservationName"
              name="reservationName"
              fullWidth
              id="reservationName"
              label="Lisätietoja"
            />
          </Grid>

        </Grid>
  

      </Grid>
      <Grid item xs={8}>
        <Calendar />
      </Grid>
    </Grid>  
    


  )

}

export default AdminSemesterReservation