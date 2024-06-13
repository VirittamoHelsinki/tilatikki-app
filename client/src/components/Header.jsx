import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Avatar, Menu, MenuItem, IconButton, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { getCookie, removeCookie } from '../utils/Cookies';
import { fetchUserDataByEmail } from '../api/userApi';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const email = getCookie('UserEmail');
    if (email) {
      fetchUserDataByEmail(email)
        .then(userData => {
          setName(userData.name);
          setSurname(userData.surname);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleClick = () => {
    navigate('/schools');
  };

  const handleSettingsClick = () => {
    navigate('/settings');
    handleMenuClose();
  };

  const handleLogoutClick = () => {
    navigate('/login');
    removeCookie('LoggedIn');
    removeCookie('UserEmail');
    handleMenuClose();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: 'none', padding: '0 2rem' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div" sx={{ color: 'black', cursor: 'pointer' }} onClick={handleClick}>
          TilaTikki
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={handleMenuOpen}
            color="inherit"
            sx={{
              '&:hover': {
                backgroundColor: 'inherit',
              }
            }}>
            <Avatar
              alt=""
              src=""
              sx={{ width: 40, height: 40, marginRight: 2, backgroundColor: 'grey' }}
            >
              {name.charAt(0)}  {surname.charAt(0)}
            </Avatar>
            <Typography variant="body1" component="div" sx={{ color: 'black', marginRight: 2 }}>
              {name}{" "}{surname}
            </Typography>
            <ExpandMoreIcon sx={{ color: 'black' }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleSettingsClick}>Hallinnointi</MenuItem>
            <MenuItem onClick={handleLogoutClick}>Kirjaudu ulos</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
