import { TrackballControls, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React from 'react';
import { FisrtLevel } from '../../components/models/FirstLevel/FirstLevel';
import TestBox from '../../components/TestBox/TestBox';
import styles from './GamePage.module.scss'

const GamePage = () => {

  return (
    // <Canvas style={{height: '100vh', width: '100vw'}}>
    //   <ambientLight />
    //   {isReverse && <TestBox position={[0, 0, 0]} />}
    //   <TestBox position={[0, 2, 0]} />
    //   <TestBox position={[0, -2, 0]}/>
    // </Canvas>
    <div className={styles.container}>
      <Canvas style={{height: '100%', width: '100%'}}>
        <ambientLight />
        <pointLight position={[15, 15, 90]} />
        <TrackballControls noRotate={true} noPan={true}/>
        <OrbitControls enableZoom ={false}/>
        <FisrtLevel/>
      </Canvas>
    </div>
  );
};

export default GamePage;