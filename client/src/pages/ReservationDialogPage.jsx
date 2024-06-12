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

  return (
    <>
      <button onClick={handleOpenDialog}>Open Reservation Dialog</button>
      <ReservationDialog isOpen={isOpen} onClose={handleCloseDialog} userId={'60c72b2f9b1e8a5f9c8e7d0c'} roomId={'60c72b2f9b1e8a5f9c8e7d0d'} />
    </>
  );
};

export default ReservationDialogPage;
