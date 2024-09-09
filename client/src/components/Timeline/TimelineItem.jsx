const TimelineItem = ({
  timeStart,
  timeEnd,
  unavailable,
  user,
  label,
  fullHeight,
  onClick,
  reservationPurpose,
  hidden,
}) => {
  const from = timeStart.split(":").map(v => parseInt(v))
  const to = timeEnd.split(":").map(v => parseInt(v))

  const columnStart = (from[0] * 4 + Math.floor(from[1] / 15) + 1)
  const columnEnd = (to[0] * 4 + Math.floor(to[1] / 15) + 1)

  const gridColumnValueString = `${columnStart} / span ${columnEnd - columnStart}`

  if (unavailable) {
    return (
      <div
        className="bg-gray-200 z-10 rounded-md warning pointer-events-none"
        style={{ gridColumn: gridColumnValueString, gridRow: "1 / -1" }}
      >
        {/* <p className="text-ms uppercase font-medium text-black" style={{ position: "sticky", left: "10px" }}>Ei varattavissa</p> */}
      </div>
    )
  }

  const color = fullHeight
    ? "#4E0D0D"
    : "#5B3006";

  const backgroundColor = fullHeight
    ? "#F9D3D3"
    : "#FBE5D0";

  const border = fullHeight
    ? "1px solid #F6C0C0"
    : "1px solid #F9DBBD";
  
    
  return (
    <div
      onClick={onClick}
      onMouseMove={(event) => event.stopPropagation()}
      className="rounded-md w-full select-none hover:z-10 hover:cursor-pointer overflow-hidden hover:overflow-visible relative bg-transparent"
      style={{
        gridColumn: gridColumnValueString,
        gridRow: fullHeight ? "1 / -1" : "auto",
        color,
        border,
        //display: hidden ? "none" : "block"
      }}
    >
      <div
        className="py-[2px] px-2 rounded-md absolute min-w-full top-0 left-0 transition-shadow hover:shadow-xl"
        style={{
          backgroundColor: hidden ? "rgb(245, 245, 245)" : backgroundColor,
          color: hidden ? "rgb(190, 190, 190)" : "inherit",
        }}
      >
        <p className="font-semibold whitespace-nowrap text-sm max-w-max">{reservationPurpose}</p>

        <p className="text-xs">{timeStart} - {timeEnd}</p>
        <p className="text-xs max-w-full whitespace-nowrap text-ellipses overflow-hidden">{user.name} {user.surname}</p>
        <p className="text-xs max-w-full whitespace-nowrap text-ellipses overflow-hidden"><i>{label}</i></p>
      </div>
    </div>
  )
}

export default TimelineItem