"use client"

import * as THREE from "three"
import { useTexture } from "@react-three/drei"

const FLOOR_SCALE: [number, number, number] = [10, 10, 1]
const FLOOR_POSITION: [number, number, number] = [0, -0.001, 0]
const FLOOR_ROTATION: [number, number, number] = [-Math.PI / 2, 0, 0]
const TEXTURE_REPEAT: [number, number] = [10, 10]

const Floor = () => {
	const floorTexture = useTexture("/textures/floor.webp", texture => {
		texture.wrapS = THREE.RepeatWrapping
		texture.wrapT = THREE.RepeatWrapping
		texture.repeat.set(...TEXTURE_REPEAT)
		texture.colorSpace = THREE.SRGBColorSpace
	})

	return (
		<mesh
			name='floor'
			scale={FLOOR_SCALE}
			position={FLOOR_POSITION}
			rotation={FLOOR_ROTATION}
			receiveShadow>
			<planeGeometry />
			<meshStandardMaterial map={floorTexture} side={THREE.DoubleSide} />
		</mesh>
	)
}

useTexture.preload("/floor.png")

export default Floor
