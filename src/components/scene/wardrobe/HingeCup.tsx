import * as THREE from "three"
import React from "react"
import { useGLTF } from "@react-three/drei"
import { ThreeElements } from "@react-three/fiber"
import { toMeters } from '@/helpers/unitConverter'

function HingeCup(props: ThreeElements["group"]) {
	const { nodes } = useGLTF("/models/hinge-cup.glb")

	const handleMesh = nodes.hingeCup as THREE.Mesh

	if (!handleMesh) return null

	return (
		<group {...props} dispose={null}>
			<mesh geometry={handleMesh.geometry}  >
				<meshStandardMaterial
					color='#f7f7f7'
					metalness={0.7}
					roughness={0.1}
				/>
			</mesh>
		</group>
	)
}

useGLTF.preload("/models/handle-cup.glb")

export default HingeCup
