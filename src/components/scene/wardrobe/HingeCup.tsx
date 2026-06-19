import * as THREE from "three"
import React from "react"
import { useGLTF } from "@react-three/drei"
import { ThreeElements } from "@react-three/fiber"

function HingeCup(props: ThreeElements["group"]) {
	const { nodes } = useGLTF("/models/hinge-cup.glb")

	const handleMesh = nodes.hingeCup as THREE.Mesh

	if (!handleMesh) return null

	return (
		<group {...props} dispose={null}>
			<mesh geometry={handleMesh.geometry} position={[0.015,1,0.28]} rotation={[Math.PI/2,0,-Math.PI/2]}>
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
