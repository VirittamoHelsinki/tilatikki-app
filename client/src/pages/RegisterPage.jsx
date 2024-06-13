import React, { useState } from 'react';
import { Container, CssBaseline, Box, Typography, Grid, TextField, Button, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import LoggedIn from '../utils/LoggedIn';

const RegisterPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userData = {
      name: formData.get('name'),
      surname: formData.get('surname'),
      email: formData.get('email'),
      password: formData.get('password'),
    };

    if (userData.password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch("http://localhost:5050/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to sign up');
      }
      console.log('User registered successfully');
      navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  return (
    <Container component="main" maxWidth={false} disableGutters sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <LoggedIn redirectTo="/schools" />
      <CssBaseline />
      <Box sx={{ position: 'relative', flex: 1, backgroundColor: 'black', height: '100%' }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            color: 'white',
            padding: 2,
          }}
        >
          TilaTikki
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%'
        }}
      >
        <Typography component="h1" variant="h5">
          Rekisteröidy
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: '80%'}}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={10} md={8} lg={6}>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                label="Etunimi"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={10} md={8} lg={6}>
              <TextField
                autoComplete="surname"
                name="surname"
                required
                fullWidth
                id="surname"
                label="Sukunimi"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Sähköposti"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Salasana"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Vahvista Salasana"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
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
            Rekisteröidy
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2" sx={{ color: 'black' }}>
                Joko sinulla on käyttäjä? Kirjaudu sisään
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
