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
import { fetchUserById } from '../api/userApi';

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

const rows = [
  {
    id: 1,
    opetustila: 'Classroom 1',
    toistuva: true,
    päivämäärä: '2024-06-07',
    aikaväli: "12:00-13:00",
    opettaja: 'John Doe',
    ryhmankoko: 25,
    toiminnot: 'Edit/Delete',
  },
  {
    id: 2,
    opetustila: 'Classroom 2',
    toistuva: false,
    päivämäärä: '2024-06-08',
    aikaväli: "10:00-11:00",
    opettaja: 'Jane Smith',
    ryhmankoko: 30,
    toiminnot: 'Edit/Delete',
  },
  {
    id: 3,
    opetustila: 'Classroom 3',
    toistuva: true,
    päivämäärä: '2024-06-09',
    aikaväli: "8:00-10:00",
    opettaja: 'Alice Johnson',
    ryhmankoko: 20,
    toiminnot: 'Edit/Delete',
  },
  {
    id: 4,
    opetustila: 'Classroom 4',
    toistuva: false,
    päivämäärä: '2024-06-10',
    aikaväli: "14:00-15:00",
    opettaja: 'Mark Davis',
    ryhmankoko: 28,
    toiminnot: 'Edit/Delete',
  },
  {
    id: 5,
    opetustila: 'Classroom 5',
    toistuva: true,
    päivämäärä: '2024-06-11',
    aikaväli: "8:00-8:45",
    opettaja: 'Emily Wilson',
    ryhmankoko: 22,
    toiminnot: 'Edit/Delete',
  },
  {
    id: 6,
    opetustila: 'Classroom 6',
    toistuva: false,
    päivämäärä: '2024-06-12',
    aikaväli: "13:00-13:45",
    opettaja: 'Michael Brown',
    ryhmankoko: 35,
    toiminnot: 'Edit/Delete',
  },
  {
    id: 7,
    opetustila: 'Classroom 7',
    toistuva: true,
    päivämäärä: '2024-06-13',
    aikaväli: "9:00-11:00",
    opettaja: 'Sarah Martinez',
    ryhmankoko: 18,
    toiminnot: 'Edit/Delete',
  },
  {
    id: 8,
    opetustila: 'Classroom 8',
    toistuva: false,
    päivämäärä: '2024-06-14',
    aikaväli: "10:00-11:00",
    opettaja: 'Andrew Taylor',
    ryhmankoko: 27,
    toiminnot: 'Edit/Delete',
  },
  {
    id: 9,
    opetustila: 'Classroom 9',
    toistuva: true,
    päivämäärä: '2024-06-15',
    aikaväli: "7:30-8:00",
    opettaja: 'Jessica Thomas',
    ryhmankoko: 29,
    toiminnot: 'Edit/Delete',
  },
  {
    id: 10,
    opetustila: 'Classroom 10',
    toistuva: false,
    päivämäärä: '2024-06-16',
    aikaväli: "9:00-10:15",
    opettaja: 'David jeeeriguez',
    ryhmankoko: 64,
    toiminnot: 'Edit/Delete',
  },
  {
    id: 11,
    opetustila: 'Classroom 11',
    toistuva: false,
    päivämäärä: '2024-09-16',
    aikaväli: "9:00-10:00",
    opettaja: 'David sdgsdgfsuez',
    ryhmankoko: 24,
    toiminnot: 'Edit/Delete',
  },
  {
    id: 12,
    opetustila: 'Classroom 12',
    toistuva: false,
    päivämäärä: '2024-08-16',
    aikaväli: "12:00-10:00",
    opettaja: 'David Rodriguez',
    ryhmankoko: 24,
    toiminnot: 'Edit/Delete',
  },
  {
    id: 13,
    opetustila: 'Classroom 13',
    toistuva: false,
    päivämäärä: '2024-06-29',
    aikaväli: "9:00-10:00",
    opettaja: 'David Rgegedriguez',
    ryhmankoko: 34,
    toiminnot: 'Edit/Delete',
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
  const [rowsData, setRowsData] = useState(rows);

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
      const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
      const year = date.getUTCFullYear();
      return `${day}.${month}.${year}`;
    };

    const fetchAllReservations = async () => {
      try {
        const reservationsData = await getReservations();

        console.log('reservationsData', reservationsData);

        // Fetch room and user data for each reservation
        const formattedReservations = await Promise.all(reservationsData.map(async (reservation, index) => {
          const room = await fetchRoomById(reservation.room);
          // const user = await fetchUserById(reservation.user);
          console.log('gagasgassa', room);
          

          const aikaväli = reservation.startTime && reservation.endTime
            ? formatTimeInterval(reservation.startTime, reservation.endTime)
            : 'N/A';

          const päivämäärä = reservation.startTime
            ? formatDate(reservation.startTime)
            : 'N/A';

          return {
            id: index + 1,
            opetustila: room.number || 'N/A',
            toistuva: reservation.toistuva || false,
            päivämäärä,
            aikaväli,
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

export default ReservationHistoryAdmin;