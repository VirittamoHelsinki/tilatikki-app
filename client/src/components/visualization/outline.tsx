import React from 'react'
import { Shape } from 'three';

// TODO: Tell here what the component does

interface OutlineProps {
  shape: Shape
}

const Outline: React.FC<OutlineProps> = ({ shape }) => {
  return (
    <mesh rotation={[0, 0, Math.PI / 1]}>
      <shapeGeometry args={[shape]} />
      <meshBasicMaterial depthWrite={false} color="#f8f8f8" />
    </mesh>
  );
}

export default Outline
