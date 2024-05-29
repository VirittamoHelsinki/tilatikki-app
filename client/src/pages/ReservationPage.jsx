import React from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import Header from '../components/Header';

const ReservationPage = () => {
  return (
    <>
    <Header/>
    <Container maxWidth="lg" style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '20px' }}>
      <Box sx={{ width: '30%', padding: '20px', border: '1px solid #ddd', borderRadius: '4px' }}>
        <Typography variant="h6" gutterBottom>
          Input Form
        </Typography>
        <form>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
          />
          <Button variant="contained" type="submit" fullWidth sx={{ 
              mt: 3, 
              mb: 2,
              backgroundColor: '#18181B', // Change this to your desired color
              '&:hover': {
                backgroundColor: '#2b2b2b' // Change this to a lighter shade of your color
              }
            }}>
            Submit
          </Button>
        </form>
      </Box>

      {/* Middle Section - Data Display */}
      <Box sx={{ width: '30%', padding: '20px', border: '1px solid #ddd', borderRadius: '4px' }}>
        <Typography variant="h6" gutterBottom>
          Data Display
        </Typography>
        <Box>
          {/* Placeholder for dynamic data */}
          <Typography variant="body1">
            No data to display yet.
          </Typography>
        </Box>
      </Box>

      {/* Right Section - Empty */}
      <Box sx={{ width: '30%', padding: '20px', border: '1px solid #ddd', borderRadius: '4px' }}>
        <Typography variant="h6" gutterBottom>
          Empty Section
        </Typography>
        <Box>
          {/* This section is intentionally left empty */}
        </Box>
      </Box>
    </Container>
    </>
  );
}

export default ReservationPage;
