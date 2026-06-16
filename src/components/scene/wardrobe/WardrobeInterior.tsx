import type { WardrobeData } from "@/types/WardrobeProps"
import Board from "@/components/scene/wardrobe/Board"
import { toMeters } from "@/helpers/unitConverter"

const WardrobeInterior = ({
	width,
	height,
	depth,
	boardThickness,
	segments,
}: WardrobeData) => {
	const segmentCount = segments.length > 0 ? segments.length : 1
	const hasDividers = segmentCount > 1
	const totalInnerWidth =
		width -
		2 * boardThickness -
		(hasDividers ? (segmentCount - 1) * boardThickness : 0)
	const compartmentWidth = totalInnerWidth / segmentCount
	return (
		<>
			{hasDividers &&
				Array.from({ length: segmentCount - 1 }).map((_, idx) => {
					const startX = -width / 2 + boardThickness
					const dividerX =
						startX +
						(idx + 1) * compartmentWidth +
						idx * boardThickness +
						boardThickness / 2

					return (
						<Board
							key={`divider-${idx}`}
							name={`wardrobe-divider-${idx}`}
							w={boardThickness}
							h={height - 2 * boardThickness}
							d={depth - boardThickness - 10}
							x={dividerX}
							y={height / 2}
							z={5}
							rotation={[0, 0, 0]}
						/>
					)
				})}

			{segments.map((segment, idx) => {
				const startX = -width / 2 + boardThickness
				const segmentX =
					startX +
					idx * (compartmentWidth + boardThickness) +
					compartmentWidth / 2
				const hangerRodHeight = height < 2000 ? 1600 : 1800
				const minHeightForLoft = 2300
				const hangerRodTopGap = 150


				return (
					<group key={segment.id} position={[toMeters(segmentX), 0, 0]}>
						{(height > 2200) && <Board
							name={`top-shelf-${segment.id}`}
							key={`top-shelf-${segment.id}`}
							w={compartmentWidth}
							h={boardThickness}
							d={depth - boardThickness - 10}
							x={0}
							y={1900}
							z={0}
							rotation = {[0,0,0,]}
						/>}
						{segment.type === "shelves" &&
							segment.shelves.map((shelfId, shelfIdx) => {
								const availableHeight = height - 2 * boardThickness
								const spacing = availableHeight / (segment.shelves.length + 1)
								const currentY = boardThickness + spacing * (shelfIdx + 1)

								return (
									<Board
										key={shelfId}
										name={`shelf-${shelfId}`}
										w={compartmentWidth}
										h={boardThickness}
										d={depth - boardThickness - 10}
										x={0}
										y={currentY}
										z={0}
										rotation={[0, 0, 0]}
									/>
								)
							})}

						{segment.type === "hanger" && (
							<group>
								<mesh
									position={[0, toMeters(hangerRodHeight), 0]}
									rotation={[0, 0, Math.PI / 2]}
									castShadow>
									<cylinderGeometry
										args={[0.0125, 0.0125, toMeters(compartmentWidth), 16]}
									/>
									<meshStandardMaterial
										color='#cccccc'
										metalness={0.8}
										roughness={0.2}
									/>
								</mesh>
								{height > minHeightForLoft && (
									<Board
										key={1}
										name={`shelf-${2}`}
										w={compartmentWidth}
										h={boardThickness}
										d={depth - boardThickness - 10}
										x={0}
										y={hangerRodHeight + hangerRodTopGap}
										z={0}
										rotation={[0, 0, 0]}
									/>
								)}
							</group>
						)}
					</group>
				)
			})}
		</>
	)
}

export default WardrobeInterior
