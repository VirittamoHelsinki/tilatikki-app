import React, { useState } from 'react';
import { Container, CssBaseline, Box, Typography, Grid, TextField, Button, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import LoggedIn from '../utils/LoggedIn';
import TilaTikkiLogoWhite from '../images/logo-white.svg';

const API_URL = import.meta.env.VITE_API_URL;

const RegisterPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
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

    // Reset errors
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setError('');

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      setEmailError('Sähköposti ei ole sopiva');
      return;
    }

    // Validate password (example: must be at least 6 characters and include a number)
    const passwordRegex = /^(?=.*[0-9])(?=.*[A-Za-z]).{6,}$/;
    if (!passwordRegex.test(userData.password)) {
      setPasswordError('Salasanan tulee olla vähintään 6 merkkiä pitkä ja sisältää numero');
      return;
    }

    if (userData.password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }


    try {
      const response = await fetch(API_URL + "/register", {
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
      setError('Failed to sign up. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth={false} disableGutters sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <LoggedIn redirectTo="/schools" />
      <CssBaseline />
      <Box sx={{ position: 'relative', flex: 1, backgroundColor: 'black', height: '100%' }}>
        <img src={TilaTikkiLogoWhite} alt="TilaTikki Logo" style={{ position: 'absolute', top: 0, left: 0, width: '189px', height: 'auto', margin: 20 }} />
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
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: '80%' }}>
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
                error={!!emailError}
                helperText={emailError}
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
                error={!!passwordError}
                helperText={passwordError}
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
                error={!!confirmPasswordError}
                helperText={confirmPasswordError}
              />
            </Grid>
          </Grid>
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              textTransform: 'none',
              backgroundColor: '#18181B',
              '&:hover': {
                backgroundColor: '#2b2b2b'
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
