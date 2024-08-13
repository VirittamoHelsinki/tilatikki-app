const TimelineItem = ({ timeStart, timeEnd, unavailable, user, label, fullHeight }) => {
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

  const backgroundColor = fullHeight
    ? "#EA7272"
    : "#F4BD89";
  
  return (
    <div 
      onMouseMove={(event) => event.stopPropagation()}
      className="rounded-md w-full select-none hover:z-10 hover:cursor-pointer overflow-hidden hover:overflow-visible relative"
      style={{
        gridColumn: gridColumnValueString,
        gridRow: fullHeight ? "1 / -1" : "auto",
        backgroundColor,
        transition: "all 0.05s linear",
        transformOrigin: "center center"
      }}
    >
      <div className="bg-inherit py-[2px] px-2 rounded-md absolute min-w-full top-0 left-0 transition-shadow hover:shadow-xl">
        <p className="font-semibold whitespace-nowrap text-sm bg-inherit max-w-max">{user.name} {user.surname}</p>
        <p className="text-xs bg-inherit">{timeStart} - {timeEnd}</p>
        <p className="text-xs max-w-full whitespace-nowrap text-ellipses overflow-hidden bg-inherit"><i>{label}</i></p>
      </div>
    </div>
  )
}

export default TimelineItem