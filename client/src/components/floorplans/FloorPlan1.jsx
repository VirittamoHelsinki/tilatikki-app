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

const FloorPlan1 = ({ floorData }) => {


  const handleRoomClick = (roomNumber) => {
    console.log(roomNumber + "Moi")
  };

  const isRoomInFloorData = (roomNumber) => {
    const exists = floorData.some(room => {
      return Number(room.number) === roomNumber;
    });
    return exists;
  };

  const getRoomColor = (roomNumber) => {
    const color = isRoomInFloorData(roomNumber) ? '#94D0AD' : '#EA7272';
    return color;
  };

  return (
    <div className="floor-plan">
      <svg viewBox="0 0 552 307" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="551" height="306" stroke="#B7B7B7" fill="none" />
        {/* Rooms */}
        {[101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111].map((roomNumber) => {
          const roomProps = {
            101: { x: 0, y: 0, width: 127, height: 81 },
            102: { x: 0, y: 85, width: 82, height: 81 },
            103: { x: 0, y: 170, width: 48, height: 47 },
            104: { x: 402, y: 0, width: 150, height: 81 },
            105: { x: 131, y: 0, width: 107, height: 60 },
            106: { x: 242, y: 0, width: 107, height: 60 },
            107: { x: 353, y: 0, width: 45, height: 45 },
            108: { x: 468, y: 85, width: 84, height: 78 },
            109: { x: 468, y: 167, width: 84, height: 46 },
            110: { x: 468, y: 217, width: 84, height: 46 },
            111: { x: 512, y: 267, width: 40, height: 40 },
          };

          return (
            <rect
              key={roomNumber}
              id={`room${roomNumber}`}
              x={roomProps[roomNumber].x}
              y={roomProps[roomNumber].y}
              width={roomProps[roomNumber].width}
              height={roomProps[roomNumber].height}
              fill={getRoomColor(roomNumber)}
              onClick={() => handleRoomClick(roomNumber)}
              style={{ cursor: 'pointer' }}
            />
          );
        })}
        {/* Non-interactable Areas */}
        <path d="M339 112H213V195H339V112Z" stroke="#B7B7B7" fill="none" />
        <path d="M131 222H0V307H131V222Z" stroke="#B7B7B7" fill="none" />
        <path d="M333 199V219M327 199V219M321 199V219M315 199V219M309 199V219M303 199V219M297 199V219M291 199V219M285 199V219M279 199V219M273 199V219M267 199V219M261 199V219M255 199V219M249 199V219M243 199V219M237 199V219M231 199V219M225 199V219M219 199V219M213 199H339V219H213V199Z" stroke="#B7B7B7" fill="none" />
        <path d="M333 223V243M327 223V243M321 223V243M315 223V243M309 223V243M303 223V243M297 223V243M291 223V243M285 223V243M279 223V243M273 223V243M267 223V243M261 223V243M255 223V243M249 223V243M243 223V243M237 223V243M231 223V243M225 223V243M219 223V243M213 223H339V243H213V223Z" stroke="#B7B7B7" fill="none" />
      </svg>
    </div>
  );
};

export default FloorPlan1
