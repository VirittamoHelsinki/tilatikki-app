import { Html } from '@react-three/drei';
import React from 'react'

// TODO: Tell here what the component does

interface RoomHoverProps {
  x: number;
  y: number;
}

const RoomHover: React.FC<RoomHoverProps> = ({ x, y }) => {
  return (
    <Html
      scale={100}
      rotation={[Math.PI / 1, Math.PI / 1, 0]}
      position={[x - 50, y - 50, 1]}
      transform
      occlude
      className="flex items-center justify-center"
    >
      <div className="flex h-14 w-14 grow flex-col items-center justify-center rounded-md bg-lime-950">
        <p className="text-xs text-lime-100">x: {x}</p>
        <p className="text-xs text-lime-100">y: {y}</p>
      </div>
    </Html>
  );
}

export default RoomHover
