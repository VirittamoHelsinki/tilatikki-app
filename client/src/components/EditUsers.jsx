import React, { useState } from 'react';
import { Box, Typography, Divider, Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';

export default function EditUsers({ name, role, otherTeacher, onClose }) {
  const [roleName, setRole] = useState('Opettaja');
  const [chipVisible, setChipVisible] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [otherTeacherName, setOtherTeacherName] = useState(otherTeacher)

  const handleChipDelete = () => {
    setChipVisible(false);
    setOtherTeacherName('');
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputSubmit = (event) => {
    if (event.key === 'Enter') {
      setChipVisible(true)
      setOtherTeacherName(inputValue);
      setInputValue('');
    }
  };
  const handleChange = (event) => {
    setRole(event.target.value);
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
              onChange={handleChange}
            >
              <MenuItem value={"Opettaja"}>Opettaja</MenuItem>
              <MenuItem value={"admin"}>Admin</MenuItem>
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
        type="submit"
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