import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { fiFI } from '@mui/x-data-grid/locales';
import { Typography, Divider } from '@mui/material';
import DeleteDialog from './DeleteDialog';
import Snackbar from '@mui/material/Snackbar';
import EditUsers from './EditUsers';

const columns = (handleClickOpen, handleToEdit) => [
  {
    field: 'käyttäjä',
    headerName: 'Käyttäjä',
    width: 270,
    editable: false,
  },
  {
    field: 'sähköposti',
    headerName: 'Sähköposti',
    width: 400,
    editable: false,
  },
  {
    field: 'käyttäjärooli',
    headerName: 'Käyttäjärooli',
    width: 270,
    editable: false,
  },
  {
    field: 'toissijainenopettaja',
    headerName: 'Toissijainen opettaja',
    width: 290,
    editable: false,
  },
  {
    field: 'toiminnot',
    headerName: 'Toiminnot',
    headerAlign: 'right',
    align: 'right',
    sortable: false,
    width: 110,
    sticky: 'right',
    renderCell: (params) => (
      <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginTop: '12px' }}>
        <EditIcon style={{ cursor: 'pointer', marginRight: '8px' }} onClick={() => handleToEdit(params.row)} />
        <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => handleClickOpen(params.row)} />
      </div>
    ),
  },
];

const rows = [
  {
    id: 1,
    käyttäjä: 'Matti Meikäläinen',
    sähköposti: 'matti.meikalainen@example.com',
    käyttäjärooli: 'Opettaja',
    toissijainenopettaja: 'Maija Mallinen',
    toiminnot: 'Edit/Delete',
  },
  {
    id: 2,
    käyttäjä: 'Anna Ankka',
    sähköposti: 'anna.ankka@example.com',
    käyttäjärooli: 'Opiskelija',
    toissijainenopettaja: 'Kalle Kukko',
    toiminnot: 'Edit/Delete',
  },
  {
    id: 3,
    käyttäjä: 'Pekka Pouta',
    sähköposti: 'pekka.pouta@example.com',
    käyttäjärooli: 'Admin',
    toissijainenopettaja: 'Sanna Sateenkaari',
    toiminnot: 'Edit/Delete',
  },
  {
    id: 4,
    käyttäjä: 'Teemu Teekkari',
    sähköposti: 'teemu.teekkari@example.com',
    käyttäjärooli: 'Opettaja',
    toissijainenopettaja: 'Liisa Laakso',
    toiminnot: 'Edit/Delete',
  },
  {
    id: 5,
    käyttäjä: 'Olga Opiskelija',
    sähköposti: 'olga.opiskelija@example.com',
    käyttäjärooli: 'Opiskelija',
    toissijainenopettaja: 'Mikko Maanviljelijä',
    toiminnot: 'Edit/Delete',
  },
  {
    id: 6,
    käyttäjä: 'Jussi Jokinen',
    sähköposti: 'jussi.jokinen@example.com',
    käyttäjärooli: 'Opettaja',
    toissijainenopettaja: 'Elina Elo',
    toiminnot: 'Edit/Delete',
  },
  {
    id: 7,
    käyttäjä: 'Riikka Rinne',
    sähköposti: 'riikka.rinne@example.com',
    käyttäjärooli: 'Opiskelija',
    toissijainenopettaja: 'Ville Virtanen',
    toiminnot: 'Edit/Delete',
  },
  {
    id: 8,
    käyttäjä: 'Kalle Kuusi',
    sähköposti: 'kalle.kuusi@example.com',
    käyttäjärooli: 'Opettaja',
    toissijainenopettaja: 'Päivi Pihlaja',
    toiminnot: 'Edit/Delete',
  },
  {
    id: 9,
    käyttäjä: 'Sanna Suutari',
    sähköposti: 'sanna.suutari@example.com',
    käyttäjärooli: 'Admin',
    toissijainenopettaja: 'Hanna Haukka',
    toiminnot: 'Edit/Delete',
  },
  {
    id: 10,
    käyttäjä: 'Mikko Miettinen',
    sähköposti: 'mikko.miettinen@example.com',
    käyttäjärooli: 'Opiskelija',
    toissijainenopettaja: 'Tiina Talvi',
    toiminnot: 'Edit/Delete',
  },
  {
    id: 11,
    käyttäjä: 'Liisa Laine',
    sähköposti: 'liisa.laine@example.com',
    käyttäjärooli: 'Opettaja',
    toissijainenopettaja: 'Kari Kevät',
    toiminnot: 'Edit/Delete',
  },
  {
    id: 12,
    käyttäjä: 'Pekka Pelto',
    sähköposti: 'pekka.pelto@example.com',
    käyttäjärooli: 'Opiskelija',
    toissijainenopettaja: 'Jari Joki',
    toiminnot: 'Edit/Delete',
  },
];


const fiLocaleText = {
  ...fiFI.components.MuiDataGrid.defaultProps.localeText,
};


const UserProfiles = () => {

  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSnackbarClose = (_event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleClickOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleToEdit = (row) => {
    setSelectedRow(row);
    setIsEditing(true);
  }

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  const handleDelete = (deleted) => {
    setOpen(false);
    setSelectedRow(null);
    if (deleted) {
      setSnackbarMessage('Varaus on poistettu onnistuneesti');
      setSnackbarOpen(true);
    }
  };


  if (isEditing) {
    return <EditUsers
      name={selectedRow.käyttäjä}
      role={selectedRow.käyttäjärooli}
      otherTeacher={selectedRow.toissijainenopettaja}
      onClose={() => setIsEditing(false)}
    />;
  }


  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
      <Typography component="h1" variant="h5">
        Käyttäjät
      </Typography>

      <Typography component="p" variant="subtitle1">
        Taulukon kautta pystyt mm. poistamaan käyttäjän tai lisäämään käyttäjälle sijaisopettajan.
      </Typography>

      <Divider sx={{ mt: 4, mb: 4 }} />
      <Box sx={{ height: '600', width: '100%' }}>
        <DataGrid
          rows={rows}
          localeText={fiLocaleText}
          columns={columns(handleClickOpen, handleToEdit)}
          disableRowSelectionOnClick
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableColumnResize
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              style: { color: 'black', marginLeft: '8px' },
              showQuickFilter: true,
              quickFilterProps: {
                style: { marginRight: '20px' },
              },
            },
          }}
        />
      </Box>
      {selectedRow && (
        <DeleteDialog
          open={open}
          handleClose={handleClose}
          handleDelete={handleDelete}
          course={selectedRow.opettaja}
          roomName={selectedRow.opetustila}
          date={selectedRow.päivämäärä}
          hours={selectedRow.aikaväli}
        />
      )}
    </>
  );
};

export default UserProfiles;