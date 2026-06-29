import * as THREE from "three"
import React from "react"
import { useGLTF } from "@react-three/drei"
import { ThreeElements } from "@react-three/fiber"

function HandleStraight(props: ThreeElements["group"]) {
	const { nodes } = useGLTF("/models/handle-straight.glb")

	const handleMesh = nodes.Cube as THREE.Mesh

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

useGLTF.preload("/models/handle-straight.glb")

export default HandleStraight
