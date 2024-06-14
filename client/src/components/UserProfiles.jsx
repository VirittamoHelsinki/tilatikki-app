import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { fiFI } from '@mui/x-data-grid/locales';
import { Typography, Divider } from '@mui/material';
import DeleteDialogUsers from './DeleteDialogUsers';
import Snackbar from '@mui/material/Snackbar';
import EditUsers from './EditUsers';
import { fetchAllUsers } from '../api/userApi';

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

const fiLocaleText = {
  ...fiFI.components.MuiDataGrid.defaultProps.localeText,
};

const UserProfiles = () => {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersData = await fetchAllUsers();
        const formattedUsers = usersData.map((user, index) => ({
          id: index + 1,
          käyttäjä: `${user.name} ${user.surname}`,
          sähköposti: user.email,
          käyttäjärooli: user.role,
          toissijainenopettaja: user.secondaryTeacher || 'N/A',
        }));
        setUsers(formattedUsers);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

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
    return (
      <EditUsers
        name={selectedRow.käyttäjä}
        role={selectedRow.käyttäjärooli}
        otherTeacher={selectedRow.toissijainenopettaja}
        onClose={() => setIsEditing(false)}
      />
    );
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
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={users}
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
        <DeleteDialogUsers
          open={open}
          handleClose={handleClose}
          handleDelete={handleDelete}
          user={selectedRow.käyttäjä}
        />
      )}
    </>
  );
};

export default UserProfiles;