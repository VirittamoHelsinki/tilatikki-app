import { useForm } from "react-hook-form";

import { setDefaultOptions } from "date-fns";
import { fi } from "date-fns/locale";
import { useState } from "react";

import TimelineFilterForm from "./TimelineFilterForm";
import TimelineItem from "./TimelineItem";
import Timeline from "./Timeline"
import { useSchoolQuery } from "@/api/schools";
import { useParams } from "react-router-dom";

import moment from "moment";
import "moment/dist/locale/fi";

moment.locale("fi");

const TimelineContainer = ({
  rooms = [],
  showRoomInformation = true,
}) => {

  const [ trackingMouse, setTrackingMouse ] = useState(false);
  const [ trackStart, setTrackStart ] = useState(-1);
  const [ indicator, setIndicator ] = useState(null);

  const onMouseDown = (event) => {
    const target = event.target;
    const indicatorElement = target.querySelector(".new-reservation-indicator");

    const rect = target.getBoundingClientRect();
    const blockPosition = (event.clientX - rect.left);

    indicatorElement.style.display = "block";
    indicatorElement.style.left = `${blockPosition}px`;
    indicatorElement.style.width = `${0}px`;

    setIndicator(indicatorElement);
    setTrackStart(blockPosition);
    setTrackingMouse(true);
  }

  const onMouseUp = () => {
    // open modal here
    setTrackStart(0);
    setTrackingMouse(false);
    setIndicator(null);
  }

  const onMouseMove = (event) => {
    if (!trackingMouse) {
      return;
    }

    const target = event.target;

    const rect = target.getBoundingClientRect();
    const blockSize = (event.clientX - trackStart - rect.left);

    if (blockSize > 0) {
      indicator.style.width = `${blockSize}px`;
    } else {
      indicator.style.left = `${trackStart - Math.abs(blockSize)}px`;
      indicator.style.width = `${Math.abs(blockSize)}px`;
    }
  }

  const stopEventPropagation = (event) => {
    event.stopPropagation();
  }

  return (
    <div
      className="timeline-container grid max-w-full overflow-auto max-h-[600px]"
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
                {
                  /* Render timestamps */
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

              { /* TIMELINE ITEM CONTAINER (this is the "actual" timeline */
                rooms?.map((room) => <Timeline room={room} />)
              }
            </div>
          </>
        ))
      }
    </div>
  )
}


const TimelinePage = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useSchoolQuery(id);
  const form = useForm({
    defaultValues: {
      date: moment().format("MM/DD/YYYY") // Requires date in this format
    },
  });

  setDefaultOptions({ locale: fi });

  const selectedBuilding = form.watch("building");
  const selectedFloor = form.watch("floor");
  const selectedDate = form.watch("date");

  const building = data.buildings.find((building) => building._id === selectedBuilding);
  const floor = building?.floors.find((floor) => floor._id === selectedFloor);

  let rooms = floor?.rooms;

  rooms = floor?.rooms.map((room) => {
    const reservations = room.reservations.filter((reservation) => {
      return moment(reservation.reservationDate).isSame(moment(selectedDate));
    });

    return {
      ...room,
      reservations,
    }
  });

  if (isLoading) {
    return <p>please wait</p>
  }

  return (
    <div className="grid grid-cols-10 gap-2">
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
    </div>
  );
}

export default TimelinePage;