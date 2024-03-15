import { Html, useProgress } from '@react-three/drei';
import React from 'react'

// TODO: Tell here what the component does

const Loader: React.FC = () => {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

export default Loader
