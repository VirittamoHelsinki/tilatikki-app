import React, { useState } from 'react';
import '../../styles/FloorPlan.css';
import MapTooltip from '../MapTooltip';

const FloorPlan5 = ({ floorData }) => {
  const [hoveredRoom, setHoveredRoom] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const isRoomInFloorData = (roomNumber) => {
    return floorData.some(room => room.number === roomNumber);
  };

  const getRoomColor = (roomNumber) => {
    return isRoomInFloorData(roomNumber) ? '#94D0AD' : '#EA7272';
  };

  const handleMouseEnter = (event, roomNumber) => {
    const { clientX, clientY } = event;
    const svgRect = event.currentTarget.getBoundingClientRect();
    
    // Calculate position within the SVG container
    const x = clientX - svgRect.left;
    const y = clientY - svgRect.top - 50; // Positioning the tooltip above the mouse pointer

    setTooltipPosition({ x, y });
    setHoveredRoom(roomNumber);
  };

  const handleMouseLeave = () => {
    setHoveredRoom(null);
  };

  const roomProps = {
    101: { x: 170, y: 0, width: 45, height: 45 },
    102: { x: 219, y: 0, width: 63, height: 45 },
    103: { x: 286, y: 0, width: 83, height: 66 },
    104: { x: 286, y: 70, width: 83, height: 57 },
    105: { x: 286, y: 131, width: 83, height: 46 },
    106: { x: 323, y: 181, width: 46, height: 46 },
    107: { x: 86, y: 0, width: 80, height: 60 },
    108: { x: 0, y: 0, width: 82, height: 81 },
    109: { x: 0, y: 85, width: 82, height: 81 },
    110: { x: 0, y: 170, width: 82, height: 58 },
  };

  return (
    <div className="floor-plan" style={{ position: 'relative' }}>
      <svg
        viewBox="0 0 552 307"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'relative' }}
      >
        <rect x="0.5" y="0.5" width="368" height="227" stroke="#B7B7B7" fill="none" />
        {Object.keys(roomProps).map(roomNumber => (
          <rect
            key={roomNumber}
            id={`room${roomNumber}`}
            x={roomProps[roomNumber].x}
            y={roomProps[roomNumber].y}
            width={roomProps[roomNumber].width}
            height={roomProps[roomNumber].height}
            fill={getRoomColor(roomNumber)}
            onMouseEnter={(e) => handleMouseEnter(e, roomNumber)}
            onMouseLeave={handleMouseLeave}
            className="room"
            style={{ cursor: 'pointer' }}
          />
        ))}
        <path d="M225 100H145V158H225V100Z" stroke="#B7B7B7" fill="none" />
      </svg>
      {hoveredRoom && (
        <MapTooltip
          roomName={`Room ${hoveredRoom}`}
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
          }}
        />
      )}
    </div>
  );
};

export default FloorPlan5;
