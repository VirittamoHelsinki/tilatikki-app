import React, { useEffect, useState } from 'react';
import {
  Box, Grid, Typography, Checkbox, TextField, MenuItem, Select,
  FormControl, InputLabel, Button, FormControlLabel, Switch
} from "@mui/material";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { fiFI } from "@mui/x-date-pickers/locales";
import dayjs from "dayjs";
import { useForm, Controller } from "react-hook-form";
import PeopleIcon from '@mui/icons-material/People';
import { v4 as uuid } from "uuid";

const CreateReservationForm = ({
  createReservationMutation,
  roomNumber,
  roomId,
  capacity,
  groupsize,
  user,
  onClose,
  filterValues,
  setSnackbarMessage,  // Add this prop
  setSnackbarOpen      // Add this prop
}) => {
  const { control, register, handleSubmit, watch } = useForm();
  const [reservationHasExceptions, setReservationHasExceptions] = useState(false);
  const [disableSubmitButton, setDisableSubmitButton] = useState(false);

  useEffect(() => {
    groupsize > 0 && groupsize < capacity && setDisableSubmitButton(true);
  }, []);

  const handleReservationSwitchChange = () => setReservationHasExceptions(!reservationHasExceptions);
  const handleDisableSubmitButton = () => setDisableSubmitButton(!disableSubmitButton);

  const onSubmit = (data) => {
    data = {
      ...data,
      startTime: data.startTime.format("HH:mm"),
      endTime: data.endTime.format("HH:mm")
    };

    const reservationGroupId = uuid();
    const reservationData = {
      userId: user._id,
      reservationDate: data.reservationDate ? data.reservationDate : null,
      reservationEndDate: data.reservationEndDate ? data.reservationEndDate : null,
      reservationGroupId: reservationGroupId,
      startTime: data.startTime,
      endTime: data.endTime,
      purpose: data.reservationName,
      roomId: roomId,
      groupsize: data.reservationGroupSize,
      recurrence: data.recurrence ? data.recurrence : 'none',
      additionalInfo: data.additionalInfo
    };

    createReservationMutation.mutate(reservationData, {
      onSuccess: () => {
        setSnackbarMessage('Varaus tehty onnistuneesti!');  // Set success message
        setSnackbarOpen(true);                   // Open snackbar
        onClose();                               // Close the dialog
      },
      onError: (error) => {
        console.error('Error creating reservation:', error);
        setSnackbarMessage('Varauksen tekeminen epäonnistui.');  // Set error message
        setSnackbarOpen(true);                                   // Open snackbar
      }
    });
  };

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
              defaultValue={filterValues.selectedGroupSize && filterValues.selectedGroupSize <= (capacity - groupsize) ? filterValues.selectedGroupSize : null}
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

              {/* <Grid item lg={12}>
                <FormControlLabel control={<Switch onChange={handleReservationSwitchChange} />} label="Varauksessa on poikkeuksia" />
              </Grid> */}

              { /* EXCEPTIONS */}
              {
                reservationHasExceptions ? (
                  <>
                    {/* <Grid item lg={10}>
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
                    </Grid> */}
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

        {groupsize > 0 && groupsize < capacity && <Grid item lg={12}>
          <FormControlLabel
            control={<Checkbox />}
            label="Olen huomioinut sen, että tilassa on muita varauksia samanaikaisesti"
            onChange={handleDisableSubmitButton}
          />
        </Grid>}


        <Grid item lg={4}>
          <Button
            type="submit"
            variant="contained"
            disabled={disableSubmitButton}
            sx={{
              mt: 3,
              mb: 2,
              textTransform: 'none',
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
