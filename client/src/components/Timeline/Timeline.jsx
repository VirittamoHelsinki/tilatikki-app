import TimelineItem from "./TimelineItem"

const Timeline = ({
  room,
  handleOpenNewReservationModal,
  handleOpenEditReservationModal,
}) => {

  // handleModal functions may not exist,
  // so wrap then in a function and only
  // call them if they exist
  const safeHandleOpenNewReservationModal = () => {
    if (handleOpenNewReservationModal) {
      handleOpenNewReservationModal()
    }
  }

  const safeHandleOpenEditReservationModal = () => {
    if (handleOpenEditReservationModal) {
      handleOpenEditReservationModal()
    }
  }

  const onMouseDown = () => {

  }

  const onMouseUp = () => {

  }

  const onMouseMove = () => {

  }

  return (
    <div
      className="grid grid-flow-dense gap-x-2 gap-y-1 p-1 relative [&:not(:last-child)]:border-b border-b-gray-200 min-h-16" 
      style={{ gridTemplateRows: "1fr 1fr", gridTemplateColumns: `repeat(${24 * 4}, 1fr)`, width: `${24 * 4 * 30}px` }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    >
      <div className="timelines__timestamp-lines absolute w-full h-full grid pointer-events-none" style={{ gridTemplateColumns: "repeat(24, 1fr" }}>
        {
          Array.from({ length: 24 }).map(() => (
            <div className="border-r border-gray-100 pointer-events-none"> </div>
          ))
        }
      </div>

      <TimelineItem timeStart="00:00" timeEnd="05:00" unavailable/>

      {
        // Reservations inside the timeline
        room.reservations.map((reservation) => (
          <TimelineItem
            timeStart={reservation.startTime}
            timeEnd={reservation.endTime}
            label={reservation.purpose}
            user={reservation.user}
            fullHeight={reservation.groupsize === room.capacity}
            onClick={safeHandleOpenEditReservationModal}
          />
        ))
      }

      <TimelineItem timeStart="20:00" timeEnd="24:00" unavailable/>

      <div className="new-reservation-indicator absolute h-full bg-green-200 w-20 rounded-md pointer-events-none hidden">
        <p></p>
      </div>
    </div>
  );
}

export default Timeline;