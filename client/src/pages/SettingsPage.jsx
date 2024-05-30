import React, { useState } from 'react';
import { Typography, Divider, Box, List, ListItem, ListItemText } from '@mui/material';
import UserInformation from '../components/UserInformation';
import ReservationHistory from '../components/ReservationHistory';

const SettingsPage = () => {
    const [selectedComponent, setSelectedComponent] = useState(null);

    const handleNavigation = (component) => {
        setSelectedComponent(component);
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" component="div" sx={{ marginBottom: 2 }}>
                Hallinnointi
            </Typography>
            <Typography variant="body1" component="div" sx={{ marginBottom: 4 }}>
                Tällä sivulla voit muokata omia käyttäjätietojasi sekä tarkastella varaushistoriaasi.
            </Typography>
            <Divider sx={{ marginBottom: 4 }} />
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ width: '200px', marginRight: 4 }}>
                    <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
                        Omat asetukset
                    </Typography>
                    <List component="nav">
                        <ListItem 
                            onClick={() => handleNavigation('UserInformation')}
                            sx={{
                                cursor: 'pointer',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                },
                            }}
                        >
                            <ListItemText primary="Käyttäjätiedot" />
                        </ListItem>
                        <ListItem 
                            onClick={() => handleNavigation('ReservationHistory')}
                            sx={{
                                cursor: 'pointer',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                },
                            }}
                        >
                            <ListItemText primary="Oma varaushistoria" />
                        </ListItem>
                    </List>
                </Box>
                <Box sx={{ flex: 1 }}>
                    {selectedComponent === 'UserInformation' && <UserInformation />}
                    {selectedComponent === 'ReservationHistory' && <ReservationHistory />}
                </Box>
            </Box>
        </Box>
    );
};

export default SettingsPage;
