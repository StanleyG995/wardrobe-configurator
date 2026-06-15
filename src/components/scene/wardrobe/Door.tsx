"use client"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { MathUtils, Group } from "three"
import Board from "@/components/scene/wardrobe/Board"
import { DoorProps } from "@/types/WardrobeProps"
import { toMeters } from "@/helpers/unitConverter"
import DoorHandle from "@/components/scene/wardrobe/DoorHandle"

const Door = ({
	width,
	height,
	depth,
	boardThickness,
	isOpen,
	hingeSide,
	handleSide,
}: DoorProps) => {
	const hingeRef = useRef<Group>(null)

	const targetRotation = isOpen ? Math.PI / 2.1 : 0
	const hingePos: [number, number, number] = hingeSide === 'left' ? [toMeters(-width / 2), 0, toMeters(depth / 2)] : [toMeters(width / 2), 0, toMeters(depth / 2)]
	const handlePos: [number, number, number] = handleSide === 'left' ? [toMeters(width-100), toMeters(height / 2), toMeters(3*boardThickness),] : [toMeters(-width+100), toMeters(height / 2), toMeters(3*boardThickness),]
	const targetHingePositionX = isOpen ? toMeters(12+boardThickness) : 0
	const targetHingePositionZ = isOpen ? toMeters(6) : 0

	useFrame(() => {
		if (hingeRef.current) {
			hingeRef.current.rotation.y = MathUtils.lerp(
				hingeRef.current.rotation.y,
				hingeSide === 'left' ? -targetRotation : targetRotation,
				0.1
			)
			hingeRef.current.position.x = MathUtils.lerp(
				hingeRef.current.position.x,
				hingeSide === 'left' ? hingePos[0]+targetHingePositionX : hingePos[0]-targetHingePositionX,
				0.1
			)
			hingeRef.current.position.z = MathUtils.lerp(
				hingeRef.current.position.z,
				hingePos[2]+targetHingePositionZ,
				0.1
			)
		}
	})
	
	return (
		<group
			ref={hingeRef}
			position={hingePos}>
			<DoorHandle
				position={handlePos}
				scale={[1,0.6,0.7]}
				rotation={[0, -Math.PI / 2, 0]}
				
			/>
			
			<Board
				name='door'
				w={width}
				h={height}
				d={boardThickness}
				x={hingeSide === 'left' ? width / 2 : -width / 2}
				y={height / 2}
				z={boardThickness / 2}
				rotation={[0, 0, 0]}
			/>
		</group>
	)
}

export default Door
