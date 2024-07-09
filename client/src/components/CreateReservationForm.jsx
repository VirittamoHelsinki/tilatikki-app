import React from 'react';
import { Box, Grid, Typography, Divider, TextField, MenuItem, Select, FormControl, InputLabel, Button, FormControlLabel, Switch } from "@mui/material"
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { fiFI } from "@mui/x-date-pickers/locales"
import dayjs from "dayjs"
import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import PeopleIcon from '@mui/icons-material/People';



const CreateReservationForm = ({
  createReservationMutation,
  roomNumber,
  roomId,
  capacity,
  groupsize,
  user,
  onClose }) => {
  const { control, register, handleSubmit, watch } = useForm()

  const [reservationHasExceptions, setReservationHasExceptions] = useState(false);

  const handleReservationSwitchChange = () => setReservationHasExceptions(!reservationHasExceptions);

  const onSubmit = (data) => {
    console.log(data)

    const generateRecurringReservations = (baseDate, endDate, interval, reservationData) => {
      let currentDate = dayjs(baseDate);
      const end = dayjs(endDate);
      const reservations = [];

      while (currentDate.isBefore(end) || currentDate.isSame(end, 'day')) {
        reservations.push({
          ...reservationData,
          reservationDate: currentDate,
          startTime: startTime ? formatTime(startTime) : null,
          endTime: endTime ? formatTime(endTime) : null,
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
      roomId: roomId, // roomId
      groupsize: data.reservationGroupSize, // integer
      recurrence: data.recurrence ? data.recurrence : 'none',
      additionalInfo: data.additionalInfo
    }


    console.log('reservationData: ', reservationData)

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

    onClose();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ marginTop: 0, marginBottom: 0 }}>
            <Typography variant="h4">{roomNumber}</Typography>
          </Box>
          <Box sx={{ marginTop: 0, marginBottom: 0, display: 'flex', alignItems: 'center' }}>
            {<Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
              <PeopleIcon sx={{ marginRight: 1 }} />{groupsize} / {capacity}
            </Typography>}
          </Box>
          <Box sx={{ marginTop: 1, marginBottom: 0 }}>
            <Typography variant="h6">Varauksen tekijä</Typography>
            <Typography style={{ color: 'gray' }} variant="body1">{user.name} {user.surname}</Typography>
          </Box>
        </Grid>

        <Grid item lg={12}>
          <FormControl fullWidth>
            <TextField
              autoComplete="reservationName"
              name="reservationName"
              required
              fullWidth
              id="reservationName"
              label="Varauksen nimi"
              {...register("reservationName")}
            />
          </FormControl>
        </Grid>

        <Grid item lg={12}>
          <FormControl fullWidth margin="dense">
            <InputLabel id="group-size-label">Ryhmän koko (max. {capacity - groupsize} oppilasta)</InputLabel>
            <Select
              labelId="group-size-label"
              id="group-size"
              label={`Ryhmän koko (max. ${capacity - groupsize} oppilasta)`}  // Ensure the label is also set in the Select
              {...register("reservationGroupSize")}
            >
              {[...Array(capacity - groupsize).keys()].map((index) => {
                const size = index + 1; // Shift the range to start from 1
                return (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>


        <Grid item lg={12}>
          <FormControl fullWidth>
            <LocalizationProvider localeText={fiFI.components.MuiLocalizationProvider.defaultProps.localeText} dateAdapter={AdapterDayjs}>
              <Controller
                name="reservationDate"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <DatePicker
                    {...field}
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
              <TimePicker
                label="Aloitusaika*"
                name="startTime"
                required
                fullWidth
                ampm={false}
                defaultValue={dayjs()}
                {...register("startTime")}
              />
            </LocalizationProvider>
          </FormControl>
        </Grid>

        <Grid item lg={6}>
          <FormControl fullWidth>
            <LocalizationProvider localeText={fiFI.components.MuiLocalizationProvider.defaultProps.localeText} dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Lopetusaika*"
                name="startTime"
                required
                fullWidth
                ampm={false}
                defaultValue={dayjs()}
                {...register("endTime")}
              />
            </LocalizationProvider>
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
              {...register("recurrence")}
            >
              <MenuItem value="none">Älä toista</MenuItem>
              <MenuItem value="daily">Päivittäin</MenuItem>
              <MenuItem value="weekly">Viikottain</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        { /* IF RESERVATION IS RECURRING */}
        {
          watch("recurrence") !== "Älä toista" && (
            <>

              <Grid item lg={12}>
                <FormControl fullWidth>
                  <LocalizationProvider localeText={fiFI.components.MuiLocalizationProvider.defaultProps.localeText} dateAdapter={AdapterDayjs}>
                    <DatePicker
                      autoComplete="endDate"
                      name="endDate"
                      required
                      format="DD/MM/YYYY"
                      slotProps={{ textField: { fullWidth: true } }}
                      id="endDate"
                      label="Varauksen päättymispäivä*"
                      {...register("endDate")}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>

              <Grid item lg={12}>
                <FormControlLabel control={<Switch onChange={handleReservationSwitchChange} />} label="Varauksessa on poikkeuksia" />
              </Grid>

              { /* EXCEPTIONS */}
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
                            slotProps={{ textField: { fullWidth: true } }}
                            id="exceptionDays"
                            label="Poikkeavat päivät"
                            {...register("exceptionDays")}
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

                          {...register("exceptionDays")}
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
              { /* EXCEPTIONS END */}
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
              {...register("additionalInfo")}

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

    </form >
  );
}

export default CreateReservationForm;
