"use client"
import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { MathUtils, Group } from "three"
import Board from "@/components/scene/wardrobe/Board"
import { DoorProps } from "@/types/WardrobeProps"
import { toMeters } from "@/helpers/unitConverter"
import DoorHandle from "@/components/scene/wardrobe/DoorHandle"
import HingeCup from "@/components/scene/wardrobe/HingeCup"
import HingeArm from "@/components/scene/wardrobe/HingeArm"

const Door = ({
	width,
	height,
	depth,
	boardThickness,
	isOpen,
	hingeSide,
	handleSide,
	topOffset
}: DoorProps) => {
	const hingeCupRef = useRef<Group>(null)
	const targetRotation = isOpen ? Math.PI / 2.09 : 0
	const hingePos: [number, number, number] = hingeSide === 'left' ? [toMeters(-width / 2), toMeters(height/2+topOffset), toMeters(depth / 2)] : [toMeters(width / 2), toMeters(height/2+topOffset), toMeters(depth / 2)]
	const handlePos: [number, number, number] = handleSide === 'left' ? [toMeters(width-50), 0, toMeters(boardThickness+12),] : [toMeters(-width+50), 0, toMeters(boardThickness+12),]
	const hingeArmPos: [number, number, number] = hingeSide === 'left' ? [toMeters(-width/2 + boardThickness+boardThickness/3), toMeters(height/2+topOffset), toMeters(depth)] : [toMeters(width/2 - boardThickness-boardThickness/3), toMeters(height/2+topOffset), toMeters(depth)]

	const hingeArmOffset=18
	
	const targetHingePositionX = isOpen ? toMeters(boardThickness) : 0
	const targetHingePositionZ = isOpen ? toMeters(6) : 0

	const hingeZPos: number = handleSide === 'left' ? toMeters(26) : toMeters(-26)

	const getHingePositionsY = (height: number): number[] => {
		const edgeOffset = 100;
		
		let count = 2;
		if (height >= 1000 && height < 1600) count = 3;
		else if (height >= 1600 && height < 2100) count = 4;
		else if (height >= 2100) count = 5;

		const positions: number[] = [];
		
		if (count === 2) {
			return [edgeOffset, height - edgeOffset];
		}

		const availableSpace = height - (edgeOffset * 2);
		const step = availableSpace / (count - 1);

		for (let i = 0; i < count; i++) {
			positions.push(edgeOffset + (i * step));
		}

		return positions;
	};

const hingePositionsY = useMemo(() => getHingePositionsY(height), [height])

	useFrame(() => {
		if (hingeCupRef.current) {
			hingeCupRef.current.rotation.y = MathUtils.lerp(
				hingeCupRef.current.rotation.y,
				hingeSide === 'left' ? -targetRotation : targetRotation,
				0.03
			)
			hingeCupRef.current.position.x = MathUtils.lerp(
				hingeCupRef.current.position.x,
				hingeSide === 'left' ? hingePos[0]+targetHingePositionX : hingePos[0]-targetHingePositionX,
				0.03
			)
			hingeCupRef.current.position.z = MathUtils.lerp(
				hingeCupRef.current.position.z,
				hingePos[2]+targetHingePositionZ,
				0.03
			)
		}
	})
	
	return (
		<group>
			<group position={hingeArmPos}>
			{hingePositionsY.map((yPosition, index) => {
                return (
                    <HingeArm
                        key={`arm-${index}`}
                        position={hingeSide === 'left' ? [0, toMeters(yPosition-height/2), -toMeters(depth/2+hingeArmOffset)] : [0, toMeters(yPosition-height/2), -toMeters(depth/2+hingeArmOffset)]}
                        scale={hingeSide === 'left' ? [1, 1, 1] : [-1, 1, 1]}
                    />
                )
            })}
			</group>
			<group
				ref={hingeCupRef}
				position={hingePos}>
				<DoorHandle
					position={handlePos}
					rotation={[0, -Math.PI / 2, 0]}
				/>
				{hingePositionsY.map((yPosition, index) => (
					<group key={index}>
					<HingeCup 
					position={[hingeZPos, toMeters(yPosition-height/2), toMeters(-3)]} 
					scale={hingeSide === 'left' ? [1, 1, 1] : [-1, 1, 1]}
					rotation={[Math.PI/2,0,0]}
			/>
			
			</group>
		))}
				
				<Board
					name='door'
					w={width}
					h={height}
					d={boardThickness}
					x={hingeSide === 'left' ? width / 2 : -width / 2}
					y={0}
					z={boardThickness / 2}
					rotation={[0, 0, 0]}
				/>
			</group>
		</group>
	)
}

export default Door
