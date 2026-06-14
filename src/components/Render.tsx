"use client"

import type { RenderProps, ViewportButtonProps } from "@/types/RenderProps"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, ContactShadows } from "@react-three/drei"

import DimensionLabel from "./scene/DimensionLabel"
import Floor from "./scene/Floor"
import HumanScale from "./scene/HumanScale"
import ViewportControls from "./ui/ViewportControls"
import Door from "@/components/scene/wardrobe/Door"

import WardrobeHitbox from "./scene/wardrobe/WardrobeHitbox"
import WardrobeCase from "@/components/scene/wardrobe/WardrobeCase"
import WardrobeInterior from "@/components/scene/wardrobe/WardrobeInterior"


import * as THREE from "three"
import { toMeters } from "../helpers/unitConverter"

const Render = ({
	wardrobe,
	activeSegmentIdx,
	setActiveSegmentIdx,
	onUpdate,
	onToggleUpdate,
	onToggleGender,
	dimensions,
	humanScale,
	gender,
	doorsOpen,
	floor,
	doorRotation,
	onToggleDoors,
}: RenderProps & ViewportButtonProps) => {
	return (
		<>
			<ViewportControls
				dimensions={dimensions}
				humanScale={humanScale}
				gender={gender}
				doorsOpen={doorsOpen}
				doorRotation={doorRotation}
				floor={floor}
				onToggleUpdate={onToggleUpdate}
				onToggleGender={onToggleGender}
				onToggleDoors={onToggleDoors}
			/>
			<Canvas
				shadows={{ type: THREE.PCFShadowMap }}
				camera={{ position: [3, 3, 3] }}
				onPointerMissed={() => {
					setActiveSegmentIdx(null)
				}}>
				<group name='scene'>
					<ambientLight intensity={0.3} />
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
						target={[0, toMeters(wardrobe.height / 2), 0]}
						enablePan={false}
						maxPolarAngle={Math.PI / 2}
						minDistance={1}
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
								max={3600}
								name='width'
								position={[0, 0, toMeters(wardrobe.depth / 2) + 0.3]}
								value={wardrobe.width}
								linePositionStart={[
									toMeters(-wardrobe.width / 2),
									0,
									toMeters(wardrobe.depth / 2) + 0.3,
								]}
								linePositionEnd={[
									toMeters(wardrobe.width / 2),
									0,
									toMeters(wardrobe.depth / 2) + 0.3,
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
									toMeters(wardrobe.width) / 2 + 0.3,
									toMeters(wardrobe.height) / 2,
									0,
								]}
								value={wardrobe.height}
								linePositionStart={[toMeters(wardrobe.width) / 2 + 0.3, 0, 0]}
								linePositionEnd={[
									toMeters(wardrobe.width) / 2 + 0.3,
									toMeters(wardrobe.height),
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
								position={[toMeters(-wardrobe.width) / 2 - 0.3, 0, 0]}
								value={wardrobe.depth}
								linePositionStart={[
									toMeters(-wardrobe.width) / 2 - 0.3,
									0,
									toMeters(wardrobe.depth) / 2,
								]}
								linePositionEnd={[
									toMeters(-wardrobe.width) / 2 - 0.3,
									0,
									toMeters(-wardrobe.depth) / 2,
								]}
								label='D'
								axis='x'
								onUpdate={onUpdate}
							/>
						</group>
					)}
				</group>
				<group name='wardrobe'>
					<WardrobeCase
						width={wardrobe.width}
						height={wardrobe.height}
						depth={wardrobe.depth}
						boardThickness={wardrobe.boardThickness}
						backBoardThickness={wardrobe.backBoardThickness}
					/>
					<WardrobeInterior
						width={wardrobe.width}
						height={wardrobe.height}
						depth={wardrobe.depth}
						boardThickness={wardrobe.boardThickness}
						backBoardThickness={wardrobe.backBoardThickness}
						segments={wardrobe.segments}
					/>
					<WardrobeHitbox
						wardrobe={wardrobe}
						activeSegmentIdx={activeSegmentIdx}
						setActiveSegmentIdx={setActiveSegmentIdx}
					/>

					<Door
						width={wardrobe.width}
						height={wardrobe.height}
						depth={wardrobe.depth}
						boardThickness={wardrobe.boardThickness}
						doorRotation={doorRotation}
						isOpen={doorsOpen}
					/>
				</group>
			</Canvas>
		</>
	)
}

export default Render
