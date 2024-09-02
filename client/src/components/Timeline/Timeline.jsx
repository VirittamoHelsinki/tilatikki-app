import { useRef } from "react"
import TimelineItem from "./TimelineItem"

const Timeline = ({
  room,
  handleOpenNewReservationModal,
  handleOpenEditReservationModal,
  highlightMode,
  currentUser,
}) => {
  const newReservationIndicatorRef = useRef(null);

  // handleModal functions may not exist,
  // so wrap then in a function and only
  // call them if they exist
  const safeHandleOpenNewReservationModal = () => {
    if (handleOpenNewReservationModal) {
      handleOpenNewReservationModal(room);
    }
  }

  const safeHandleOpenEditReservationModal = (reservationId) => {
    if (handleOpenEditReservationModal) {
      handleOpenEditReservationModal(reservationId);
    }
  }

  const overlaps = (time) => {
    /*
      return 0: no overlap
      return 1: partial overlap, can still reserve
      return 2: found two reservations in one spot or one full
    */
    const timestampToMinutes = (timeStamp) => {
      const [ hours, minutes ] = timeStamp.split(":").map((num) => Number(num))
      return hours * 60 + minutes;
    }

    const { capacity, reservations } = room;

    let overlapSize = 0;
    for (const { startTime, endTime, groupsize } of reservations) {
      const potentialOverlapSizeIncrease = capacity === groupsize ? 2 : 1;

      const a = timestampToMinutes(time);
      const b = timestampToMinutes(startTime);
      const c = timestampToMinutes(endTime);
      if (a >= b && a <= c) {
        overlapSize += potentialOverlapSizeIncrease;
      }
    }

    return overlapSize;
  }

  const onMouseClick = (event) => {
    safeHandleOpenNewReservationModal()

    const element = newReservationIndicatorRef.current;
    const target = event.target;

    const mouseX = event.clientX;
    const targetWidth = target.offsetWidth;
    const targetLeft = target.getBoundingClientRect().left;

    const mouseRelativeToTarget = (mouseX - targetLeft) / targetWidth
    const hour = Math.floor(mouseRelativeToTarget * 24)
    const minute = (Math.floor(mouseRelativeToTarget * 24 * 4) % 4) * 15

    // hour:minute to ./index.jsx
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
    const from = [ Math.floor(mouseRelativeToTarget * 24 * 4) / 4,  0 ]
    const to = [ Math.ceil(mouseRelativeToTarget * 24), 0 ]

    const columnStart = (from[0] * 4 + Math.floor(from[1] / 15) + 1)
    const columnEnd = (to[0] * 4 + Math.floor(to[1] / 15) + 1)
    const gridColumnValueString = `${columnStart} / span ${1}`

    // Check for overlap
    const hour = Math.floor(mouseRelativeToTarget * 24)
    const minute = Math.floor(mouseRelativeToTarget * 24 * 60) % 60
    const overlap = overlaps(`${hour}:${minute}`)

    if (overlap < 2) {
      element.style.display = "flex";
    } else {
      element.style.display = "none"
    }

    if (overlap === 1) {
      element.style.gridRow = "2 / span 1"
    }

    if (overlap === 0) {
      element.style.gridRow = "1 / span 2"
    }

    element.style.gridColumn = gridColumnValueString
  }

  const onMouseEnter = () => {
    if (!newReservationIndicatorRef.current) return;
    newReservationIndicatorRef.current.style.display = "flex";
  }

  const onMouseLeave = () => {
    if (!newReservationIndicatorRef.current) return;
    newReservationIndicatorRef.current.style.display = "none";
  }

  return (
    <div
      className="grid grid-flow-dense gap-x-2 gap-y-1 p-1 relative [&:not(:last-child)]:border-b border-b-gray-200 min-h-16 hover:cursor-pointer"
      style={{ gridTemplateRows: "1fr 1fr", gridTemplateColumns: `repeat(${24 * 4}, 1fr)`, width: `${24 * 4 * 30}px` }}
      onClick={onMouseClick}
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="timelines__timestamp-lines absolute w-full h-full grid pointer-events-none"
        style={{ gridTemplateColumns: "repeat(24, 1fr" }}
      >
        {
          Array.from({ length: 24 }).map(() => (
            <div className="border-r border-gray-100 pointer-events-none"></div>
          ))
        }
      </div>

      <TimelineItem timeStart="00:00" timeEnd="05:00" unavailable/>

      {
        // Reservations inside the timeline
        room.reservations.map((reservation) => {
          const userOwnsReservation = currentUser._id === reservation.user._id;

          return (
            <TimelineItem
              timeStart={reservation.startTime}
              timeEnd={reservation.endTime}
              label={reservation.additionalInfo}
              user={reservation.user}
              reservationPurpose={reservation.purpose}
              fullHeight={reservation.groupsize === room.capacity}
              onClick={(event) => {
                event.stopPropagation()
                safeHandleOpenEditReservationModal(reservation._id)
              }}
              hidden={!userOwnsReservation && highlightMode}
            />
          )
        })
      }

      {/* <TimelineItem timeStart="20:00" timeEnd="24:00" unavailable/> */}

      <div
        ref={newReservationIndicatorRef}
        onMouseMove={(event) => event.stopPropagation()}
        className="new-reservation-indicator pointer-events-none h-full w-full  bg-green-400 rounded-md hidden flex-col justify-center items-center select-none"
      >
        <p className="text-white font-bold">+</p>
        {/* <p className="font-bold text-center text-sm">Luo uusi varaus</p> */}
      </div>
    </div>
  );
}

export default Timeline;