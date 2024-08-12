import { useForm } from "react-hook-form"

import { setDefaultOptions } from "date-fns"
import { fi } from "date-fns/locale"
import { useEffect, useRef } from "react"

import TimelineFilterForm from "./TimelineFilterForm"
import { useSchoolQuery } from "@/api/schools"
import { useParams } from "react-router-dom"

import moment from "moment"
import "moment/dist/locale/fi"

moment.locale("fi")


const TimelineItem = ({ timeStart, timeEnd, unavailable, user, label, fullHeight }) => {
  const from = timeStart.split(":").map(v => parseInt(v))
  const to = timeEnd.split(":").map(v => parseInt(v))

  const columnStart = (from[0] * 4 + Math.floor(from[1] / 15) + 1)
  const columnEnd = (to[0] * 4 + Math.floor(to[1] / 15) + 1)

  const gridColumnValueString = `${columnStart} / span ${columnEnd - columnStart}`

  if (unavailable) {
    return (
      <div
        className="bg-gray-200 z-10 rounded-md warning"
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

const TimelineContainer = ({
  rooms = [],
  showRoomInformation = true,
}) => {
  return (
    <div
      className="timeline-container grid max-w-full overflow-auto max-h-[500px]"
      style={{ gridTemplateColumns: "auto 1fr", gridTemplateRows: `30px repeat(${rooms.length}, 1fr)` }}
    >
      <div className="bg-white z-30 w-full h-full sticky left-0 border-r-2">{ /* empty div to fill the first row */}</div>
      {
        rooms.map((room) => (
          <>
            {
              showRoomInformation && (
                <div key={room._id} className={`timeline__room px-4 col-start-1 min-w-40 z-30 sticky left-0 bg-white border-r-2`}>
                  <div className="timeline__room-information flex flex-col justify-center py-2">
                    <p className="font-semibold text-xl">Huone {room.number}</p>
                    <p className="font-medium text-sm text-gray-400">05:00 - 20:00</p>
                  </div>
                </div>
              )
            }
            <div className="timelines col-start-2 row-span-full rounded-lg grid" style={{ gridTemplateRows: `30px repeat(${rooms.length}, 1fr)`} }>
              <div className="timelines__timestamps grid items-center justify-center top-0 bg-white z-20 border-b-2 sticky" style={{ gridTemplateColumns: "repeat(24, 1fr)"}}>
                <div className="timelines__timestamp-lines absolute w-full h-full grid" style={{ gridTemplateColumns: "repeat(24, 1fr" }}>
                  {
                    Array.from({ length: 24 }).map(() => (
                      <div className="border-r border-gray-100"> </div>
                    ))
                  }
                </div>

                {
                  Array.from({ length: 23 }).map((_, index) => (
                    <p
                      className="text-center bg-white translate-x-[-50%]"
                      style={{ gridColumn: index+2 }}
                    >
                      { `${(index+1).toString().padStart(2, "0")}:00` }
                    </p>
                  ))
                }
              </div>


              {
                rooms?.map((room) => (
                  <div
                    className="grid grid-flow-dense gap-x-2 gap-y-1 p-1 relative [&:not(:last-child)]:border-b border-b-gray-200" 
                    style={{ gridTemplateRows: "1fr 1fr", gridTemplateColumns: `repeat(${24 * 4}, 1fr)`, width: `${24 * 4 * 30}px` }}
                  >
                    <div className="timelines__timestamp-lines absolute w-full h-full grid" style={{ gridTemplateColumns: "repeat(24, 1fr" }}>
                      {
                        Array.from({ length: 24 }).map(() => (
                          <div className="border-r border-gray-100"> </div>
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
                        />
                      ))
                    }
                    
                    <TimelineItem timeStart="20:00" timeEnd="24:00" unavailable/>
                  </div>
                ))
              }
            </div>
          </>
        ))
      }
    </div>
  )
}

const Timeline = () => {
  const { id } = useParams()
  const { data, error, isLoading } = useSchoolQuery(id);  
  const form = useForm({
    defaultValues: {
      date: moment().format("MM/DD/YYYY") // ??
    },
  });

  const timelineContainerRef = useRef(null)
  const timeIndicatorRef = useRef(null)
  const timeIndicatorContainer = useRef(null)

  setDefaultOptions({ locale: fi })

  const selectedBuilding = form.watch("building")
  const selectedFloor = form.watch("floor")
  const selectedDate = form.watch("date")

  const building = data.buildings.find((building) => building._id === selectedBuilding)
  const floor = building?.floors.find((floor) => floor._id === selectedFloor)

  let rooms = floor?.rooms

  rooms = floor?.rooms.map((room) => {
    const reservations = room.reservations.filter((reservation) => {
      return moment(reservation.reservationDate).isSame(moment(selectedDate))
    })

    return {
      ...room,
      reservations,
    }
  }) 

  useEffect(() => {
    const onScroll = () => {
      const { scrollLeft, scrollWidth } = timelineContainerRef.current

      const time = dayjs().format("HH:mm")
      const [ hours, minutes ] = time.toString().split(":")
      const dayPercentage = (hours / 24) + (minutes / 60 / 24)         

      timeIndicatorRef.current.style.left = `${dayPercentage * scrollWidth}px`
      timeIndicatorContainer.current.style.left = `-${scrollLeft}px`
    }


    if (timelineContainerRef.current && timeIndicatorRef.current) { 
      onScroll()

      timelineContainerRef.current.addEventListener("scroll", onScroll)
    }

    return () => {
      if (timelineContainerRef.current) {
        timelineContainerRef.current.removeEventListener("scroll", onScroll)
      }
    }
  }, [ timelineContainerRef, timeIndicatorRef ])

  if (isLoading) {
    return <p>please wait</p>
  }

  return (
    <div className="col-span-10 ml-5 mt-10">
      <div className="flex flex-col gap-2">

        <p className="text-4xl font-bold mb-3">{ data.name }</p>

        {/* Filter */}
        <TimelineFilterForm schoolData={data} form={form} />

        <p className="text-3xl font-medium mt-6 mb-3">{ selectedDate && moment(selectedDate).format("LL") }</p>

        <TimelineContainer
          rooms={rooms}
        />
      </div>

    </div>
  )
}

const TimelinePage = () => {
  return (
    <div className="grid grid-cols-10 gap-2">
      <Timeline />
    </div>
  )
}

export default TimelinePage