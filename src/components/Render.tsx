"use client"

import type { RenderProps, ViewportButtonProps } from "@/types/RenderProps"
import { Canvas } from "@react-three/fiber"

import { OrbitControls, ContactShadows, Environment } from "@react-three/drei"

import DimensionLabel from "./scene/environment/DimensionLabel"
import Floor from "./scene/environment/Floor"
import HumanScale from "./scene/environment/HumanScale"
import ViewportControls from "./ui/ViewportControls"

import WardrobeHitbox from "./scene/wardrobe/WardrobeHitbox"
import WardrobeCase from "@/components/scene/wardrobe/WardrobeCase"
import WardrobeInterior from "@/components/scene/wardrobe/WardrobeInterior"
import WardrobeDoors from "@/components/scene/wardrobe/WardrobeDoors"


import * as THREE from "three"
import { toMeters } from "../helpers/unitConverter"

import { useWardrobeStore } from "@/store/useWardrobeStore"

const Render = ({
	activeSegmentIdx,
	setActiveSegmentIdx,
	onUpdate,
	dimensions,
	humanScale,
	gender,
	doorsOpen,
	floor,
	
}: Omit<RenderProps & ViewportButtonProps, 'wardrobe'>) => {

	const wardrobe = useWardrobeStore((state) => state.wardrobe)
	

	return (
		<>
			<ViewportControls/>
			<Canvas
				shadows={{ type: THREE.PCFShadowMap }}
				camera={{ position: [0, 1, 2] }}
				onPointerMissed={() => {
					setActiveSegmentIdx(null)
				}}>
					<Environment preset="studio" environmentIntensity={0.06} />
				<group name='scene'>
					<ambientLight intensity={0.2} />
					<directionalLight
						position={[2, 6, 6]}
						shadow-mapSize={[2048, 2048]}
						intensity={1}
						castShadow
						shadow-radius={5}
						shadow-camera-left={-4}
						shadow-camera-right={4}
						shadow-camera-top={4}
						shadow-camera-bottom={-1}
						shadow-camera-near={0.1}
						shadow-camera-far={20}
						shadow-bias={-0.0005}
					/>
					<hemisphereLight
						intensity={0.5}
						color='#ffffff'
						groundColor='#b97a20'
					/>
					<ContactShadows
						position={[0, -0.0005, 0]}
						opacity={1}
						scale={12}
						blur={0.5}
						far={0.2}
						resolution={512}
					/>
					<OrbitControls
						target={[0, 1, 0]}
						maxPolarAngle={Math.PI / 1.8}
						minDistance={0.5}
						maxDistance={10}
					/>
				</group>
				<group name='viewport'>
					{floor && <Floor />}
					{humanScale && <HumanScale gender={gender} dimensions={dimensions} />}
					{dimensions && (
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
								onUpdate={onUpdate}
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
								onUpdate={onUpdate}
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
								onUpdate={onUpdate}
							/>
						</group>
					)}
				</group>
				<group name='wardrobe'>
					<WardrobeCase/>
					<WardrobeInterior/>
					<WardrobeHitbox/>
					<WardrobeDoors
						width={wardrobe.dimensions.width}
						height={wardrobe.dimensions.height}
						depth={wardrobe.dimensions.depth}
						boardThickness={wardrobe.boardThickness}
						isOpen={doorsOpen}
						segments={wardrobe.segments}
						backBoardThickness={wardrobe.backBoardThickness}
					/>
				</group>
			</Canvas>
		</>
	)
}

export default Render
