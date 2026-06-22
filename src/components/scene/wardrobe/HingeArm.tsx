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
			<mesh geometry={handleMesh.geometry} position={[0.015,0,0.283]} rotation={[Math.PI/2, Math.PI, Math.PI/2]}>
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
