import { Grid, Typography, Divider, TextField, MenuItem, Select, FormControl, InputLabel, Button, FormControlLabel, Switch } from "@mui/material"
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { fiFI } from "@mui/x-date-pickers/locales"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { useCreateReservationMutation } from "../api/reservations"
import { getCookie } from "../utils/Cookies"
import { fetchUserDataByEmail } from "../api/userApi"

const AdminCreateReservationDialog = ({ rooms }) => {
  const { register, handleSubmit, watch, control } = useForm();
  const createReservationMutation = useCreateReservationMutation();

  const [ reservationHasExceptions, setReservationHasExceptions ] = useState(false);
  const [ user, setUser ] = useState({});

  const handleReservationSwitchChange = () => setReservationHasExceptions(!reservationHasExceptions);
  
  useEffect(() => {
		const email = getCookie('UserEmail');
		if (email) {
			fetchUserDataByEmail(email)
				.then(userData => {
					setUser(userData)
				})
				.catch(error => {
					console.error('Error fetching user data:', error);
				});
		}
	}, []);

  const onSubmit = (data) => {
    data = {
      ...data,

      startTime: data.startTime.format("HH:mm"),
      endTime: data.endTime.format("HH:mm")
    }

    console.log('data: ', data)

    const generateRecurringReservations = (baseDate, endDate, interval, reservationData) => {
      let currentDate = dayjs(baseDate);
      const end = dayjs(endDate);
      const reservations = [];

      while (currentDate.isBefore(end) || currentDate.isSame(end, 'day')) {
        reservations.push({
          ...reservationData,
          reservationDate: currentDate,
          startTime: data.startTime ? formatTime(data.startTime) : null,
          endTime: data.endTime ? formatTime(data.endTime) : null,
        });

        currentDate = currentDate.add(interval, 'day');
      }

      return reservations;
    }


    const reservationData = {
      userId: user._id, // userId
      reservationDate: data.reservationDate ? data.reservationDate : null,
      reservationEndDate: data.endDate ? data.reservationEndDate : null,
      startTime: data.startTime,
      endTime: data.endTime,
      purpose: data.reservationName, // string
      roomId: data.classroom._id, // roomId
      groupsize: data.reservationGroupSize, // integer
      recurrence: data.recurrence ? data.recurrence : 'none',
      additionalInfo: data.additionalInfo
    }    

    if (data.recurrence === 'none') {
      createReservationMutation.mutate(reservationData);
    } else if (data.recurrence === 'daily' && data.reservationEndDate) {
      const reservations = generateRecurringReservations(data.reservationDate, data.reservationEndDate, 1, reservationData);
      reservations.forEach(reservation => {
        createReservationMutation.mutate(reservation);
      });
    } else if (data.recurrence === 'weekly' && data.reservationEndDate) {
      const reservations = generateRecurringReservations(data.reservationDate, data.reservationEndDate, 7, reservationData);
      console.log('weekly reservations: ', reservations)
      reservations.forEach(reservation => {
        createReservationMutation.mutate(reservation);
      });
    } else {
      console.error('Invalid recurrence or missing end date');
    }

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <Grid container spacing={2} padding={0} margin={0} style={{ width: "100%" }}>
        <Grid item lg={12}>
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

        <Grid item lg={12}>
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

        <Grid item lg={12}>
          <FormControl fullWidth>
            <LocalizationProvider localeText={fiFI.components.MuiLocalizationProvider.defaultProps.localeText} dateAdapter={AdapterDayjs}>
              <Controller
                name="reservationDate"
                control={control}
                defaultValue={dayjs()}
                render={({ field: { value, ...rest } }) => (
                  <DatePicker
                    {...rest}
                    value={value}
                    label="Varauksen päivämäärä*"
                    renderInput={(params) => <TextField {...params} fullWidth />}
                    format="DD/MM/YYYY"
                  />
                )}
              />
            </LocalizationProvider>
          </FormControl>
        </Grid>


        <Grid item lg={6}>
          <FormControl fullWidth>
            <LocalizationProvider localeText={fiFI.components.MuiLocalizationProvider.defaultProps.localeText} dateAdapter={AdapterDayjs}>

              <Controller
                name="startTime"
                label="Aloitusaika*"
                control={control}

                defaultValue={ dayjs() }
                render={({ field: { value, ...rest } }) => (
                  <TimePicker
                    {...rest}
                    value={value}
                    label="Aloitusaika*"
                    ampm={false}
                    defaultValue={dayjs()}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                )}
              />

            </LocalizationProvider>
          </FormControl>
        </Grid>

        <Grid item lg={6}>
          <FormControl fullWidth>
            <LocalizationProvider localeText={fiFI.components.MuiLocalizationProvider.defaultProps.localeText} dateAdapter={AdapterDayjs}>

              <Controller
                name="endTime"
                label="Lopetusaika*"
                control={control}
                defaultValue={ dayjs() }
                render={({ field: { value, ...rest } }) => (
                  <TimePicker
                    {...rest}
                    value={value}
                    label="Lopetusaika*"
                    ampm={false}
                    defaultValue={dayjs()}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                )}
              />

            </LocalizationProvider>
          </FormControl>
        </Grid>

        <Grid item lg={6}>
          <FormControl fullWidth>
            <InputLabel id="group-size-label">Ryhmän koko*</InputLabel>
            <Select
              labelId="group-size-label"
              id="group-size-select"
              name="reservationGroupSize"
              required
              fullWidth
              label="Ryhmän koko"
              defaultValue={1}
              { ...register("reservationGroupSize") }
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
            {
              rooms.map((room, index) => {
                return <MenuItem key={`menu-item-${room.number}`} value={room}>{room.number}</MenuItem>
              })
            }
            </Select>
          </FormControl>
        </Grid>

        <Grid item lg={12}>
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
              <MenuItem value="none">Älä toista</MenuItem>
              <MenuItem value="daily">Päivittäin</MenuItem>
              <MenuItem value="weekly">Viikottain</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        { /* IF RESERVATION IS RECURRING */ }
        {
          watch("recurrence") !== "none" && (
            <>
            
              <Grid item lg={12}>
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
        
              <Grid item lg={12}>
                <FormControlLabel control={<Switch onChange={handleReservationSwitchChange}/>} label="Varauksessa on poikkeuksia" />
              </Grid>
        
              { /* EXCEPTIONS */ }
              {
                reservationHasExceptions ? (
                  <>
                    <Grid item lg={12}>
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
        
                    <Grid item lg={12}>
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



        <Grid item lg={12}>
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

export default AdminCreateReservationDialog;