import { useRef } from "react"
import TimelineItem from "./TimelineItem"

const Timeline = ({
  room,
  handleOpenNewReservationModal,
  handleOpenEditReservationModal,
}) => {
  const newReservationIndicatorRef = useRef(null);

  // handleModal functions may not exist,
  // so wrap then in a function and only
  // call them if they exist
  const safeHandleOpenNewReservationModal = () => {
    if (handleOpenNewReservationModal) {
      handleOpenNewReservationModal();
    }
  }

  const safeHandleOpenEditReservationModal = () => {
    if (handleOpenEditReservationModal) {
      handleOpenEditReservationModal();
    }
  }

  const onMouseClick = () => {
    safeHandleOpenNewReservationModal()
  }

  const onMouseDown = () => {

  }

  const onMouseUp = () => {

  }

  const onMouseMove = (event) => {
    if (!newReservationIndicatorRef.current) return;

    const element = newReservationIndicatorRef.current;
    const target = event.target;

    const mouseX = event.clientX;
    const targetWidth = target.offsetWidth;
    const targetLeft = target.getBoundingClientRect().left;

    const mouseRelativeToTarget = (mouseX - targetLeft) / targetWidth

    console.log(mouseRelativeToTarget)
    element.style.left = `${mouseRelativeToTarget * targetWidth}px`
  }

  const onMouseEnter = () => {
    if (!newReservationIndicatorRef.current) return;
    newReservationIndicatorRef.current.style.display = "block";
  }

  const onMouseLeave = () => {
    if (!newReservationIndicatorRef.current) return;
    newReservationIndicatorRef.current.style.display = "none";
  }

  return (
    <div
      className="grid grid-flow-dense gap-x-2 gap-y-1 p-1 relative [&:not(:last-child)]:border-b border-b-gray-200 min-h-16" 
      style={{ gridTemplateRows: "1fr 1fr", gridTemplateColumns: `repeat(${24 * 4}, 1fr)`, width: `${24 * 4 * 30}px` }}
      onClick={onMouseClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="timelines__timestamp-lines absolute w-full h-full grid pointer-events-none"
        style={{ gridTemplateColumns: "repeat(24, 1fr" }}
      >
        {
          Array.from({ length: 24 }).map(() => (
            <div className="border-r border-gray-100"></div>
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

      <div
        ref={newReservationIndicatorRef}
        className="new-reservation-indicator absolute left-[30%] h-full bg-green-200 w-20 rounded-md pointer-events-none hidden"
      >
        <p>Luo uusi varaus</p>
      </div>
    </div>
  );
}

export default Timeline;