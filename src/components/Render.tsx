'use client';

import type { RenderProps } from "@/types/RenderProps"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, ContactShadows } from "@react-three/drei"
import Board from "./Board"
import DimensionLabel from "./DimensionLabel"
import * as THREE from "three"
import { toMeters } from '../helpers/unitConverter'

const Render = ({ wardrobe }: RenderProps) => {

	// const dimensionsMeters = {
	// 	width: toMeters(wardrobe.width),
	// 	height: toMeters(wardrobe.height),
	// 	depth: toMeters(wardrobe.depth),
	// 	thickness: toMeters(wardrobe.boardThickness)
	// }

	return (
		<Canvas shadows camera={{ position: [3, 3, 3] }}>
			<ambientLight intensity={0.3} />
			<directionalLight
				position={[1, 3, 4]}
				shadow-mapSize={[2048, 2048]}
				intensity={1}
				castShadow
				shadow-radius={5}
				shadow-camera-left={-1.5}
				shadow-camera-right={1.5}
				shadow-camera-top={2.5}
				shadow-camera-bottom={-0.5}
			/>
			<hemisphereLight intensity={0.5} color='#ffffff' groundColor='#b97a20' />

			<mesh
				scale={[10, 10, 1]}
				position={[0, -0.001, 0]}
				rotation={[-Math.PI / 2, 0, 0]}
				receiveShadow>
				<planeGeometry />
				<meshStandardMaterial color='#E8CEA0' side={THREE.DoubleSide} />
			</mesh>

			<group position={[0, 0.001, 0]}>
				<Board
					name='wardrobe-bottom'
					w={wardrobe.width}
					h={wardrobe.boardThickness}
					d={wardrobe.depth}
					x={0}
					y={wardrobe.boardThickness / 2}
					z={0}
					rotation={[0, 0, 0]}
				/>

				<Board
					name='wardrobe-top'
					w={wardrobe.width}
					h={wardrobe.boardThickness}
					d={wardrobe.depth}
					x={0}
					y={wardrobe.height - wardrobe.boardThickness / 2}
					z={0}
					rotation={[0, 0, 0]}
				/>

				<Board
					name='wardrobe-side-left'
					w={wardrobe.boardThickness}
					h={wardrobe.height - 2 * wardrobe.boardThickness}
					d={wardrobe.depth}
					x={wardrobe.width / 2 - wardrobe.boardThickness / 2}
					y={wardrobe.height / 2}
					z={0}
					rotation={[0, 0, 0]}
				/>

				<Board
					name='wardrobe-side-right'
					w={wardrobe.boardThickness}
					h={wardrobe.height - 2 * wardrobe.boardThickness}
					d={wardrobe.depth}
					x={-(wardrobe.width / 2 - wardrobe.boardThickness / 2)}
					y={wardrobe.height / 2}
					z={0}
					rotation={[0, 0, 0]}
				/>

				<Board
					name='wardrobe-back'
					w={wardrobe.width-2*wardrobe.boardThickness}
					h={wardrobe.height}
					d={wardrobe.backBoardThickness}
					x={0}
					y={wardrobe.height / 2}
					z={-(wardrobe.depth / 2) + wardrobe.backBoardThickness}
					rotation={[0, 0, 0]}
				/>

				{wardrobe.shelves.map((id, idx) => {
					const availableHeight = wardrobe.height - 2 * wardrobe.boardThickness
					const spacing = availableHeight / (wardrobe.shelves.length + 1)
					const currentY = wardrobe.boardThickness + spacing * (idx + 1)

					return (
						<Board
							key={id}
							name={`shelf-${id}`}
							w={wardrobe.width - 2 * wardrobe.boardThickness}
							h={wardrobe.boardThickness}
							d={wardrobe.depth-wardrobe.boardThickness-10}
							x={0}
							y={currentY}
							z={0}
							rotation={[0, 0, 0]}
						/>
					)
				})}
			</group>

			<group>
   
    <DimensionLabel 
      position={[0, 0, toMeters(wardrobe.depth/2)+0.3]} 
      value={wardrobe.width} 
	  linePositionStart={[toMeters(-wardrobe.width/2),0,toMeters(wardrobe.depth/2)+0.3]}
	  linePositionEnd={[toMeters(wardrobe.width/2),0,toMeters(wardrobe.depth/2)+0.3]}
      label="W" 
    />

    <DimensionLabel 
      position={[toMeters(wardrobe.width) / 2 + 0.3, toMeters(wardrobe.height)/2, 0]} 
      value={wardrobe.height}
	  linePositionStart={[0,0,0]}
	  linePositionEnd={[1,0,0]}
      label="H" 
    />
    <DimensionLabel 
      position={[toMeters(wardrobe.width) / 2 + 0.3, 0, toMeters(wardrobe.depth)/2 -0.3]} 
      value={wardrobe.depth} 
	  linePositionStart={[0,0,0]}
	  linePositionEnd={[1,0,0]}
      label="D" 
    />
  </group>

			<ContactShadows
				position={[0, -0.0005, 0]}
				opacity={1}
				scale={12}
				blur={0.5}
				far={0.2}
				resolution={512}
			/>

			<OrbitControls
				target={[0, toMeters(wardrobe.height/2), 0]} 
				enablePan={false}
				maxPolarAngle={Math.PI / 2} 
				minDistance={1} 
				maxDistance={10}
			/>
		</Canvas>
	)
}

export default Render
