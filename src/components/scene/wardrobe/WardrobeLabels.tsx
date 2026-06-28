"use client"

import DimensionLabel from "../environment/DimensionLabel"
import { toMeters } from "@/helpers/unitConverter"
import { useWardrobeStore } from "@/store/useWardrobeStore"

const WardrobeLabels = () => {
	const wardrobe = useWardrobeStore((state) => state.wardrobe)
    const handleUpdateDimension = useWardrobeStore((state) => state.updateDimension)
    return(
<group name='dimensions'>
							<DimensionLabel
								min={500}
								max={2400}
								name='width'
								position={[0, 0, toMeters(wardrobe.dimensions.depth / 2) + 0.3]}
								value={wardrobe.dimensions.width}
								linePositionStart={[
									toMeters(-wardrobe.dimensions.width / 2),
									0,
									toMeters(wardrobe.dimensions.depth / 2) + 0.3,
								]}
								linePositionEnd={[
									toMeters(wardrobe.dimensions.width / 2),
									0,
									toMeters(wardrobe.dimensions.depth / 2) + 0.3,
								]}
								label='W'
								axis='z'
								onUpdate={handleUpdateDimension}
							/>
							<DimensionLabel
								min={1800}
								max={2700}
								name='height'
								position={[
									toMeters(wardrobe.dimensions.width) / 2 + 0.3,
									toMeters(wardrobe.dimensions.height) / 2,
									0,
								]}
								value={wardrobe.dimensions.height}
								linePositionStart={[toMeters(wardrobe.dimensions.width) / 2 + 0.3, 0, 0]}
								linePositionEnd={[
									toMeters(wardrobe.dimensions.width) / 2 + 0.3,
									toMeters(wardrobe.dimensions.height),
									0,
								]}
								label='H'
								axis='x'
								onUpdate={handleUpdateDimension}
							/>
							<DimensionLabel
								min={450}
								max={700}
								name='depth'
								position={[toMeters(-wardrobe.dimensions.width) / 2 - 0.3, 0, 0]}
								value={wardrobe.dimensions.depth}
								linePositionStart={[
									toMeters(-wardrobe.dimensions.width) / 2 - 0.3,
									0,
									toMeters(wardrobe.dimensions.depth) / 2,
								]}
								linePositionEnd={[
									toMeters(-wardrobe.dimensions.width) / 2 - 0.3,
									0,
									toMeters(-wardrobe.dimensions.depth) / 2,
								]}
								label='D'
								axis='x'
								onUpdate={handleUpdateDimension}
							/>
						</group>)}

export default WardrobeLabels