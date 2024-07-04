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
import { fetchRoomById } from '../api/rooms';
import { fetchUserDataByEmail } from '../api/userApi';

const columns = (handleClickOpen) => [
  {
    field: 'opetustila',
    headerName: 'Opetustila',
    width: 180,
    editable: false,
  },
  {
    field: 'toistuva',
    headerName: 'Toistuva',
    width: 140,
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
    width: 180,
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
    width: 200,
    editable: false,
  },
  {
    field: 'toissijainenopettaja',
    headerName: 'Toissijainen opettaja',
    width: 220,
    editable: false,
  },
  {
    field: 'ryhmankoko',
    headerName: 'Ryhmän koko',
    type: 'number',
    headerAlign: 'left',
    align: 'left',
    width: 180,
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


const ReservationHistory = () => {

  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const parseTime = (dateTimeString) => {
      const date = new Date(dateTimeString);
      const hours = date.getUTCHours();
      const minutes = date.getUTCMinutes();
      return { hours, minutes };
    };

    const formatTimeInterval = (start, end) => {
      const startTime = parseTime(start);
      const endTime = parseTime(end);
      return `${startTime.hours}:${startTime.minutes.toString().padStart(2, '0')} - ${endTime.hours}:${endTime.minutes.toString().padStart(2, '0')}`;
    };

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = date.getUTCDate().toString().padStart(2, '0');
      const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
      const year = date.getUTCFullYear();
      return `${day}.${month}.${year}`;
    };

    const fetchAllReservations = async () => {
      try {
        // Fetch user data by email
        const userData = await fetchUserDataByEmail("f@f.fi");
    
        // Ensure user data contains reservations
        if (!userData || !userData.reservations) {
          throw new Error('No reservations found for this user');
        }
    
        const reservationsData = userData.reservations;
        
        console.log('reservationData', reservationsData);
    
        const formattedReservations = await Promise.all(reservationsData.map(async (reservation, index) => {
          try {
            // Fetch room data by reservation room ID
            const room = await fetchRoomById(reservation.room._id);
    
            const aikaväli = reservation.startTime && reservation.endTime
              ? formatTimeInterval(reservation.startTime, reservation.endTime)
              : 'N/A';
    
            const päivämäärä = reservation.startTime
              ? formatDate(reservation.startTime)
              : 'N/A';
    
            const isSpecificString = reservation.recurrence === 'none';
            const toistuvaValue = isSpecificString ? false : true;
    
            return {
              id: index + 1,
              opetustila: room.number || 'N/A',
              toistuva: toistuvaValue,
              päivämäärä,
              aikaväli,
              opettaja: userData.name,
              toissijainenopettaja: userData.subteacher,
              ryhmankoko: reservation.groupsize + " / " + (room.capacity || 'N/A'),
            };
          } catch (innerError) {
            console.error('Error processing reservation:', reservation, innerError);
            throw innerError; // Ensure we propagate the error to the main catch block
          }
        }));
    
        // Set formatted reservations to state
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

  const handleDelete = () => {
    if (selectedRow) {
      setOpen(true); // Open confirmation dialog
    }
  };

  const handleDeleteConfirmed = () => {
    if (selectedRow) {
      // Filter out the row to be deleted
      const updatedRows = rowsData.filter(row => row.id !== selectedRow.id);
      setRowsData(updatedRows);

      // Show snackbar message
      setSnackbarMessage('Varaus on poistettu onnistuneesti');
      setSnackbarOpen(true);

      // Close the confirmation dialog
      setOpen(false);
      setSelectedRow(null);
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
        Omat varaukset
      </Typography>

      <Typography component="p" variant="subtitle1">
        Muokkaa omia käyttäjätietojasi.
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
          course={selectedRow.opettaja}
          roomName={selectedRow.opetustila}
          date={selectedRow.päivämäärä}
          hours={selectedRow.aikaväli}
        />
      )}
    </>
  );
};

export default ReservationHistory;