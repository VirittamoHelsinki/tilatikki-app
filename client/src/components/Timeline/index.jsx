import { useForm } from "react-hook-form";

import { setDefaultOptions } from "date-fns";
import { fi } from "date-fns/locale";
import { useEffect, useState } from "react";

import TimelineFilterForm from "./TimelineFilterForm";
import Timeline from "./Timeline"
import { useSchoolQuery } from "@/api/schools";
import { useParams } from "react-router-dom";

import moment from "moment";
import "moment/dist/locale/fi";
import Dialog from "../Dialog";
import { Label } from "@radix-ui/react-label";
import { useCreateReservationMutation } from "@/api/reservations";
import { fetchUserDataByEmail } from "@/api/userApi";
import { getCookie } from "@/utils/Cookies";
import NewReservationDialog from "../NewReservationDialog";
import EditReservationDialog from "../EditReservationDialog";
import useUser from "@/utils/useUser";

moment.locale("fi");

const TimelineContainer = ({
  rooms = [],
  handleOpenNewReservationModal,
  handleOpenEditReservationModal,
  showRoomInformation = true,
  currentUser,
  highlightMode,
}) => {
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
                    <p className="font-medium text-sm text-gray-400">00:00 - 24:00</p>
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
                rooms?.map((room) => (
                  <Timeline
                    room={room}
                    handleOpenNewReservationModal={handleOpenNewReservationModal}
                    handleOpenEditReservationModal={handleOpenEditReservationModal}
                    currentUser={currentUser}
                    highlightMode={highlightMode}
                  />
                ))
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
      date: moment().format("MM/DD/YYYY"), // Requires date in this format,
      highlightMode: false,
    },
  });

  const [ showNewReservationModal, setShowNewReservationModal ] = useState(null);
  const [ showEditReservationModal, setShowEditReservationModal ] = useState(null);
  const [ reservationToEdit, setReservationToEdit ] = useState(null);
  const user = useUser();

	const createReservationMutation = useCreateReservationMutation();

  setDefaultOptions({ locale: fi });

  const handleOpenNewReservationModal = (room) => {
    setShowNewReservationModal(room);
  }

  const handleOpenEditReservationModal = (reservationId) => {
    setShowEditReservationModal(true);
    setReservationToEdit(reservationId);
  }

  const selectedBuilding = form.watch("building");
  const selectedFloor = form.watch("floor");
  const selectedDate = form.watch("date");

  const building = data.buildings.find((building) => building._id === selectedBuilding);
  const floor = building?.floors.find((floor) => floor._id === selectedFloor);

  let rooms = floor?.rooms;

  rooms = floor?.rooms.map((room) => {
    const reservations = room.reservations.filter((reservation) => {
      return moment(reservation.reservationDate).isSame(moment(selectedDate), "day");
    });

    return {
      ...room,
      reservations,
    }
  });


  return (
    <>

      <EditReservationDialog
        reservationId={reservationToEdit}
        isOpen={showEditReservationModal}
        onOpenChange={setShowEditReservationModal}
      />

      <NewReservationDialog
        room={showNewReservationModal}
        user={user}
        isOpen={showNewReservationModal}
        onOpenChange={setShowNewReservationModal}
        defaultData={{
          date: form.watch("date"),
          // startTime,
          // endTime,
        }}
      />


      <div className="grid grid-cols-10 gap-2">
        <div className="col-span-10 ml-5 mt-10">
          <div className="flex flex-col gap-2">

            <p className="text-4xl font-bold mb-3">{ data.name }</p>

            {/* Filter */}
            <TimelineFilterForm schoolData={data} form={form} />

            <p className="text-3xl font-medium mt-6 mb-3">{ selectedDate && moment(selectedDate).format("LL") }</p>

            <TimelineContainer
              rooms={rooms}
              handleOpenNewReservationModal={handleOpenNewReservationModal}
              handleOpenEditReservationModal={handleOpenEditReservationModal}
              highlightMode={form.watch("highlightMode")}
              currentUser={user}
            />
          </div>

        </div>
      </div>
    </>
  );
}

export default TimelinePage;