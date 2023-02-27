import { useGLTF } from '@react-three/drei'
import { GLTFResult } from '../../types'
// @ts-ignore
import filePath from './../../assets/3D/error_text.gltf'

const ErrorText = () => {
  const { nodes, materials } = useGLTF(filePath) as GLTFResult
  return (
    <group dispose={null}>
      <mesh geometry={nodes.error.geometry} material={materials.frame} position={[-5.9, 3.25, 0.65]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={1.27} />
    </group>
  )
}

useGLTF.preload(filePath)

export default ErrorText;