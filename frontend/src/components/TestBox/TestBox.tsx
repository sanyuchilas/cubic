import { ThreeElements, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { Mesh, Quaternion } from 'three';

const TestBox = (props: ThreeElements['mesh']) => {
	const ref = useRef<Mesh>(null!)

	const [hovered, hover] = useState(false)
	const [clicked, click] = useState(false)
	
	const angle = Math.PI / 1000

	// function hyperCube(ref) {

	// }

	// useFrame((state, delta) => {
	// 	console.log(state)
	// 	ref.current.quaternion.z += angle
	// 	ref.current.quaternion.y += angle
	// 	ref.current.quaternion.x += angle
	// 	ref.current.quaternion.w += angle
	// })

	return (
		<mesh
			{...props}
			ref={ref}
			quaternion={new Quaternion(0, 0, 0, 0)}
			// rotation={new Euler(angle, angle, angle)}
			scale={clicked ? 1.5 : 1}
			onClick={(event) => click(!clicked)}
			onPointerOver={(event) => hover(true)}
			onPointerOut={(event) => hover(false)}
		>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={hovered ? '#00ee11' : '#ff0055'} />
		</mesh>
	)
};

export default TestBox;