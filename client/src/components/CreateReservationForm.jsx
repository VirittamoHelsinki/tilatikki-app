import { Grid, Typography, Divider, TextField, MenuItem, Select, FormControl, InputLabel, Button, FormControlLabel, Switch } from "@mui/material"
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { fiFI } from "@mui/x-date-pickers/locales"
import dayjs from "dayjs"
import { useState } from "react"
import { useForm } from "react-hook-form"

const CreateReservationForm = () => {
  const { register, handleSubmit, watch } = useForm()

  const [ reservationHasExceptions, setReservationHasExceptions ] = useState(false);
  const handleReservationSwitchChange = () => setReservationHasExceptions(!reservationHasExceptions);

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

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
          <FormControl fullWidth>
            <TextField
              autoComplete="reservationName"
              name="reservationName"
              required
              fullWidth
              id="reservationName"
              label="Varauksen nimi"
              { ...register("reservationName") }
            />
          </FormControl>
        </Grid>

        <Grid item lg={10}>
          <FormControl fullWidth>
            <TextField
              autoComplete="reservationName"
              name="reservationName"
              required
              fullWidth
              id="reservationName"
              label="Lisää opettaja"
              { ...register("teacherName") }
            />
          </FormControl>
        </Grid>

        <Grid item lg={10}>
          <FormControl fullWidth>
            <LocalizationProvider localeText={fiFI.components.MuiLocalizationProvider.defaultProps.localeText} dateAdapter={AdapterDayjs}>
              <DatePicker
                autoComplete="reservationDate"
                name="reservationDate"
                required
                format="DD/MM/YYYY"
                slotProps={{ textField: { fullWidth: true }}}
                id="reservationDate"
                label="Varauksen päivämäärä*"
              { ...register("reservationDate") }
              />
            </LocalizationProvider>
          </FormControl>
        </Grid>


        <Grid item lg={5}>
          <FormControl fullWidth>
            <LocalizationProvider localeText={fiFI.components.MuiLocalizationProvider.defaultProps.localeText} dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Aloitusaika*"
                name="startTime"
                required
                fullWidth
                ampm={false}
                defaultValue={dayjs()}
                { ...register("startTime") }
              />
            </LocalizationProvider>
          </FormControl>
        </Grid>

        <Grid item lg={5}>
          <FormControl fullWidth>
            <LocalizationProvider localeText={fiFI.components.MuiLocalizationProvider.defaultProps.localeText} dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Lopetusaika*"
                name="startTime"
                required
                fullWidth
                ampm={false}
                defaultValue={dayjs()}
                { ...register("endTime") }
              />
            </LocalizationProvider>
          </FormControl>
        </Grid>

        <Grid item lg={5}>
          <FormControl fullWidth>
            <InputLabel id="group-size-label">Ryhmän koko*</InputLabel>
            <Select
              labelId="group-size-label"
              id="group-size-select"
              name="groupSize"
              required
              fullWidth
              label="Ryhmän koko"
              defaultValue={1}
              { ...register("groupSize") }
            >
              {
                Array.from({ length: 100 }).map((_, index) => (
                  <MenuItem key={index} value={index + 1}>{index + 1}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Grid>

        <Grid item lg={5}>
          <FormControl fullWidth>
          <InputLabel id="classroom-label">Opetustila*</InputLabel>
            <Select
              labelId="classroom-label"
              id="classroom-select"
              name="classroom"
              required
              fullWidth
              label="Opetustila"
              placeholder="Valitse opetustila"
              defaultValue="Vihreä lohikäärme"
              { ...register("classroom") }
            >
              <MenuItem value="Vihreä lohikäärme">Vihreä lohikäärme</MenuItem>
              <MenuItem value="Punainen panda">Punainen panda</MenuItem>
              <MenuItem value="Sininen siili">Sininen siili</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item lg={10}>
          <FormControl fullWidth>
            <InputLabel id="recurrence-label">Toistuvuus*</InputLabel>
            <Select
              labelId="recurrence-label"
              id="recurrence-select"
              name="recurrence"
              required
              fullWidth
              label="Toistuvuus"
              defaultValue={"Älä toista"}
              { ...register("recurrence") }
            >
              <MenuItem value="Älä toista">Älä toista</MenuItem>
              <MenuItem value="Päivittäin">Päivittäin</MenuItem>
              <MenuItem value="Viikottain">Viikottain</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        { /* IF RESERVATION IS RECURRING */ }
        {
          watch("recurrence") !== "Älä toista" && (
            <>
            
              <Grid item lg={10}>
                <FormControl fullWidth>
                  <LocalizationProvider localeText={fiFI.components.MuiLocalizationProvider.defaultProps.localeText} dateAdapter={AdapterDayjs}>
                    <DatePicker
                      autoComplete="endDate"
                      name="endDate"
                      required
                      format="DD/MM/YYYY"
                      slotProps={{ textField: { fullWidth: true }}}
                      id="endDate"
                      label="Varauksen päättymispäivä*"
                      { ...register("endDate") }
                      />
                    </LocalizationProvider>
                </FormControl>
              </Grid>
        
              <Grid item lg={10}>
                <FormControlLabel control={<Switch onChange={handleReservationSwitchChange}/>} label="Varauksessa on poikkeuksia" />
              </Grid>
        
              { /* EXCEPTIONS */ }
              {
                reservationHasExceptions ? (
                  <>
                    <Grid item lg={10}>
                      <FormControl fullWidth>
                        <LocalizationProvider localeText={fiFI.components.MuiLocalizationProvider.defaultProps.localeText} dateAdapter={AdapterDayjs}>
                          <DatePicker
                            autoComplete="exceptionDays"
                            name="exceptionDays"
                            required
                            format="DD/MM/YYYY"
                            slotProps={{ textField: { fullWidth: true }}}
                            id="exceptionDays"
                            label="Poikkeavat päivät"
                            { ...register("exceptionDays") }
                          />
                        </LocalizationProvider>
                      </FormControl>
                    </Grid>
        
                    <Grid item lg={10}>
                      <FormControl fullWidth>
                      <InputLabel id="exception-week-label">Poikkeavat viikot</InputLabel>
                        <Select
                          labelId="exception-week-label"
                          id="exception-week-select"
                          name="exception-week"
                          required
                          fullWidth
                          label="exception-week-label"
                          placeholder="Valitse viikot"
                          
                          { ...register("exceptionDays") }
                        >
                          <MenuItem value="Vihreä lohikäärme">Vihreä lohikäärme</MenuItem>
                          <MenuItem value="Punainen panda">Punainen panda</MenuItem>
                          <MenuItem value="Sininen siili">Sininen siili</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </>
                ) : null
              }
              { /* EXCEPTIONS END */ }
            </>
          )
        }

        <Grid item lg={10}>
          <FormControl fullWidth>
            <TextField
              InputLabelProps={{ shrink: true }}
              autoComplete="additionalInformation"
              name="additionalInformation"
              fullWidth
              id="additionalInformation"
              label="Lisätietoa"
              multiline
              placeholder="Kirjoita tähän tarvittaessa varaukseen liittyvää tietoa"
              minRows={3}
            />
          </FormControl>
        </Grid>

        
        <Grid item lg={4}>          
          <Button
            type="submit"
            variant="contained"
            sx={{ 
              mt: 3, 
              mb: 2,
              textTransform: "initial",
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

    </form>
  );
}

export default CreateReservationForm;