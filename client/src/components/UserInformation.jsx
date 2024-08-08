import React, { useEffect, useState } from 'react';
import { Container, CssBaseline, Box, Typography, Grid, TextField, Button, Link, FormControlLabel, Checkbox, Input, Divider, Snackbar, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';

import { getCookie, setCookie } from '../utils/Cookies';
import { fetchUserDataByEmail, updateUser, updateUserPassword } from '../api/userApi';


const UserInformation = () => {
  const [userDataError, setUserDataError] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const userDataForm = useForm({
    defaultValues: async () => {
      const { name, surname, email } = await fetchUserDataByEmail(getCookie('UserEmail'))
      return { name, surname, email }
    }
  });

  const passwordDataForm = useForm();

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarMessage('');
  }

  const handleUserDataSubmit = async (data) => {
    const email = getCookie('UserEmail')
    try {
      const { message, user: updatedUser } = await updateUser(email, data);

      userDataForm.setValue("name", updatedUser.name)
      userDataForm.setValue("surname", updatedUser.surname)
      userDataForm.setValue("email", updatedUser.email)

      // Re-set the userEmail cookie incase user updated their email.
      setCookie('UserEmail', updatedUser.email, 1);
      setSnackbarMessage('Perustiedot päivitetty onnistuneesti!');
    } catch (error) {
      setSnackbarMessage('Jokin meni pieleen...');
      console.error(error);
    }
  }

  const handlePasswordSubmit = async (data) => {
    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = data;

    if (newPassword !== confirmPassword) {
      return;
    }

    if (newPassword === "") {
      return setNewPasswordError("Salasana ei voi olla tyhjä.")
    }

    setPasswordMatchError('');

    const email = getCookie('UserEmail');
    try {
      const { message, user: updatedUser } = await updateUserPassword(email, {
        currentPassword,
        newPassword,
      });

      setCurrentPasswordError('');
      setNewPasswordError('');
      setSnackbarMessage('Salasana päivitetty onnistuneesti!');
    } catch (error) {
      setCurrentPasswordError('Väärä salasana');
    }
  }

  // Update passwordMatchError when user is typing a password,
  // so user can see password match errors in real time.
  useEffect(() => {
    const subscription = passwordDataForm.watch((value) => {
      const { newPassword, confirmPassword } = value;
      if (newPassword !== confirmPassword) {
        setPasswordMatchError('Salasanat eivät täsmää...');
      } else {
        setPasswordMatchError('');
      }
    })

    return () => subscription.unsubscribe();
  }, [passwordDataForm]);

  return (
    <Typography variant="body1" component="div" sx={{ width: '1000px' }}>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Box component="div" sx={{ mb: 3 }}>
        <Typography component="h1" variant="h5">
          Käyttäjätiedot
        </Typography>

        <Typography component="p" variant="subtitle1">
          Muokkaa omia käyttäjätietojasi.
        </Typography>

        <Divider sx={{ mt: 4, mb: 4 }} />

        <Box
          component="form"
          noValidate
          sx={{ mt: 3 }}
          onSubmit={userDataForm.handleSubmit(handleUserDataSubmit)}
        >

          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Perustiedot
          </Typography>

          <Grid container spacing={2}>
            <Grid item lg={6}>
              <TextField
                InputLabelProps={{ shrink: true }}
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                label="Etunimi"
                error={!!userDataForm.formState.errors.name?.message}
                helperText={userDataForm.formState.errors.name?.message}
                {...userDataForm.register("name", { required: "Nimi ei voi olla tyhjä." })}
              />
            </Grid>
            <Grid item lg={6}>
              <TextField
                InputLabelProps={{ shrink: true }}
                autoComplete="surname"
                name="surname"
                required
                fullWidth
                id="surname"
                label="Sukunimi"
                error={!!userDataForm.formState.errors.surname?.message}
                helperText={userDataForm.formState.errors.surname?.message}
                {...userDataForm.register("surname", { required: "Sukunimi ei voi olla tyhjä." })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
                id="email"
                label="Sähköposti"
                name="email"
                autoComplete="email"
                error={!!userDataForm.formState.errors.email?.message}
                helperText={userDataForm.formState.errors.email?.message}
                {...userDataForm.register("email", { required: "Sähköposti ei voi olla tyhjä." })}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{
              textTransform: 'none',
              mt: 3,
              mb: 2,
              backgroundColor: '#18181B', // Change this to your desired color
              '&:hover': {
                backgroundColor: '#2b2b2b' // Change this to a lighter shade of your color
              }
            }}
          >
            Päivitä tiedot
          </Button>
        </Box>
      </Box>

      <Box component="div">
        <Typography component="h1" variant="h5">
          Salasanan vaihto
        </Typography>

        <Box
          component="form"
          noValidate
          sx={{ mt: 3 }}
          onSubmit={passwordDataForm.handleSubmit(handlePasswordSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <TextField
                required
                fullWidth
                name="currentPassword"
                label="Nykyinen Salasana"
                type="password"
                id="currentPassword"
                autoComplete="new-password"
                error={!!currentPasswordError}
                helperText={currentPasswordError}
                {...passwordDataForm.register("currentPassword")}
              />
            </Grid>

            { /*
              Empty grid item so the new password 
              field and confirmation field are on a new row
            */}
            <Grid item xs={0} lg={6}></Grid>

            <Grid item xs={12} lg={6}>
              <TextField
                required
                fullWidth
                name="newPassword"
                label="Uusi Salasana"
                type="password"
                id="newPassword"
                autoComplete="new-password"
                error={!!passwordDataForm.formState.errors.newPassword?.message}
                helperText={passwordDataForm.formState.errors.newPassword?.message}
                {...passwordDataForm.register("newPassword", { minLength: { value: 4, message: "Salasanan täytyy ollä vähintään neljä (4) merkkiä pitkä." } })}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Vahvista Salasana"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                error={!!passwordMatchError}
                helperText={passwordMatchError}
                {...passwordDataForm.register("confirmPassword")}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            sx={{
              textTransform: 'none',
              mt: 3,
              mb: 2,
              backgroundColor: '#18181B', // Change this to your desired color
              '&:hover': {
                backgroundColor: '#2b2b2b' // Change this to a lighter shade of your color
              }
            }}
          >
            Päivitä salasana
          </Button>
        </Box>
      </Box>


    </Typography>
  );
};

export default UserInformation;
