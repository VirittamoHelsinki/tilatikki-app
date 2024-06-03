import React, { useState } from 'react';
import { Container, CssBaseline, Box, Typography, Grid, TextField, Button, Link, FormControlLabel, Checkbox, Input, Divider } from '@mui/material';
import { useForm } from "react-hook-form"


const UserInformation = () => {
  const [ userDataError, setUserDataError ] = useState('');
  const [ passwordError, setPasswordError ] = useState('');

  const userDataForm = useForm({
    defaultValues: {
      name: "",
      surname: "",
      email: "",
    }
  })

  const passwordDataForm = useForm()

  const handleUserDataSubmit = (data) => {    
    console.log(data);
    setUserDataError("Testing userdata error...");
  }

  const handlePasswordSubmit = (data) => {
    console.table(data);
    setPasswordError("Testing password error...");
  }

  return (
    <Typography variant="body1" component="div" sx={{ width: '1000px' }}>

      <Box component="div"  sx={{ mb: 3 }}>
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
            Salasanan vaihto
          </Typography>

          <Grid container spacing={2}>
            <Grid item lg={6}>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                label="Etunimi"
                {...userDataForm.register("name")}
              />
            </Grid>
            <Grid item lg={6}>
              <TextField
                autoComplete="surname"
                name="surname"
                required
                fullWidth
                id="surname"
                label="Sukunimi"
                {...userDataForm.register("surname")}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="email"
                label="Sähköposti"
                name="email"
                autoComplete="email"
                {...userDataForm.register("email")}
              />
            </Grid>
          </Grid>
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
                name="password"
                label="Uusi Salasana"
                type="password"
                id="password"
                autoComplete="new-password"
                {...passwordDataForm.register("newPassword")}
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
                {...passwordDataForm.register("confirmPassword")}
              />
            </Grid>
          </Grid>

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
            Päivitä salasana
          </Button>
        </Box>
      </Box>
      

    </Typography>
  );
};

export default UserInformation;
