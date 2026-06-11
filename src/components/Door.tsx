"use client"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { MathUtils, Group } from "three"
import Board from "@/components/Board"
import { DoorProps } from "@/types/WardrobeProps"
import { toMeters } from "@/helpers/unitConverter"
import CurrentDoorHandle from "@/components/CurrentDoorHandle"

const Door = ({
	width,
	height,
	depth,
	boardThickness,
	isOpen,
}: DoorProps) => {
	const hingeRef = useRef<Group>(null)

	const targetRotation = isOpen ? -Math.PI / 2 : 0

	useFrame(() => {
		if (hingeRef.current) {
			hingeRef.current.rotation.y = MathUtils.lerp(
				hingeRef.current.rotation.y,
				targetRotation,
				0.1
			)
		}
	})

	return (
		<group
			ref={hingeRef}
			position={[toMeters(-width / 2), 0, toMeters(depth / 2)]}>
			<CurrentDoorHandle
				position={[
					toMeters(width-boardThickness/2),
					toMeters(height / 2),
					toMeters(boardThickness+boardThickness/2),
				]}
				rotation={[0, -Math.PI / 2, 0]}
				
			/>
			
			<Board
				name='door'
				w={width}
				h={height}
				d={boardThickness}
				x={width / 2}
				y={height / 2}
				z={boardThickness / 2}
				rotation={[0, 0, 0]}
			/>
		</group>
	)
}

export default Door
