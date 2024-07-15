import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { fiFI } from '@mui/x-data-grid/locales';
import { Typography, Divider, Snackbar, Alert, Box } from '@mui/material';
import DeleteDialogUsers from './DeleteDialogUsers';
import EditUsers from './EditUsers';
import { fetchAllUsers } from '../api/userApi';
import { deleteUser } from '../api/userApi';

const columns = (handleClickOpen, handleToEdit) => [
  {
    field: 'käyttäjä',
    headerName: 'Käyttäjä',
    width: 290,
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
    width: 290,
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

  const getUsers = async () => {
    try {
      const usersData = await fetchAllUsers();

      const formattedUsers = await Promise.all(usersData.map(async (user, index) => {
        try {
          const isAdmin = user.admin === true;
          const toistuvaValue = isAdmin ? "Admin" : "Opettaja";
          return {
            id: index + 1,
            käyttäjä: `${user.name} ${user.surname}`,
            sähköposti: user.email,
            käyttäjärooli: toistuvaValue,
            toissijainenopettaja: user.subteacher
          };
        } catch (innerError) {
          console.error('Error processing user:', user, innerError);
          throw innerError; // Ensure we propagate the error to the main catch block
        }
      }));
      setUsers(formattedUsers);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
  };

  const handleDeleteConfirmed = async () => {
    if (selectedRow) {
      try {
        // Make API call to delete user
        await deleteUser(selectedRow.sähköposti);
        setSnackbarMessage('Käyttäjä poistettu onnistuneesti!');
        setSnackbarOpen(true);

        // Close the confirmation dialog
        setOpen(false);
        setSelectedRow(null);
        getUsers()
      } catch (error) {
        console.error('Error deleting user:', error);
        setSnackbarMessage('Käyttäjän poistaminen epäonnistui!');
        setSnackbarOpen(true);
      }
    }
  };

  if (isEditing) {
    return (
      <EditUsers
        name={selectedRow.käyttäjä}
        email={selectedRow.sähköposti}
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
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
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
          disableColumnResize
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            baseButton: {
              style: { color: 'black' }
            },
            toolbar: {
              style: { color: 'black', marginLeft: '8px' },
              showQuickFilter: true,
              quickFilterProps: {
                style: { marginRight: '20px' },
              },
            },
          }}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'greyRow' : ''
          }
          sx={{
            '& .greyRow': {
              backgroundColor: '#F1F5F9',
            },
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: '#1C2C52'
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              color: '#FFFFFF',
            },
            '& .MuiDataGrid-iconButtonContainer': {
              color: '#FFFFFF', // Change the filter icon color to white
            },
            '& .MuiDataGrid-menuIconButton': {
              color: '#FFFFFF', // Change the filter icon color to white
            },
            '& .MuiDataGrid-sortIcon': {
              color: '#FFFFFF', // Change the sorting icon color to white
            },
          }}
        />
      </Box>
      {selectedRow && (
        <DeleteDialogUsers
          open={open}
          handleClose={handleClose}
          handleDelete={handleDeleteConfirmed}
          user={selectedRow.käyttäjä}
        />
      )}
    </>
  );
};

export default UserProfiles;