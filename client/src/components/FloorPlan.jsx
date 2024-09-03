import React, { useState, useEffect } from 'react';
import '../styles/FloorPlan.css';
import MapTooltip from './MapTooltip';
import ReservationDialog from './ReservationDialog';
import { fetchTotalPeopleReserved } from '../api/rooms';

const FloorPlan = ({ floorData, roomProps, floorNumber, filterValues }) => {
  const [hoveredRoom, setHoveredRoom] = useState(null);
  const [hoveredRoomCapacity, setHoveredRoomCapacity] = useState(0);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const [reservationData, setReservationData] = useState({
    roomId: null,
    roomNumber: null,
    capacity: 0,
    groupsize: 0,
    creator: ''
  });

  const [freeRooms, setFreeRooms] = useState([]);
  const [partiallyFreeRooms, setPartiallyFreeRooms] = useState([]);
  const [reservedRooms, setReservedRooms] = useState([]);

  useEffect(() => {
    const fetchRoomData = async () => {
			const calculateTotalPeopleInTimeSlot = async (roomId) => {
				const totalPeople = filterValues.selectedDate && filterValues.startingTime && filterValues.endingTime ? await fetchTotalPeopleReserved(roomId, filterValues.selectedDate, filterValues.startingTime, filterValues.endingTime) : null;
        console.log('totalPeople', totalPeople);
				return totalPeople ? totalPeople.totalPeople : null;
			};



			// Temporary arrays to hold the rooms
			const freeRoomsTemp = [];
			const partiallyFreeRoomsTemp = [];
			const reservedRoomsTemp = [];

			// Loop through the classrooms and classify them based on the total people
			for (const room of floorData) {
				const total = await calculateTotalPeopleInTimeSlot(room._id);
        console.log('room._id', room._id, room.number);
				if (total === null) {
					return;
				}

				if (total === 0) {
					freeRoomsTemp.push({ ...room, total: total });
				} else if (total > 0 && total < room.capacity) {
					partiallyFreeRoomsTemp.push({ ...room, total: total });
				} else {
					reservedRoomsTemp.push({ ...room, total: total });
				}
			}

			// Set the state with the classified rooms
			setFreeRooms(freeRoomsTemp);
			setPartiallyFreeRooms(partiallyFreeRoomsTemp);
			setReservedRooms(reservedRoomsTemp);
		};

    if (filterValues.selectedDate && filterValues.startingTime && filterValues.endingTime) {
      fetchRoomData();
    }
  }, [floorData, filterValues, fetchTotalPeopleReserved]);

  const handleOpenDialog = (roomId, roomNumber, capacity) => {
    setReservationData({ ...reservationData, roomId, roomNumber, capacity });
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  const isRoomInFloorData = (roomNumber) => {
    return floorData.some(room => room.number === roomNumber);
  };
  const getRoomColor = (roomNumber) => {
    const freeRoom = freeRooms.find(room => room.number === roomNumber);
    if (freeRoom) {
      return '#94D0AD';
    }
  
    const partiallyFreeRoom = partiallyFreeRooms.find(room => room.number === roomNumber);
    if (partiallyFreeRoom) {
      return '#F4BD89'; 
    }
  
    const reservedRoom = reservedRooms.find(room => room.number === roomNumber);
    if (reservedRoom) {
      return '#EA7272'; 
    }
  
    return '#EA7272';
  };

  const handleMouseEnter = (event, roomNumber, roomCapacity) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const svg = event.currentTarget.ownerSVGElement;
    const svgRect = svg.getBoundingClientRect();

    // Calculate position within the SVG container
    const x = rect.x - svgRect.x;
    const y = rect.y - svgRect.y - 120; // Positioning the tooltip above the rectangle

    setTooltipPosition({ x, y });
    setHoveredRoom(roomNumber);
    setHoveredRoomCapacity(roomCapacity);
  };

  const handleMouseLeave = () => {
    setHoveredRoom(null);
  };

  const floorPlans = {
    1: {
      rect: { x: "0.5", y: "0.5", width: "551", height: "306" },
      paths: [
        "M339 112H213V195H339V112Z",
        "M131 222H0V307H131V222Z",
        "M333 199V219M327 199V219M321 199V219M315 199V219M309 199V219M303 199V219M297 199V219M291 199V219M285 199V219M279 199V219M273 199V219M267 199V219M261 199V219M255 199V219M249 199V219M243 199V219M237 199V219M231 199V219M225 199V219M219 199V219M213 199H339V219H213V199Z",
        "M333 223V243M327 223V243M321 223V243M315 223V243M309 223V243M303 223V243M297 223V243M291 223V243M285 223V243M279 223V243M273 223V243M267 223V243M261 223V243M255 223V243M249 223V243M243 223V243M237 223V243M231 223V243M225 223V243M219 223V243M213 223H339V243H213V223Z"
      ]
    },
    2: {
      rect: { x: "0.5", y: "0.5", width: "551", height: "306" },
      paths: [
        "M339 112H213V195H339V112Z",
        "M333 199V219M327 199V219M321 199V219M315 199V219M309 199V219M303 199V219M297 199V219M291 199V219M285 199V219M279 199V219M273 199V219M267 199V219M261 199V219M255 199V219M249 199V219M243 199V219M237 199V219M231 199V219M225 199V219M219 199V219M213 199H339V219H213V199Z",
        "M333 223V243M327 223V243M321 223V243M315 223V243M309 223V243M303 223V243M297 223V243M291 223V243M285 223V243M279 223V243M273 223V243M267 223V243M261 223V243M255 223V243M249 223V243M243 223V243M237 223V243M231 223V243M225 223V243M219 223V243M213 223H339V243H213V223Z"
      ]
    },
    3: {
      rect: { x: "0.5", y: "0.5", width: "483", height: "227" },
      paths: [
        "M286 92H198V141H286V92Z",
        "M281.81 145V161M277.619 145V161M273.429 145V161M269.238 145V161M265.048 145V161M260.857 145V161M256.667 145V161M252.476 145V161M248.286 145V161M244.095 145V161M239.905 145V161M235.714 145V161M231.524 145V161M227.333 145V161M223.143 145V161M218.952 145V161M214.762 145V161M210.571 145V161M206.381 145V161M202.19 145V161M198 145H286V161H198V145Z",
        "M281.81 165V181M277.619 165V181M273.429 165V181M269.238 165V181M265.048 165V181M260.857 165V181M256.667 165V181M252.476 165V181M248.286 165V181M244.095 165V181M239.905 165V181M235.714 165V181M231.524 165V181M227.333 165V181M223.143 165V181M218.952 165V181M214.762 165V181M210.571 165V181M206.381 165V181M202.19 165V181M198 165H286V181H198V165Z"
      ]
    },
    4: {
      rect: { x: "0.5", y: "0.5", width: "483", height: "227" },
      paths: [
        "M286 92H198V141H286V92Z",
        "M281.81 145V161M277.619 145V161M273.429 145V161M269.238 145V161M265.048 145V161M260.857 145V161M256.667 145V161M252.476 145V161M248.286 145V161M244.095 145V161M239.905 145V161M235.714 145V161M231.524 145V161M227.333 145V161M223.143 145V161M218.952 145V161M214.762 145V161M210.571 145V161M206.381 145V161M202.19 145V161M198 145H286V161H198V145Z",
        "M281.81 165V181M277.619 165V181M273.429 165V181M269.238 165V181M265.048 165V181M260.857 165V181M256.667 165V181M252.476 165V181M248.286 165V181M244.095 165V181M239.905 165V181M235.714 165V181M231.524 165V181M227.333 165V181M223.143 165V181M218.952 165V181M214.762 165V181M210.571 165V181M206.381 165V181M202.19 165V181M198 165H286V181H198V165Z"
      ]
    },
    5: {
      rect: { x: "0.5", y: "0.5", width: "368", height: "227" },
      paths: [
        "M225 100H145V158H225V100Z"
      ]
    }
  };
  
  

  const floorPlan = floorPlans[floorNumber];
  
  return (
    <div className="floor-plan" style={{ position: 'relative' }}>
      <svg
        viewBox="0 0 552 307"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'relative' }}
      >
        <rect x={floorPlan.rect.x} y={floorPlan.rect.y} width={floorPlan.rect.width} height={floorPlan.rect.height} stroke="#B7B7B7" fill="none" />
        {floorPlan.paths.map((d, index) => (
          <path key={index} d={d} stroke="#B7B7B7" fill="none" />
        ))}
        {Object.keys(roomProps).map(roomNumber => (
          <rect
            key={roomNumber}
            id={`room${roomNumber}`}
            x={roomProps[roomNumber].x}
            y={roomProps[roomNumber].y}
            width={roomProps[roomNumber].width}
            height={roomProps[roomNumber].height}
            fill={getRoomColor(roomNumber)}
            onMouseEnter={(e) => isRoomInFloorData(roomNumber) && handleMouseEnter(e, roomNumber, floorData[roomProps[roomNumber].i].capacity)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleOpenDialog(floorData[roomProps[roomNumber].i]._id, roomNumber, floorData[roomProps[roomNumber].i].capacity)}
            className="room"
            style={{ cursor: 'pointer' }}
          />
        ))}
      </svg>
      {hoveredRoom && (
        <MapTooltip
          roomName={`Opetustila: ${hoveredRoom}`}
          roomCapacity={hoveredRoomCapacity}
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            position: 'absolute',
          }}
        />
      )}
      <ReservationDialog
        isOpen={isOpen}
        onClose={handleCloseDialog}
        roomId={reservationData.roomId}
        roomNumber={reservationData.roomNumber}
        capacity={reservationData.capacity}
        groupsize={reservationData.groupsize}
        creator={reservationData.creator}
        reservationName={reservationData.purpose}
        filterValues={filterValues}
      />
    </div>
  );
};

export default FloorPlan;
