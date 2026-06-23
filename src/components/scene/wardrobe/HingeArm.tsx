import * as THREE from "three"
import { useGLTF } from "@react-three/drei"
import { ThreeElements } from "@react-three/fiber"

function HingeArm(props: ThreeElements["group"]) {
	const { nodes } = useGLTF("/models/hinge-arm.glb")

	const handleMesh = nodes.hingeArm as THREE.Mesh

	if (!handleMesh) return null

	return (
		<group {...props} dispose={null}>
			<mesh geometry={handleMesh.geometry} rotation={[Math.PI/2, Math.PI, Math.PI/2]}>
				<meshStandardMaterial
					color='#f7f7f7'
					metalness={0.8}
					roughness={0.1}
				/>
			</mesh>
		</group>
	)
}

useGLTF.preload("/models/hinge-arm.glb")

export default HingeArm
