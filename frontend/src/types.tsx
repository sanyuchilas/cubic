import { GLTF } from "three/examples/jsm/loaders/GLTFLoader"

export type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Mesh>
  materials: Record<string, THREE.MeshStandardMaterial>
}