import React, { useState } from 'react';
import { Container, CssBaseline, Box, Typography, Grid, TextField, Button, Link, FormControlLabel, Checkbox } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

export default function SignIn() {

  function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  }
  
  function getCookie(name) {
    const cookieName = `${name}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return null;
  }

  const [error, setError] = useState('');

  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userData = {
      email: formData.get('email'),
      password: formData.get('password'),
    };
    console.log('userData', userData);
    try {
      const response = await fetch("http://localhost:5050/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      } else {
        console.log("logged in!" + userData.email);
      }
  
      // const userResponse = await fetch(`http://localhost:5050/userdata/${userData.email}`);
      // if (!userResponse.ok) {
      //   throw new Error('Failed to fetch user data');
      // }
      // const userDataResponse = await userResponse.json();
  
      // setCookie('UserEmail', userDataResponse.email, 1);
      // setCookie('LoggedIn', 'true', 1);
      navigate('/schools');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container component="main" maxWidth={false} disableGutters sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <CssBaseline />
      <Box sx={{ flex: 1, backgroundColor: 'black', height: '100%' }} />
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
          Kirjaudu sisään
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Sähköposti"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Salasana"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth           
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
            Kirjaudu sisään
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2" sx={{ color: 'black' }}>
                Eikö sinulla ole käyttäjää? Rekisteröidy
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}