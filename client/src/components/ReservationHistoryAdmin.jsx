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
import { getReservations, deleteReservation } from '../api/reservations';
import { fetchRoomById } from '../api/rooms';

const columns = (handleClickOpen) => [
  {
    field: 'opetustila',
    headerName: 'Opetustila',
    width: 220,
    editable: false,
  },
  {
    field: 'varaus',
    headerName: 'Varauksen nimi',
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
    width: 220,
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
    fetchAllReservations();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const year = date.getUTCFullYear();
    return `${day}.${month}.${year}`;
  };

  const fetchAllReservations = async () => {

    try {
      const reservationsData = await getReservations();

      const formattedReservations = await Promise.all(reservationsData.map(async (reservation, index) => {
        try {
          const room = await fetchRoomById(reservation.room);

          let userName = 'N/A';
          if (reservation.user) {
            userName = reservation.user.name;
          }

          const päivämäärä = reservation.reservationDate
            ? formatDate(reservation.reservationDate)
            : 'N/A';
          const isSpecificString = reservation.recurrence === 'none';
          const toistuvaValue = isSpecificString ? false : true;

          return {
            reservationid: reservation._id,
            id: index + 1,
            opetustila: room.number || 'N/A',
            varaus: reservation.purpose,
            toistuva: toistuvaValue,
            päivämäärä,
            aikaväli: reservation.startTime + " - " + reservation.endTime,
            opettaja: userName,
            ryhmankoko: reservation.groupsize + " / " + room.capacity || 'N/A',
          };
        } catch (innerError) {
          console.error('Error processing reservation:', reservation, innerError);
          throw innerError;
        }
      }));


      setReservations(formattedReservations);

    } catch (error) {
      setError(error.message);
    } finally {
      //setLoading(false);
    }
  };

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

  const handleDeleteConfirmed = async () => {
    if (selectedRow) {
      try {
        await deleteReservation(selectedRow.reservationid);
        setSnackbarMessage('Varaus poistettu onnistuneesti!');
        setSnackbarOpen(true);
        setOpen(false);
        setSelectedRow(null);
        fetchAllReservations()
      } catch (error) {
        console.error('Error deleting user:', error);
        setSnackbarMessage('Varausksen poistaminen epäonnistui!');
        setSnackbarOpen(true);
      }
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
        <DeleteDialog
          open={open}
          handleClose={handleClose}
          handleDelete={handleDeleteConfirmed}
          reservationName={selectedRow.varaus}
          teacher={selectedRow.opettaja}
          roomName={selectedRow.opetustila}
          date={selectedRow.päivämäärä}
          hours={selectedRow.aikaväli}
        />
      )}
    </>
  );
};

export default ReservationHistoryAdmin;