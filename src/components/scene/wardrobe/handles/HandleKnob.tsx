import * as THREE from "three"
import React from "react"
import { useGLTF } from "@react-three/drei"
import { ThreeElements } from "@react-three/fiber"

function HandleKnob(props: ThreeElements["group"]) {
	const { nodes } = useGLTF("/models/handle-knob.glb")

	const handleMesh = nodes.Cylinder as THREE.Mesh

	if (!handleMesh) return null

	return (
		<group {...props} dispose={null}>
			<mesh geometry={handleMesh.geometry}>
				<meshStandardMaterial
					color='#f7f7f7'
					metalness={0.8}
					roughness={0.1}
				/>
			</mesh>
		</group>
	)
}

useGLTF.preload("/models/handle-knob.glb")

export default HandleKnob
