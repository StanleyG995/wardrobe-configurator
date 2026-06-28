"use client"

import { Canvas } from "@react-three/fiber"

import { OrbitControls, ContactShadows, Environment } from "@react-three/drei"

import WardrobeLabels from "./scene/wardrobe/WardrobeLabels"
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

const Render = () => {

	const wardrobe = useWardrobeStore((state) => state.wardrobe)
	const setActiveSegmentIdx = useWardrobeStore((state) => state.setActiveSegmentIdx)
	const { floorVisible, humanScaleVisible, dimensionsVisible } = useWardrobeStore((state) => state.viewportOptions)

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
					{floorVisible && <Floor />}
					{humanScaleVisible && <HumanScale />}
					{dimensionsVisible && <WardrobeLabels />}
				</group>
				<group name='wardrobe'>
					<WardrobeCase/>
					<WardrobeInterior/>
					<WardrobeHitbox/>
					<WardrobeDoors/>
				</group>
			</Canvas>
		</>
	)
}

export default Render
