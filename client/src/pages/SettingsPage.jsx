import React, { useState } from 'react';
import { Typography, Divider, Box, List, ListItem, ListItemText, Button } from '@mui/material';
import UserInformation from '../components/UserInformation';
import ReservationHistory from '../components/ReservationHistory';
import UserProfiles from '../components/UserProfiles';
import ReservationHistoryAdmin from '../components/ReservationHistoryAdmin';
import Header from '../components/Header';
import Calendar from '../components/Calendar';
import AdminSemesterReservation from '../components/AdminSemesterReservation';

const SettingsPage = () => {
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [admin, setAdmin] = useState(true);


    const handleNavigation = (component) => {
        setSelectedComponent(component);
    };

    const swapPermission = () => {
        if (admin) {
            setAdmin(false);
        }
        else setAdmin(true)
    }

    return (
        <>
            <Header />
            <Box sx={{ padding: 4 }}>
                <Typography variant="h4" component="div" sx={{ marginBottom: 2 }}>
                    Hallinnointi
                </Typography>
                <Typography variant="body1" component="div" sx={{ marginBottom: 1 }}>
                    {admin
                        ? "Tällä sivulla voit mm. muokata omia käyttäjätietojasi, tehdä lukukausivarauksia sekä asettaa käyttäjille eri käyttöoikeuksia."
                        : "Tällä sivulla voit muokata omia käyttäjätietojasi sekä tarkastella varaushistoriaasi."
                    }
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => swapPermission()}
                    sx={{
                        mt: 3,
                        mb: 4,
                        backgroundColor: '#18181B',
                        '&:hover': {
                            backgroundColor: '#2b2b2b'
                        }
                    }}
                >
                    Vaihda adminin ja opettajan välillä
                </Button>
                <Divider sx={{ marginBottom: 4 }} />
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ width: '200px', marginRight: 4 }}>
                        <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
                            Omat asetukset
                        </Typography>
                        <List component="nav">
                            {admin ? (
                                <>
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
                                    <Typography variant="h6" component="div" sx={{ marginBottom: 2, marginTop: 2 }}>
                                        Admin
                                    </Typography>
                                    <ListItem
                                        onClick={() => handleNavigation('UserInformation')}// TÄHÄN NAVIGAATIO KALENTERIIN
                                        sx={{
                                            cursor: 'pointer',
                                            '&:hover': {
                                                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                            },
                                        }}
                                    >
                                        <ListItemText primary="Lukukausivaraukset" />
                                    </ListItem>
                                    <ListItem
                                        onClick={() => handleNavigation('UserProfiles')}
                                        sx={{
                                            cursor: 'pointer',
                                            '&:hover': {
                                                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                            },
                                        }}
                                    >
                                        <ListItemText primary="Käyttäjät" />
                                    </ListItem>
                                    <ListItem
                                        onClick={() => handleNavigation('ReservationHistoryAdmin')}
                                        sx={{
                                            cursor: 'pointer',
                                            '&:hover': {
                                                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                            },
                                        }}
                                    >
                                        <ListItemText primary="Varaukset" />
                                    </ListItem>
                                </>
                            ) : (
                                <>
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
                                </>
                            )}
                        </List>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        {admin ? (
                            <>
                                {/* {selectedComponent === 'UserInformation' && <UserInformation />} */}
                                {selectedComponent === 'UserInformation' && <AdminSemesterReservation />}
                                {selectedComponent === 'UserProfiles' && <UserProfiles />}
                                {selectedComponent === 'ReservationHistoryAdmin' && <ReservationHistoryAdmin />}
                            </>
                        ) : (
                            <>
                                {selectedComponent === 'UserInformation' && <UserInformation />}
                                {selectedComponent === 'ReservationHistory' && <ReservationHistory />}
                            </>
                        )}
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default SettingsPage;
