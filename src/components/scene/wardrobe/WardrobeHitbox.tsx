"use client"

import { useState, useEffect } from "react"
import { toMeters } from "@/helpers/unitConverter"
import type { HitboxProps } from "@/types/WardrobeProps"


function WardrobeHitbox({
	wardrobe,
	activeSegmentIdx,
	setActiveSegmentIdx,
}: HitboxProps) {
	const segments = wardrobe.segments || []
	const segmentCount = segments.length > 0 ? segments.length : 1
	const hasDividers = segmentCount > 1

	const totalInnerWidth =
		wardrobe.width -
		2 * wardrobe.boardThickness -
		(hasDividers ? (segmentCount - 1) * wardrobe.boardThickness : 0)
	const compartmentWidth = totalInnerWidth / segmentCount
	const innerHeight = wardrobe.height - 2 * wardrobe.boardThickness

	const [hovered, setHovered] = useState(false)

	useEffect(() => {
		document.body.style.cursor = hovered ? "pointer" : "auto"
		return () => {
			document.body.style.cursor = "auto"
		}
	}, [hovered])

	return (
		<group
			name='hitboxes'
			onPointerOver={() => setHovered(true)}
			onPointerOut={() => setHovered(false)}>
			{segments.map((segment, idx) => {
				const startX = -wardrobe.width / 2 + wardrobe.boardThickness
				const segmentX =
					startX +
					idx * (compartmentWidth + wardrobe.boardThickness) +
					compartmentWidth / 2

				return (
					<mesh
						key={`hitbox-${segment.id}`}
						position={[
							toMeters(segmentX),
							toMeters(wardrobe.boardThickness + innerHeight / 2),
							0,
						]}
						onClick={e => {
							e.stopPropagation()
							setActiveSegmentIdx(idx)
						}}>
						<boxGeometry
							args={[
								toMeters(compartmentWidth),
								toMeters(innerHeight),
								toMeters(wardrobe.depth),
							]}
						/>
						<meshBasicMaterial
							color='#2b7fff'
							transparent
							opacity={idx === activeSegmentIdx ? 0.4 : 0}
						/>
					</mesh>
				)
			})}
		</group>
	)
}

export default WardrobeHitbox
