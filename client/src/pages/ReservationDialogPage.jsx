import React from "react";
import ReservationDialog from "../components/reservationDialog";

const ReservationDialogPage = () => {
  // Define state for managing dialog open/close if needed
  const [isOpen, setIsOpen] = React.useState(false);

  // Function to handle opening the dialog
  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  // Function to handle closing the dialog
  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  const user = {
    "_id": {
      "$oid": "66681d10e4d6ee12a3bb7e04"
    },
    "name": "Pentti",
    "surname": "Penttilä",
    "email": "pentti.penttila@yle.fi",
    "password": "$2b$10$P4q1w9FMajSBGyiVGpHrf.TGyw5y4eW3ot4WO2I0ZZ6o3I0tmLyS.",
    "admin": true,
    "reservations": [],
  }

  return (
    <>
      <button onClick={handleOpenDialog}>Open Reservation Dialog</button>
      <ReservationDialog isOpen={isOpen} onClose={handleCloseDialog} roomId={'66681d10e4d6ee12a3bb7e0e'} />
    </>
  );
};

export default ReservationDialogPage;
