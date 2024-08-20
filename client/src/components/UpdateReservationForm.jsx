import React, { useEffect } from 'react';
import { Box, Grid, Typography, Checkbox, TextField, MenuItem, Select, FormControl, InputLabel, Button, FormControlLabel, Switch } from "@mui/material"
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { fiFI } from "@mui/x-date-pickers/locales"
import dayjs from "dayjs"
import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import PeopleIcon from '@mui/icons-material/People';
import { useDeleteReservationByGroupIdMutation, useDeleteReservationMutation } from '../api/reservations';
import { useCreateReservationMutation } from '../api/reservations';
import { v4 as uuid } from "uuid"

const UpdateReservationForm = ({
  updateReservationMutation,
  reservationId,
  reservationGroupId,
  roomNumber,
  roomId,
  capacity,
  groupsize,
  user,
  onClose,
  filterValues,
}) => {
  const { control, register, handleSubmit, watch } = useForm()

  const [reservationHasExceptions, setReservationHasExceptions] = useState(false);

  const handleReservationSwitchChange = () => setReservationHasExceptions(!reservationHasExceptions);
  const deleteReservationMutation = useDeleteReservationMutation();
  const deleteReservationByGroupIdMutation = useDeleteReservationByGroupIdMutation();
  const createReservationMutation = useCreateReservationMutation();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this reservation?')) {
      deleteReservationMutation.mutate(reservationId);
    }
    onClose();
  };

  const handleRecurringDeletion = () => {
    // Delete all reservations with the same reservationGroupId
    console.log('reservation group id in update: ', reservationGroupId)
    deleteReservationByGroupIdMutation.mutate(reservationGroupId)
  };

  const onSubmit = (data) => {
    data = {
      ...data,

      startTime: data.startTime.format("HH:mm"),
      endTime: data.endTime.format("HH:mm")
    }

    const generateRecurringReservations = (baseDate, endDate, interval, reservationData) => {
      let currentDate = dayjs(baseDate);
      const end = dayjs(endDate);
      const reservations = [];

      while (currentDate.isBefore(end) || currentDate.isSame(end, 'day')) {
        reservations.push({
          ...reservationData,
          reservationDate: currentDate,
          startTime: data.startTime ? data.startTime : null,
          endTime: data.endTime ? data.endTime : null,
        });

        currentDate = currentDate.add(interval, 'day');
      }

      return reservations;
    }


    const updatedData = {
      userId: user._id,
      reservationId: reservationId,
      reservationDate: data.reservationDate ? data.reservationDate : null,
      reservationEndDate: data.endDate ? data.reservationEndDate : null,
      reservationGroupId: uuid(),
      startTime: data.startTime,
      endTime: data.endTime,
      purpose: data.reservationName, // string
      roomId: roomId, // roomId
      groupsize: data.reservationGroupSize, // integer
      recurrence: data.recurrence ? data.recurrence : 'none',
      additionalInfo: data.additionalInfo
    }

    if (data.recurrence === 'none') {
      updateReservationMutation.mutate({ reservationId, updatedData });
      handleRecurringDeletion();
    } else if (data.recurrence === 'daily' && data.reservationEndDate) {
      const reservations = generateRecurringReservations(data.reservationDate, data.reservationEndDate, 1, updatedData);
      reservations.forEach(reservation => {
        createReservationMutation.mutate(reservation);
      });
      handleRecurringDeletion();
    } else if (data.recurrence === 'weekly' && data.reservationEndDate) {
      const reservations = generateRecurringReservations(data.reservationDate, data.reservationEndDate, 7, updatedData);
      console.log('weekly reservations: ', reservations)
      reservations.forEach(reservation => {
        createReservationMutation.mutate(reservation);
      });
      handleRecurringDeletion();
    } else {
      console.error('Invalid recurrence or missing end date');
    }

    onClose();
  }

  console.log(watch("startTime"));

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
            <InputLabel id="group-size-label">Ryhmän koko (max. {capacity} oppilasta)</InputLabel>
            <Select
              labelId="group-size-label"
              defaultValue={groupsize}
              id="group-size"
              label={`Ryhmän koko (max. ${capacity} oppilasta)`}  // Ensure the label is also set in the Select
              {...register("reservationGroupSize")}
            >
              {[...Array(capacity).keys()].map((index) => {
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
                defaultValue={filterValues.selectedDate ? dayjs(filterValues.selectedDate) : null}
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

                defaultValue={
                  filterValues.startingTime
                    ? dayjs(`1970-01-01T${filterValues.startingTime.split(':').map(part => part.padStart(2, '0')).join(':')}`)
                    : dayjs()
                }
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
                defaultValue={
                  filterValues.endingTime
                    ? dayjs(`1970-01-01T${filterValues.endingTime.split(':').map(part => part.padStart(2, '0')).join(':')}`)
                    : dayjs()
                }
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
              defaultValue={"none"}
              {...register("recurrence")}
            >
              <MenuItem value="none">Älä toista</MenuItem>
              <MenuItem value="daily">Päivittäin</MenuItem>
              <MenuItem value="weekly">Viikottain</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        { /* IF RESERVATION IS RECURRING */

          console.log('recurrence: ', watch("recurrence"))
        }
        {
          watch("recurrence") !== "none" && watch("recurrence") && (
            <>

              <Grid item lg={12}>
                <FormControl fullWidth>
                  <LocalizationProvider localeText={fiFI.components.MuiLocalizationProvider.defaultProps.localeText} dateAdapter={AdapterDayjs}>
                    <Controller
                      name="reservationEndDate"
                      control={control}
                      defaultValue={filterValues.selectedDate ? dayjs(filterValues.selectedDate) : null}
                      render={({ field: { value, ...rest } }) => (
                        <DatePicker
                          {...rest}
                          value={value}
                          label="Varauksen päättymispäivämäärä*"
                          renderInput={(params) => <TextField {...params} fullWidth />}
                          format="DD/MM/YYYY"
                        />
                      )}
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
              mt: 1,
              mb: 2,
              textTransform: 'none',
              backgroundColor: '#18181B', // Change this to your desired color
            }}
          >
            Tallenna muutokset
          </Button>
        </Grid>

        <Grid item lg={4}>
          <Button
            onClick={handleDelete}
            variant="contained"
            sx={{
              mt: 1,
              mb: 2,
              textTransform: 'none',
              backgroundColor: '#B21010', // Change this to your desired color
              '&:hover': {
                backgroundColor: '#B21010', // Change this to a lighter shade of your color
              },
            }}
          >
            Poista varaus
          </Button>
        </Grid>
      </Grid>

    </form >
  );
}

export default UpdateReservationForm;
