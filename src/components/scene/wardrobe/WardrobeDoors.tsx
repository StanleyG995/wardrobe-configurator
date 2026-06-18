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

				return (
					<group
						key={`segment-doors-${segment.id}`}
						position={[toMeters(segmentX), 0, 0]}>
							<Door
								width={compartmentWidth}
								height={height}
								depth={depth}
								boardThickness={boardThickness}
								isOpen={isOpen}
								hingeSide={'left'}
								handleSide={'left'}
							/>
					</group>
				)
			})}
		</>
	)
}

export default WardrobeDoors
