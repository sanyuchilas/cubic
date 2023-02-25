import { TrackballControls, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React from 'react';
import TestBox from '../../components/TestBox/TestBox';

const GamePage = () => {
  const isReverse = true;
  return (
    <Canvas style={{height: '100vh', width: '100vw'}}>
      <ambientLight />
      <pointLight position={[15, 15, 90]} />
      <TrackballControls noRotate={true} noPan={true}/>
      <OrbitControls enableZoom ={false}/>
      {isReverse && <TestBox position={[0, 0, 0]} />}
      <TestBox position={[0, 2, 0]} />
      <TestBox position={[0, -2, 0]} />
    </Canvas>
  );
};

export default GamePage;