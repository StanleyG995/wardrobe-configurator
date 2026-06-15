"use client"

import Door from "@/components/scene/wardrobe/Door"
import { toMeters } from "@/helpers/unitConverter"
import { WardrobeData } from "@/types/WardrobeProps"

interface WardrobeDoorsProps extends WardrobeData {
	isOpen: boolean
}

const WardrobeDoors = ({
	width,
	height,
	depth,
	boardThickness,
	segments,
	isOpen,
}: WardrobeDoorsProps) => {
	const segmentCount = segments.length > 0 ? segments.length : 1
	const compartmentWidth = width / segmentCount

	return (
		<>
			{segments.map((segment, idx) => {
				const startX = -width / 2
				const segmentX =
					startX +
					idx * (compartmentWidth) +
					compartmentWidth / 2

				const useTwoDoors = compartmentWidth >= 650
				const localDoorCount = useTwoDoors ? 2 : 1
				const singleDoorWidth = compartmentWidth / localDoorCount

				return (
					<group
						key={`segment-doors-${segment.id}`}
						position={[toMeters(segmentX), 0, 0]}>
						{Array.from({ length: localDoorCount }).map((_, doorIdx) => {
							const localStartX = -compartmentWidth / 2
							const doorLocalX =
								localStartX + doorIdx * singleDoorWidth + singleDoorWidth / 2

							const isLeftHinge = localDoorCount === 1 ? true : doorIdx === 0
							const hingeSide = isLeftHinge ? "left" : "right"
							const handleSide = isLeftHinge ? "left" : "right"

							return (
								<group
									key={`door-${segment.id}-${doorIdx}`}
									position={[toMeters(doorLocalX), 0, 0]}>
									<Door
										width={singleDoorWidth}
										height={height}
										depth={depth}
										boardThickness={boardThickness}
										isOpen={isOpen}
										hingeSide={hingeSide}
										handleSide={handleSide}
									/>
								</group>
							)
						})}
					</group>
				)
			})}
		</>
	)
}

export default WardrobeDoors
