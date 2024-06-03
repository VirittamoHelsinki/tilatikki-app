import React, { useState } from 'react';
import { Container, CssBaseline, Box, Typography, Grid, TextField, Button, Link,} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import LoggedIn from '../utils/LoggedIn';
import { setCookie } from '../utils/Cookies';
import { loginUser } from '../api/userApi';


export default function SignIn() {
  const [error, setError] = useState('');

  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userData = {
      email: formData.get('email'),
      password: formData.get('password'),
    };
    try {
      await loginUser(userData);
      setCookie('UserEmail', userData.email, 1);
      setCookie('LoggedIn', 'true', 1);
      navigate('/schools');
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