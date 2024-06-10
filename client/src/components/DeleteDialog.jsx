import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function DeleteDialog({ open, handleClose, course, roomName, date, hours}) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Haluatko varmasti poistaa varauksen?
                <IconButton onClick={handleClose} sx={{ color: 'black' }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {course}
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                    {roomName}
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                    {date}{" "}{hours}
                </DialogContentText>
            </DialogContent>
            <FormGroup>
                <FormControlLabel sx={{ marginLeft: 2 }} control={<Switch />} label="Poista myös tulevat varaukset" />
            </FormGroup>
            <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', marginLeft: 2 }}>
                <Button
                    onClick={handleClose}
                    autoFocus
                    sx={{
                        color: 'white',
                        backgroundColor: '#EF4444;',
                        '&:hover': {
                            backgroundColor: '#8b0000', // Darker shade of red
                        }
                    }}
                >
                    Poista varaus
                </Button>
            </DialogActions>
        </Dialog>
    );
}

