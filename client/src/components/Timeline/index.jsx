import { useForm } from "react-hook-form"

import { setDefaultOptions } from "date-fns"
import { fi } from "date-fns/locale"
import { useEffect, useRef } from "react"

import dayjs from "dayjs"
import TimelineFilterForm from "./TimelineFilterForm"
import { useSchoolQuery } from "@/api/schools"
import { useParams } from "react-router-dom"


const TimelineItem = ({ timeStart, timeEnd, unavailable, user, label }) => {
  const from = timeStart.split(":").map(v => parseInt(v))
  const to = timeEnd.split(":").map(v => parseInt(v))

  const columnStart = (from[0] * 4 + Math.floor(from[1] / 15) + 1)
  const columnEnd = (to[0] * 4 + Math.floor(to[1] / 15) + 1)

  const gridColumnValueString = `${columnStart} / span ${columnEnd - columnStart}`

  if (unavailable) {
    return (
      <div
        className="bg-gray-200 rounded-md warning"
        style={{ gridColumn: gridColumnValueString, gridRow: "1 / -1" }}
      >
        {/* <p className="text-ms uppercase font-medium text-black" style={{ position: "sticky", left: "10px" }}>Ei varattavissa</p> */}
      </div>
    )
  }
  
  return (
    <div className="bg-blue-100 rounded-md w-full py-1 px-2 select-none hover:cursor-pointer hover:bg-blue-200" style={{ gridColumn: gridColumnValueString }}>
      <p className="font-semibold text-sm">{user.name} {user.surname}</p>
      <p className="text-xs">{timeStart} - {timeEnd}</p>
      <p className="text-xs max-w-full whitespace-nowrap text-ellipses overflow-hidden"><i>{label}</i></p>
    </div>
  )
}

const TimelineContainer = ({
  rooms = [],
  showRoomInformation = true,
}) => {
  return (
    <div className="timeline-container grid" style={{ gridTemplateColumns: "auto 1fr", gridTemplateRows: `repeat(${rooms.length}, 1fr)` }}>
      {
        rooms.map((room, index) => (
          <>
            {
              showRoomInformation && (
                <div key={room._id} className={`timeline__room px-4 col-start-1 min-w-40`}>
                  <div className="timeline__room-information flex flex-col justify-center py-2">
                    <p className="font-semibold text-xl">Huone {room.number}</p>
                    <p className="font-medium text-sm text-gray-400">00:00 - 24:00</p>
                  </div>
                </div>
              )
            }
            <div className="timelines col-start-2 row-span-full border-2 rounded-lg h-full grid" style={{ gridTemplateRows: `repeat(${rooms.length}, 1fr)`} }>
              {
                rooms?.map((room) => (
                  <div className="grid gap-x-2 gap-y-1 p-1 border-b border-b-gray-200" style={{ gridTemplateRows: "auto auto", gridTemplateColumns: `repeat(${24 * 4}, 1fr)`, width: `${24 * 4 * 30}px` }}>
                    <TimelineItem timeStart="00:00" timeEnd="05:00" unavailable/>
    
                    {
                      // Reservations inside the timeline
                      room.reservations.map((reservation) => (
                        <TimelineItem
                          timeStart={reservation.startTime}
                          timeEnd={reservation.endTime}
                          label={reservation.purpose}
                          user={reservation.user}
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

const TimelineX = () => {
  const form = useForm({});

  const { id } = useParams()
  const { data, error, isLoading } = useSchoolQuery(id);  

  const timelineContainerRef = useRef(null)
  const timeIndicatorRef = useRef(null)
  const timeIndicatorContainer = useRef(null)

  setDefaultOptions({ locale: fi })  

  console.log(data);


  const selectedBuilding = form.watch("building")
  const selectedFloor = form.watch("floor")
  const selectedDate = form.watch("date")

  const building = data.buildings.find((building) => building._id === selectedBuilding)
  const floor = building?.floors.find((floor) => floor._id === selectedFloor)
  const rooms = floor?.rooms

  const room = rooms?.[0]
  

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

        <p className="text-4xl font-bold mb-3">Aikajananäkymä - { data.name }</p>

        {/* Filter */}
        <TimelineFilterForm schoolData={data} form={form} />

        <p className="text-3xl font-medium mt-6 mb-3">13. Huhtikuuta, 2024</p>

        <TimelineContainer
          rooms={rooms}
        />

        {/* <div className="grid grid-cols-12 overflow-hidden">

          <div className="details col-span-2 grid" style={{ gridTemplateRows: `repeat(auto, 70px)` }}>

            {
              // Render room names on the left
              rooms?.map((room) => (
                <div className="flex flex-col justify-center py-2">
                  <p className="font-semibold text-xl">Huone {room.number}</p>
                  <p className="font-medium text-sm text-gray-400">00:00 - 24:00</p>
                </div>
              ))
            }

          </div>

          <div className="border-r border-l timelines col-span-10 relative grid">
            <div ref={timeIndicatorContainer} className="absolute h-full" style={{ pointerEvents: "none", width: `${24 * 4 * 30}px` }}>
              <div
                ref={timeIndicatorRef}
                className="absolute w-[2px] h-full rounded-full bg-red-400"
                style={{ left: "0%", top: "0px", transform: "translateX(-50%)", pointerEvents: "none" }}
              >
              </div>
            </div>

            <div ref={timelineContainerRef} className="overflow-x-scroll grid" style={{ gridTemplateRows: `repeat(auto, 70px)` }}>
              {
                // Thesse are the actual timelines
                rooms?.map((room) => (
                  <div className="grid gap-2 p-1 border-b border-b-gray-200" style={{ gridTemplateColumns: `repeat(${24 * 4}, 1fr)`, width: `${24 * 4 * 30}px` }}>
                    <TimelineItem timeStart="00:00" timeEnd="05:00" unavailable/>
    
                    {
                      // Reservations inside the timeline
                      room.reservations.map((reservation) => (
                        <TimelineItem
                          timeStart={reservation.startTime}
                          timeEnd={reservation.endTime}
                          label={reservation.purpose}
                          user={reservation.user}
                        />
                      ))
                    }
                    
                    <TimelineItem timeStart="20:00" timeEnd="24:00" unavailable/>
                  </div>
                ))
              }
            </div>
          </div>

        </div> */}


      </div>

    </div>
  )
}

const ReservationsPage = () => {
  return (
    <div className="grid grid-cols-10 gap-2">
      {/* <Filter /> */}
      <TimelineX />

    </div>
  )
}

export default ReservationsPage