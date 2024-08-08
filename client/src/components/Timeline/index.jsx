import { useForm } from "react-hook-form"

import { setDefaultOptions } from "date-fns"
import { fi } from "date-fns/locale"
import { useEffect, useRef } from "react"

import dayjs from "dayjs"
import TimelineFilterForm from "./TimelineFilterForm"
import { useSchoolQuery } from "@/api/schools"
import { useParams } from "react-router-dom"


const TimelineItem = ({ timeStart, timeEnd, unavailable }) => {
  const from = timeStart.split(":").map(v => parseInt(v))
  const to = timeEnd.split(":").map(v => parseInt(v))

  const columnStart = (from[0] * 4 + Math.floor(from[1] / 15) + 1)
  const columnEnd = (to[0] * 4 + Math.floor(to[1] / 15) + 1)

  const gridColumnValueString = `${columnStart} / span ${columnEnd - columnStart}`

  if (unavailable) {
    return (
      <div className="bg-gray-200 rounded-md w-full py-1 px-2 flex flex-col justify-center items-center warning" style={{ gridColumn: gridColumnValueString }}>
        {/* <p className="text-ms uppercase font-medium text-black" style={{ position: "sticky", left: "10px" }}>Ei varattavissa</p> */}
      </div>
    )
  }
  
  return (
    <div className="bg-blue-100 rounded-md w-full py-1 px-2 select-none hover:cursor-pointer hover:bg-blue-200" style={{ gridColumn: gridColumnValueString }}>
      <p className="font-semibold text-sm">Otso Kontio</p>
      <p className="text-xs">{timeStart} - {timeEnd}</p>
      <p className="text-xs max-w-full whitespace-nowrap text-ellipses overflow-hidden"><i>varauksen tarkoitus</i></p>
    </div>
  )
}

