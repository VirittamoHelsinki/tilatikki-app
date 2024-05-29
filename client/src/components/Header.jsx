import React from 'react';
import { AppBar, Toolbar, Typography, Avatar, Menu, MenuItem, IconButton, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: 'none', padding: '0 2rem' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div" sx={{ color: 'black' }}>
          TilaTikki
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            alt="User Profile Picture" 
            src="/path/to/profile.jpg" 
            sx={{ width: 40, height: 40, marginRight: 2 }}
          />
          <Typography variant="body1" component="div" sx={{ color: 'black', marginRight: 2 }}>
            Nimi
          </Typography>
          <IconButton onClick={handleMenuOpen} color="inherit">
            <ExpandMoreIcon sx={{ color: 'black' }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Hallinnointi</MenuItem>
            <MenuItem onClick={handleMenuClose}>Kirjaudu ulos</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
