import { useGLTF } from '@react-three/drei'
import { GLTFResult } from '../../types'
// @ts-ignore
import filePath from './../../assets/3D/shutdowning_text.gltf'

const ErrorText = () => {
  const { nodes, materials } = useGLTF(filePath) as GLTFResult
  return (
    <group dispose={null}>
      <mesh geometry={nodes.shutdowning.geometry} material={materials.screen} position={[-5.9, 2.25, 2.18]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} />
    </group>
  )
}

useGLTF.preload(filePath)

export default ErrorText;