const Timeline = () => {
  const form = useForm({});

  const { id } = useParams()
  const { data, error, isLoading } = useSchoolQuery(id);  

  const timelineContainerRef = useRef(null)
  const timeIndicatorRef = useRef(null)
  const timeIndicatorContainer = useRef(null)

  setDefaultOptions({ locale: fi })  

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

        <p className="text-4xl font-bold mb-3">{ data.name } - Varausnäkymä</p>

        {/* Filter */}
        <TimelineFilterForm schoolData={data} form={form} />

        <p className="text-3xl font-medium mt-6 mb-3">13. Huhtikuuta, 2024</p>

        <div className="grid grid-cols-12 overflow-hidden">

          <div className="details col-span-2 grid" style={{ gridTemplateRows: `repeat(6, 70px)` }}>
            <div className="flex flex-col justify-center py-2">
              <p className="font-semibold text-xl">Huone 101</p>
              <p className="font-medium text-sm text-gray-400">06:00 - 21:00</p>
            </div>
            <div className="flex flex-col justify-center py-2">
              <p className="font-semibold text-xl">Huone 102</p>
              <p className="font-medium text-sm text-gray-400">06:00 - 21:00</p>
            </div>
            <div className="flex flex-col justify-center py-2">
              <p className="font-semibold text-xl">Huone 103</p>
              <p className="font-medium text-sm text-gray-400">06:00 - 21:00</p>
            </div>
            <div className="flex flex-col justify-center py-2">
              <p className="font-semibold text-xl">Huone 104</p>
              <p className="font-medium text-sm text-gray-400">06:00 - 21:00</p>
            </div>
            <div className="flex flex-col justify-center py-2">
              <p className="font-semibold text-xl">Huone 105</p>
              <p className="font-medium text-sm text-gray-400">06:00 - 21:00</p>
            </div>
            <div className="flex flex-col justify-center py-2">
              <p className="font-semibold text-xl">Auditorio</p>
              <p className="font-medium text-sm text-gray-400">08:00 - 16:30</p>
            </div>

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

            <div ref={timelineContainerRef} className="overflow-x-scroll grid" style={{ gridTemplateRows: `repeat(6, 70px)` }}>
              <div className="grid gap-2 p-1 border-b border-b-gray-200" style={{ gridTemplateColumns: `repeat(${24 * 4}, 1fr)`, width: `${24 * 4 * 30}px` }}>
                <TimelineItem timeStart="00:00" timeEnd="06:00" unavailable/>

                <TimelineItem timeStart="06:00" timeEnd="07:30" />
                <TimelineItem timeStart="07:45" timeEnd="12:00" />
                <TimelineItem timeStart="14:00" timeEnd="15:30" />
                
                <TimelineItem timeStart="21:00" timeEnd="24:00" unavailable/>
              </div>
              <div className="grid gap-2 p-1 border-b border-b-gray-200" style={{ gridTemplateColumns: `repeat(${24 * 4}, 1fr)`, width: `${24 * 4 * 30}px` }}>
                <TimelineItem timeStart="00:00" timeEnd="06:00" unavailable/>
                <TimelineItem timeStart="06:30" timeEnd="08:00" />
                <TimelineItem timeStart="08:00" timeEnd="12:00" />
                <TimelineItem timeStart="12:30" timeEnd="13:45" />
                <TimelineItem timeStart="16:30" timeEnd="20:15" />
                
                <TimelineItem timeStart="21:00" timeEnd="24:00" unavailable/>
              </div>
              <div className="grid gap-2 p-1 border-b border-b-gray-200" style={{ gridTemplateColumns: `repeat(${24 * 4}, 1fr)`, width: `${24 * 4 * 30}px` }}>
                <TimelineItem timeStart="00:00" timeEnd="06:00" unavailable/>
                <TimelineItem timeStart="08:15" timeEnd="09:30" />
                <TimelineItem timeStart="10:00" timeEnd="11:00" />
                <TimelineItem timeStart="13:00" timeEnd="16:30" />
                
                <TimelineItem timeStart="21:00" timeEnd="24:00" unavailable/>
              </div>
              <div className="grid gap-2 p-1 border-b border-b-gray-200" style={{ gridTemplateColumns: `repeat(${24 * 4}, 1fr)`, width: `${24 * 4 * 30}px` }}>
                <TimelineItem timeStart="00:00" timeEnd="06:00" unavailable/>
                <TimelineItem timeStart="06:00" timeEnd="07:30" />
                <TimelineItem timeStart="07:45" timeEnd="12:00" />
                <TimelineItem timeStart="14:00" timeEnd="15:30" />

                <TimelineItem timeStart="21:00" timeEnd="24:00" unavailable/>
              </div>
              <div className="grid gap-2 p-1 border-b border-b-gray-200" style={{ gridTemplateColumns: `repeat(${24 * 4}, 1fr)`, width: `${24 * 4 * 30}px` }}>
                <TimelineItem timeStart="00:00" timeEnd="06:00" unavailable/>
                <TimelineItem timeStart="06:30" timeEnd="08:00" />
                <TimelineItem timeStart="08:00" timeEnd="12:00" />
                <TimelineItem timeStart="12:30" timeEnd="13:45" />
                <TimelineItem timeStart="16:30" timeEnd="20:15" />

                <TimelineItem timeStart="21:00" timeEnd="24:00" unavailable/>
              </div>
              <div className="grid gap-2 p-1" style={{ gridTemplateColumns: `repeat(${24 * 4}, 1fr)`, width: `${24 * 4 * 30}px` }}>
                <TimelineItem timeStart="00:00" timeEnd="08:00" unavailable/>
                <TimelineItem timeStart="08:15" timeEnd="09:30" />
                <TimelineItem timeStart="10:00" timeEnd="11:00" />
                <TimelineItem timeStart="13:00" timeEnd="16:30" />

                <TimelineItem timeStart="16:30" timeEnd="24:00" unavailable/>
              </div>
            </div>
          </div>

      </div>


      </div>

    </div>
  )
}

const ReservationsPage = () => {
  return (
    <div className="grid grid-cols-10 gap-2">
      {/* <Filter /> */}
      <Timeline />

    </div>
  )
}

export default ReservationsPage