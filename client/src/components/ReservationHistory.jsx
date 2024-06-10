import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import RepeatIcon from '@mui/icons-material/Repeat';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { fiFI } from '@mui/x-data-grid/locales';
import DeleteDialog from './DeleteDialog';

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
    width: 220,
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
    aikaväli: 60,
    opettaja: 'John Doe',
    ryhmankoko: 25,
    toiminnot: 'Edit/Delete',
  },
  {
    id: 2,
    opetustila: 'Classroom 2',
    toistuva: false,
    päivämäärä: '2024-06-08',
    aikaväli: 90,
    opettaja: 'Jane Smith',
    ryhmankoko: 30,
    toiminnot: 'Edit/Delete',
  },
  {
    id: 3,
    opetustila: 'Classroom 3',
    toistuva: true,
    päivämäärä: '2024-06-09',
    aikaväli: 120,
    opettaja: 'Alice Johnson',
    ryhmankoko: 20,
    toiminnot: 'Edit/Delete',
  },
  {
    id: 4,
    opetustila: 'Classroom 4',
    toistuva: false,
    päivämäärä: '2024-06-10',
    aikaväli: 70,
    opettaja: 'Mark Davis',
    ryhmankoko: 28,
    toiminnot: 'Edit/Delete',
  },
  {
    id: 5,
    opetustila: 'Classroom 5',
    toistuva: true,
    päivämäärä: '2024-06-11',
    aikaväli: 80,
    opettaja: 'Emily Wilson',
    ryhmankoko: 22,
    toiminnot: 'Edit/Delete',
  },
  {
    id: 6,
    opetustila: 'Classroom 6',
    toistuva: false,
    päivämäärä: '2024-06-12',
    aikaväli: 100,
    opettaja: 'Michael Brown',
    ryhmankoko: 35,
    toiminnot: 'Edit/Delete',
  },
  {
    id: 7,
    opetustila: 'Classroom 7',
    toistuva: true,
    päivämäärä: '2024-06-13',
    aikaväli: 110,
    opettaja: 'Sarah Martinez',
    ryhmankoko: 18,
    toiminnot: 'Edit/Delete',
  },
  {
    id: 8,
    opetustila: 'Classroom 8',
    toistuva: false,
    päivämäärä: '2024-06-14',
    aikaväli: 130,
    opettaja: 'Andrew Taylor',
    ryhmankoko: 27,
    toiminnot: 'Edit/Delete',
  },
  {
    id: 9,
    opetustila: 'Classroom 9',
    toistuva: true,
    päivämäärä: '2024-06-15',
    aikaväli: 95,
    opettaja: 'Jessica Thomas',
    ryhmankoko: 29,
    toiminnot: 'Edit/Delete',
  },
  {
    id: 10,
    opetustila: 'Classroom 10',
    toistuva: false,
    päivämäärä: '2024-06-16',
    aikaväli: 35,
    opettaja: 'David jeeeriguez',
    ryhmankoko: 64,
    toiminnot: 'Edit/Delete',
  },
  {
    id: 11,
    opetustila: 'Classroom 11',
    toistuva: false,
    päivämäärä: '2024-09-16',
    aikaväli: 75,
    opettaja: 'David sdgsdgfsuez',
    ryhmankoko: 24,
    toiminnot: 'Edit/Delete',
  },
  {
    id: 12,
    opetustila: 'Classroom 12',
    toistuva: false,
    päivämäärä: '2024-08-16',
    aikaväli: 95,
    opettaja: 'David Rodriguez',
    ryhmankoko: 24,
    toiminnot: 'Edit/Delete',
  },
  {
    id: 13,
    opetustila: 'Classroom 13',
    toistuva: false,
    päivämäärä: '2024-06-29',
    aikaväli: 75,
    opettaja: 'David Rgegedriguez',
    ryhmankoko: 34,
    toiminnot: 'Edit/Delete',
  },
];


const fiLocaleText = {
  ...fiFI.components.MuiDataGrid.defaultProps.localeText,
};


const ReservationHistory = () => {

  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);

  const handleClickOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  return (
    <>
      <Box sx={{ height: '100%', width: '100%' }}>
        <DataGrid
          rows={rows}
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
              style: { color: 'black' },
              showQuickFilter: true,
            },
          }}
        />
      </Box>
      {selectedRow && (
        <DeleteDialog
          open={open}
          handleClose={handleClose}
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