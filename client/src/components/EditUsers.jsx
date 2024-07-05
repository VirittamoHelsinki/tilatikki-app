import React, { useState } from 'react';
import { Box, Typography, Divider, Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { updateUser } from '../api/userApi';

export default function EditUsers({ name, email, role, otherTeacher, onClose }) {
  const [roleName, setRoleName] = useState(role === 'Admin' ? true : false);
  const [chipVisible, setChipVisible] = useState(!!otherTeacher);
  const [inputValue, setInputValue] = useState('');
  const [otherTeacherName, setOtherTeacherName] = useState(otherTeacher || '');
  const [snackbarMessage, setSnackbarMessage ] = useState('');

  const handleChipDelete = () => {
    setChipVisible(false);
    setOtherTeacherName('');
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputSubmit = (event) => {
    if (event.key === 'Enter') {
      setChipVisible(true);
      setOtherTeacherName(inputValue);
      setInputValue('');
    }
  };

  const handleChangeRole = (event) => {
    setRoleName(event.target.value);
  };

  const handleUserDataSubmit = async () => {
    try {
      const updatedData = {
        subteacher: otherTeacherName,
        admin: roleName,
      };

      console.log(updatedData[0] + "XSSSSSS")
      console.log(email + "kfkefkekfk")

      const { message, user: updatedUser } = await updateUser(email, updatedData);

      // Update form fields or state based on the updated user data if needed
      // For example, updating role or other display fields

      setSnackbarMessage('Sub teacher and admin updated successfully!');
      onClose(); // Close modal or navigate back after successful update
    } catch (error) {
      setSnackbarMessage('Failed to update sub teacher and admin.');
      console.error(error);
    }
  };

  return (
    <Typography variant="body1" component="div" sx={{ width: '1000px' }}>
      <Typography
        variant="subtitle1"
        sx={{ textDecoration: 'underline', cursor: 'pointer', color: 'black', marginBottom: '20px' }}
        onClick={onClose}
      >
        Takaisin käyttäjiin
      </Typography>
      <Box component="div" sx={{ mb: 3 }}>
        <Typography component="h1" variant="h5">
          {name}
        </Typography>
        <Typography component="p" variant="subtitle1">
          {role}
        </Typography>
        <Divider sx={{ mt: 4, mb: 4 }} />
        <Typography variant="p" gutterBottom>
          Käyttäjärooli
        </Typography>
        <Box sx={{ minWidth: 120 }}>
          <FormControl sx={{ width: 200 }}>
            <Select
              id="select"
              value={roleName}
              onChange={handleChangeRole}
            >
              <MenuItem value={false}>Opettaja</MenuItem>
              <MenuItem value={true}>Admin</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 120, margin: '20px auto' }}>
          <Typography variant="p" gutterBottom>
            Lisää toissijainen opettaja
          </Typography>
          <TextField
            fullWidth
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleInputSubmit}
            sx={{ marginBottom: 2 }}
          />
          {chipVisible && (
            <Chip
              label={otherTeacherName}
              onDelete={handleChipDelete}
              sx={{}}
            />
          )}
        </Box>
      </Box>
      <Button
        onClick={handleUserDataSubmit}
        variant="contained"
        sx={{
          mt: 1,
          mb: 2,
          textTransform: 'none',
          backgroundColor: '#18181B',
          '&:hover': {
            backgroundColor: '#2b2b2b'
          }
        }}
      >
        Tallenna muutokset
      </Button>
    </Typography>
  );
}
