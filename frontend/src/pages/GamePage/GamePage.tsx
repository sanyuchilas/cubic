import { OrbitControls, TrackballControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from 'three';
import { useAppDispatch } from '../../app/hooks';
import { FisrtLevel } from '../../components/FirstLevel/FirstLevel';
import Panel from '../../components/Panel/Panel';
import { myTimeouts } from '../../utils/myTomiouts';
import { defaultState } from './../../app/reducers/gameReducer';
import styles from './GamePage.module.scss';

const GamePage = () => {
  const camera = new PerspectiveCamera(50, 2, 0.1, 1000)
  const dispatch = useAppDispatch()

  function restartClickHandler() {
    myTimeouts.clearAll()
    dispatch({type: 'game', payload: defaultState})
  }

  camera.position.set(7.58398, 4.99278, 17.957)

  return (
    <div className={styles.container}>
      <Canvas 
        style={{height: '100%', width: '100%'}}
        camera={camera}
        shadows
      > 
        <ambientLight color='#666' intensity={.75}/>
        {/* <pointLight
          position={[5.13702, 4.61732, -2.5]}
          intensity={1}
          power={15}
          shadow-mapSize={512}
          castShadow
          name='light_3'
          distance={12}
          color={'white'}
        /> */}
        <pointLight
          position={[2.44001, 7.9474, 7.81545]}
          intensity={2}
          power={50}
          shadow-mapSize={512}
          castShadow
          name='ligth_4'
          distance={16}
          color={'white'}
        />
        {/* <pointLight
          position={[-3.38417, 4.62732, 0.203768]}
          intensity={1}
          power={10}
          shadow-mapSize={512}
          castShadow
          name='ligth_1'
          distance={7}
          color={'white'}
        /> */}
        {/* <pointLight
          position={[1.63165, 4.62732, 0.032774]}
          intensity={1}
          power={10}
          shadow-mapSize={512}
          castShadow
          name='ligth_2'
          distance={7}
          color={'white'}
        /> */}
        <TrackballControls
          noRotate={true}
          noPan={true}
          maxDistance={20}
          minDistance={5}
          target={[-0.25, 2.5, 0]}
        />
        <OrbitControls
          enableZoom ={false}
          target={[-0.25, 2.5, 0]}
        />
        <FisrtLevel/>
        {/* <axesHelper args={[5]}/> */}
      </Canvas>
      <Panel/>
      <button
        className={styles.restart}
        onClick={restartClickHandler}
      >Начать заново</button>
    </div>
  );
};

export default GamePage;