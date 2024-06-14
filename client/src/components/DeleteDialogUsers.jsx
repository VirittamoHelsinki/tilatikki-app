import React from 'react';
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

export default function DeleteDialogUsers({ open, handleClose, handleDelete, user}) {

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Haluatko varmasti poistaa käyttäjän?
                <IconButton onClick={handleClose} sx={{ color: 'black' }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                Käyttäjän {user} tiedot poistetaan järjestelmästä kokonaan.
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', marginLeft: 2 }}>
                <Button
                    onClick={handleDelete}
                    autoFocus
                    sx={{
                        color: 'white',
                        textTransform: 'none',
                        marginBottom: '10px',
                        backgroundColor: '#EF4444;',
                        '&:hover': {
                            backgroundColor: '#8b0000',
                        }
                    }}
                >
                    Poista varaus
                </Button>
            </DialogActions>
        </Dialog>
    );
}