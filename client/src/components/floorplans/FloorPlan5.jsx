import React, { useState } from 'react';
import '../../styles/FloorPlan.css';

const reservations = [
  {
    name: "Meeting with Project Team",
    time: "2024-06-15T10:00:00Z",
    user: "648c9f2c9e5b6a2f9e37b3c8",
    school: "648c9f2c9e5b6a2f9e37b3c9",
    building: "648c9f2c9e5b6a2f9e37b3ca",
    room: {
      _id: "room1",
      name: "Room 1",
      capacity: 20,
      building: "648c9f2c9e5b6a2f9e37b3ca",
      bookings: ["648c9f2c9e5b6a2f9e37b3c8"]
    },
    groupsize: 10
  },
  {
    name: "Math Study Group",
    time: "2024-06-16T14:00:00Z",
    user: "648c9f2c9e5b6a2f9e37b3cc",
    school: "648c9f2c9e5b6a2f9e37b3cd",
    building: "648c9f2c9e5b6a2f9e37b3ce",
    room: {
      _id: "room2",
      name: "Room 2",
      capacity: 15,
      building: "648c9f2c9e5b6a2f9e37b3cb",
      bookings: ["648c9f2c9e5b6a2f9e37b3cc"]
    },
    groupsize: 15
  },
  {
    name: "Science Club Meeting",
    time: "2024-06-17T09:00:00Z",
    user: "648c9f2c9e5b6a2f9e37b3d0",
    school: "648c9f2c9e5b6a2f9e37b3d1",
    building: "648c9f2c9e5b6a2f9e37b3d2",
    room: {
      _id: "room3",
      name: "Room 3",
      capacity: 12,
      building: "648c9f2c9e5b6a2f9e37b3d2",
      bookings: ["648c9f2c9e5b6a2f9e37b3d0"]
    },
    groupsize: 8
  },
  {
    name: "English Literature Class",
    time: "2024-06-18T11:00:00Z",
    user: "648c9f2c9e5b6a2f9e37b3d4",
    school: "648c9f2c9e5b6a2f9e37b3d5",
    building: "648c9f2c9e5b6a2f9e37b3d6",
    room: {
      _id: "room4",
      name: "Room 4",
      capacity: 25,
      building: "648c9f2c9e5b6a2f9e37b3d6",
      bookings: ["648c9f2c9e5b6a2f9e37b3d4"]
    },
    groupsize: 25
  },
  {
    name: "History Lecture",
    time: "2024-06-19T13:00:00Z",
    user: "648c9f2c9e5b6a2f9e37b3d8",
    school: "648c9f2c9e5b6a2f9e37b3d9",
    building: "648c9f2c9e5b6a2f9e37b3da",
    room: {
      _id: "room5",
      name: "Room 5",
      capacity: 30,
      building: "648c9f2c9e5b6a2f9e37b3da",
      bookings: ["648c9f2c9e5b6a2f9e37b3d8"]
    },
    groupsize: 15
  }
];

const FloorPlan5 = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomData, setRoomData] = useState(null);

  const handleRoomClick = (roomId) => {
    setSelectedRoom(roomId);
    fetchRoomData(roomId);
  };

  const fetchRoomData = (roomId) => {
    const reservation = reservations.find(res => res.room._id === roomId);
    if (reservation) {
      setRoomData({ id: roomId, info: `Reservation: ${reservation.name}, Time: ${new Date(reservation.time).toLocaleString()}` });
    } else {
      setRoomData({ id: roomId, info: `No reservations for ${roomId}` });
    }
  };

  const getRoomColor = (roomId) => {
    const reservation = reservations.find(res => res.room._id === roomId);
    if (reservation) {
      if (reservation.room.capacity > reservation.groupsize) {
        return '#F4BD89';
      } else if (reservation.room.capacity <= reservation.groupsize) {
        return '#EA7272';
      }
    } else {
      return '#94D0AD';
    }
  };

  const fetchRoomCapacity = (roomId) => {
    const reservation = reservations.find(res => res.room._id === roomId);
    if (reservation.room.capacity > reservation.groupsize) {
      return reservation.room.capacity;
    } else {
      return null; // or return a default value or handle the error as needed
    }
  };

  const roomCapacity = fetchRoomCapacity('room1');
  console.log(`Room capacity: ${roomCapacity}`);

  return (
    <div className="floor-plan">
      <svg viewBox="0 0 552 307" xmlns="http://www.w3.org/2000/svg">
        {/* Room 1 */}
        <rect
          id="room1"
          x="170"
          y="0"
          width="45"
          height="45"
          fill={getRoomColor('room1')}
          onClick={() => handleRoomClick('room1')}
          onMouseEnter={() => handleRoomHover('room1')}
          className="room"
        />

        {/* Room 2 */}
        <rect
          id="room2"
          x="219"
          y="0"
          width="63"
          height="45"
          fill={getRoomColor('room2')}
          onClick={() => handleRoomClick('room2')}
          onMouseEnter={() => handleRoomHover('room2')}
          className="room"
        />

        {/* Room 3 */}
        <rect
          id="room3"
          x="286"
          y="0"
          width="83"
          height="66"
          fill={getRoomColor('room3')}
          onClick={() => handleRoomClick('room3')}
          onMouseEnter={() => handleRoomHover('room3')}
          className="room"
        />

        {/* Room 4 */}
        <rect
          id="room4"
          x="286"
          y="70"
          width="83"
          height="57"
          fill={getRoomColor('room4')}
          onClick={() => handleRoomClick('room4')}
          onMouseEnter={() => handleRoomHover('room4')}
          className="room"
        />

        {/* Room 5 */}
        <rect
          id="room5"
          x="286"
          y="131"
          width="83"
          height="46"
          fill={getRoomColor('room5')}
          onClick={() => handleRoomClick('room5')}
          onMouseEnter={() => handleRoomHover('room5')}
          className="room"
        />

        {/* Room 6 */}
        <rect
          id="room6"
          x="323"
          y="181"
          width="46"
          height="46"
          fill={getRoomColor('room6')}
          onClick={() => handleRoomClick('room6')}
          onMouseEnter={() => handleRoomHover('room6')}
          className="room"
        />

        {/* Room 7 */}
        <rect
          id="room7"
          x="86"
          y="0"
          width="80"
          height="60"
          fill={getRoomColor('room7')}
          onClick={() => handleRoomClick('room7')}
          onMouseEnter={() => handleRoomHover('room7')}
          className="room"
        />

        {/* Room 8 */}
        <rect
          id="room8"
          x="0"
          y="0"
          width="82"
          height="81"
          fill={getRoomColor('room8')}
          onClick={() => handleRoomClick('room8')}
          onMouseEnter={() => handleRoomHover('room8')}
          className="room"
        />

        {/* Room 9 */}
        <rect
          id="room9"
          x="0"
          y="85"
          width="82"
          height="81"
          fill={getRoomColor('room9')}
          onClick={() => handleRoomClick('room9')}
          onMouseEnter={() => handleRoomHover('room9')}
          className="room"
        />

        {/* Room 10 */}
        <rect
          id="room10"
          x="0"
          y="170"
          width="82"
          height="58"
          fill={getRoomColor('room10')}
          onClick={() => handleRoomClick('room10')}
          onMouseEnter={() => handleRoomHover('room10')}
          className="room"
        />
      </svg>
      {roomData && (
        <div className="room-data">
          <h2>{roomData.info}</h2>
        </div>
      )}
    </div>
  );
};

export default FloorPlan5;
