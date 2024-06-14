import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import RepeatIcon from '@mui/icons-material/Repeat';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography, Divider } from '@mui/material';
import { fiFI } from '@mui/x-data-grid/locales';
import DeleteDialog from './DeleteDialog';
import Snackbar from '@mui/material/Snackbar';
import { getReservations } from '../api/reservations';
import { fetchRoomById } from '../api/rooms';

const columns = (handleClickOpen) => [
  {
    field: 'opetustila',
    headerName: 'Opetustila',
    width: 220,
    editable: false,
  },
  {
    field: 'toistuva',
    headerName: 'Toistuva',
    width: 180,
    editable: false,
    renderCell: (params) => (
      <div style={{ display: 'flex', width: '100%', marginTop: '12px' }}>
        {params.value ? <RepeatIcon /> : null}
      </div>
    ),
  },
  {
    field: 'päivämäärä',
    headerName: 'Päivämäärä',
    type: 'Date',
    width: 220,
    editable: false,
  },
  {
    field: 'aikaväli',
    headerName: 'Aikaväli',
    type: 'number',
    headerAlign: 'left',
    align: 'left',
    width: 180,
    editable: false,
  },
  {
    field: 'opettaja',
    headerName: 'Opettaja',
    width: 220,
    editable: false,
  },
  {
    field: 'ryhmankoko',
    headerName: 'Ryhmän koko',
    type: 'number',
    headerAlign: 'left',
    align: 'left',
    width: 220,
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
        <EditIcon style={{ cursor: 'pointer', marginRight: '8px' }} />
        <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => handleClickOpen(params.row)} />
      </div>
    ),
  },
];


const fiLocaleText = {
  ...fiFI.components.MuiDataGrid.defaultProps.localeText,
};


const ReservationHistoryAdmin = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchAllReservations = async () => {
      try {
        const reservationsData = await getReservations();
        console.log('reservationsData', reservationsData);

        // Fetch room and user data for each reservation
        const formattedReservations = await Promise.all(reservationsData.map(async (reservation, index) => {
          const room = await fetchRoomById(reservation.room);
          // const user = await fetchUserById(reservation.user);
          console.log('gagasgassa', room);
          // Format reservation data including room and user details
          return {
            id: index + 1,
            opetustila: room.number || 'N/A',
            toistuva: reservation.toistuva || false,
            päivämäärä: reservation.päivämäärä || 'N/A',
            aikaväli: reservation.aikaväli || 'N/A',
            opettaja: reservation.user || 'N/A',
            ryhmankoko: reservation.groupsize || 'N/A',
          };
        }));

        setReservations(formattedReservations);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllReservations();
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
        Varaukset
      </Typography>

      <Typography component="p" variant="subtitle1">
        Alla olevasta taulukosta löydät kaikkien käyttäjien varaukset ja pystyt helposti muokkaamaan tai poistamaan varauksia. Pystyt myös siirtämään varauksen toiselle opettajalle.
      </Typography>

      <Divider sx={{ mt: 4, mb: 4 }} />
      <Box sx={{ height: '600', width: '100%' }}>
        <DataGrid
          rows={reservations}
          localeText={fiLocaleText}
          columns={columns(handleClickOpen)}
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

export default ReservationHistoryAdmin;