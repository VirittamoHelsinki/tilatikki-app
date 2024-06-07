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
      _id: "room15",
      name: "Room 15",
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
      _id: "room8",
      name: "Room 8",
      capacity: 30,
      building: "648c9f2c9e5b6a2f9e37b3da",
      bookings: ["648c9f2c9e5b6a2f9e37b3d8"]
    },
    groupsize: 15
  }
];

const FloorPlan = () => {
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
          className='room'
          id="room1"
          x="10"
          y="10"
          width="100"
          height="80"
          fill={getRoomColor('room1')}
          onClick={() => handleRoomClick('room1')}
        />

        {/* Room 2 */}
        <rect
          className='room'
          id="room2"
          x="120"
          y="10"
          width="90"
          height="70"
          fill={getRoomColor('room2')}
          onClick={() => handleRoomClick('room2')}
        />

        {/* Room 3 */}
        <rect
          className='room'
          id="room3"
          x="220"
          y="10"
          width="100"
          height="90"
          fill={getRoomColor('room3')}
          onClick={() => handleRoomClick('room3')}
        />

        {/* Room 4 */}
        <rect
          className='room'
          id="room4"
          x="330"
          y="10"
          width="80"
          height="100"
          fill={getRoomColor('room4')}
          onClick={() => handleRoomClick('room4')}
        />

        {/* Room 5 */}
        <rect
          className='room'
          id="room5"
          x="10"
          y="100"
          width="70"
          height="80"
          fill={getRoomColor('room5')}
          onClick={() => handleRoomClick('room5')}
        />

        {/* Room 6 */}
        <rect
          className='room'
          id="room6"
          x="90"
          y="100"
          width="100"
          height="60"
          fill={getRoomColor('room6')}
          onClick={() => handleRoomClick('room6')}
        />

        {/* Room 7 */}
        <rect
          className='room'
          id="room7"
          x="200"
          y="100"
          width="90"
          height="70"
          fill={getRoomColor('room7')}
          onClick={() => handleRoomClick('room7')}
        />

        {/* Room 8 */}
        <rect
          className='room'
          id="room8"
          x="300"
          y="100"
          width="110"
          height="80"
          fill={getRoomColor('room8')}
          onClick={() => handleRoomClick('room8')}
        />

        {/* Room 9 */}
        <rect
          className='room'
          id="room9"
          x="420"
          y="100"
          width="70"
          height="90"
          fill={getRoomColor('room9')}
          onClick={() => handleRoomClick('room9')}
        />

        {/* Room 10 */}
        <rect
          className='room'
          id="room10"
          x="10"
          y="190"
          width="90"
          height="70"
          fill={getRoomColor('room10')}
          onClick={() => handleRoomClick('room10')}
        />

        {/* Room 11 */}
        <rect
          className='room'
          id="room11"
          x="110"
          y="190"
          width="100"
          height="60"
          fill={getRoomColor('room11')}
          onClick={() => handleRoomClick('room11')}
        />

        {/* Room 12 */}
        <rect
          className='room'
          id="room12"
          x="220"
          y="190"
          width="100"
          height="70"
          fill={getRoomColor('room12')}
          onClick={() => handleRoomClick('room12')}
        />

        {/* Room 13 */}
        <rect
          className='room'
          id="room13"
          x="330"
          y="190"
          width="80"
          height="100"
          fill={getRoomColor('room13')}
          onClick={() => handleRoomClick('room13')}
        />

        {/* Room 14 */}
        <rect
          className='room'
          id="room14"
          x="420"
          y="190"
          width="100"
          height="80"
          fill={getRoomColor('room14')}
          onClick={() => handleRoomClick('room14')}
        />

        {/* Room 15 */}
        <rect
          className='room'
          id="room15"
          x="530"
          y="190"
          width="90"
          height="70"
          fill={getRoomColor('room15')}
          onClick={() => handleRoomClick('room15')}
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

export default FloorPlan;
