import * as THREE from "three"
import React from "react"
import { useGLTF } from "@react-three/drei"
import { ThreeElements } from "@react-three/fiber"
import { toMeters } from '@/helpers/unitConverter'

function HingeArm(props: ThreeElements["group"]) {
	const { nodes } = useGLTF("/models/hinge-arm.glb")

	const handleMesh = nodes.hingeArm as THREE.Mesh

	if (!handleMesh) return null

	return (
		<group {...props} dispose={null}>
			<mesh geometry={handleMesh.geometry} position={[toMeters(20), 0, toMeters(-10)]} rotation={[Math.PI/2, 0, Math.PI]}>
				<meshStandardMaterial
					color='#f7f7f7'
					metalness={0.7}
					roughness={0.1}
				/>
			</mesh>
		</group>
	)
}

useGLTF.preload("/models/hinge-arm.glb")

export default HingeArm
