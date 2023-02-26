import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { useAppSelector } from '../../app/hooks'
import { gameSelector } from '../../app/selectors/gameSelector'
//@ts-ignore
import level_1 from './../../assets/3D/level_1.1.gltf'

type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Mesh>
  materials: Record<string, THREE.MeshStandardMaterial>
}

const PI = Math.PI

export function FisrtLevel() {
  const { nodes, materials } = useGLTF(level_1) as GLTFResult
  const {isContramot1, isContramot2, isContramotor1Broken } = useAppSelector(gameSelector)

  return (
    <group dispose={null}>
      {/* <mesh geometry={nodes.plane.geometry} material={materials.plane} position={[0, -0.21, 0]} scale={94.98}/> */}
      <mesh geometry={nodes['3_cube'].geometry} castShadow material={materials.object} position={[5.5, 0.5, 1.5]}>
        <meshLambertMaterial wireframe color={'black'}/>
      </mesh>
      <mesh geometry={nodes['3_cube'].geometry} castShadow material={materials.object} position={[5.5, 0.5, 1.5]}/>
      <group position={[4.13, 2.86, -2.17]}>
        <mesh geometry={nodes.screen_3.geometry} material={materials.frame}>
          <meshLambertMaterial wireframe color={'black'}/>
        </mesh>
        <mesh geometry={nodes.screen_3.geometry} material={materials.frame}/>
        <mesh geometry={nodes.screen_3_1.geometry} material={materials.screen} />
      </group>
      <group position={[4.12, 1.43, -2.86]}>
        <mesh geometry={nodes['3_btns'].geometry} material={materials.btn_green} />
        <mesh geometry={nodes['3_btns_1'].geometry} material={materials.btn_yellow} />
        <mesh geometry={nodes['3_btns_2'].geometry} material={materials.btn_red} />
      </group>
      <mesh geometry={nodes['3_carrie'].geometry} material={materials.boxes} position={[4.08, 1.19, -1.57]} />
      <mesh geometry={nodes['3_export_wires'].geometry} material={materials.wires} position={[4.16, 1.72, -0.03]} rotation={[1.5, 0, -PI / 2]} />
      <group position={[4.08, 1.19, -1.57]}>
        <mesh geometry={nodes['3_handle_1'].geometry} material={materials.richag} />
        <mesh geometry={nodes['3_handle_2'].geometry} material={materials.pipka}>
        </mesh>
      </group>
      <mesh geometry={nodes['2_freeze'].geometry} castShadow material={materials.freeze} position={[0.5, 0.5, -3.49]}>
        <meshLambertMaterial wireframe color={'#8DA7D6'}/>
      </mesh>
      <group 
        position={[-0.5, 0.59, -0.5]} 
        rotation={[-PI, PI / 4, isContramot2 ? -1.2 - PI / 4.25 : -1.2]}
      >
        <mesh geometry={nodes['2_handle_1'].geometry} material={materials.richag} />
        <mesh geometry={nodes['2_handle_2'].geometry} material={materials.pipka} />
      </group>
      <mesh geometry={nodes['2_contramotor'].geometry} castShadow material={materials.boxes} position={[-0.5, 0.59, -0.5]} rotation={[PI, PI / 4, -1.2]} />
      <group position={[-5.95, 2.49, 0.04]}>
        <mesh geometry={nodes.screen_1.geometry} castShadow material={materials.screen} />
        <mesh geometry={nodes.screen_1_1.geometry} castShadow material={materials.frame}>
          <meshLambertMaterial wireframe color={'black'}/>
        </mesh>
        <mesh geometry={nodes.screen_1_1.geometry} castShadow material={materials.frame}/>
      </group>
      <mesh geometry={nodes['1_pc'].geometry} castShadow material={materials.pc} position={[-2.5, 0.5, -1.49]}>
        <meshLambertMaterial wireframe color={'black'}/>
      </mesh>
      <group 
        rotation={isContramotor1Broken ? [0, 0, -PI / 2] : [0, 0, 0]}
        position={isContramotor1Broken ? [-1.12, -1.12, 0] : [0, 0, 0]}
      >
        <mesh geometry={nodes['1_contramotor'].geometry} castShadow material={materials.boxes} position={[-0.73, -0.62, 1.5]} />
        <group 
          position={[-1.5, 0.59, 1.5]} 
          rotation={[0, PI / 4, isContramot1 ? 1.94 - PI / 4.25 : 1.94]}
        >
          <mesh geometry={nodes['1_handle_1'].geometry} material={materials.richag} />
          <mesh geometry={nodes['1_handle_2'].geometry} material={materials.pipka} />
        </group>
      </group>
      <mesh geometry={nodes.room_1.geometry} receiveShadow material={materials.room}>
        <meshLambertMaterial wireframe color={'black'}/>
      </mesh>
      <mesh geometry={nodes.room_1.geometry} receiveShadow material={materials.room}>
        <meshLambertMaterial/>
      </mesh>
      <mesh 
        geometry={nodes.room_2.geometry} 
        material={
          isContramot1 ? materials.window_contramoted : materials.window_1
        } 
      />
      <mesh 
        geometry={nodes.room_3.geometry} 
        material={
          isContramot2 ? materials.window_contramoted : materials.window_2
        }
      />
      <mesh geometry={nodes.room_4.geometry} material={materials.window_between} />
    </group>
  )
}

useGLTF.preload(level_1)