import type { WardrobeProps } from '../types/WardrobeProps'

import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import Board from './Board'

const Render = ( { wardrobeWidth, wardrobeDepth, wardrobeHeight, boardThickness, backBoardThickness, shelves }: WardrobeProps ) => {
    
    return (
        <Canvas camera={{ position: [200, 200, 200] }}>
				<ambientLight intensity={3} />

				<Board
					name='wardrobe-bottom'
					scale={[wardrobeWidth, boardThickness, wardrobeDepth]}
					rotation={[0, 0, 0]}
					position={[0, boardThickness / 2, 0]}
					color='red'
				/>

				<Board
					name='wardrobe-top'
					scale={[wardrobeWidth, boardThickness, wardrobeDepth]}
					rotation={[0, 0, 0]}
					position={[0, wardrobeHeight - boardThickness / 2, 0]}
					color='green'
				/>

				<Board
					name='wardrobe-side-left'
					scale={[
						boardThickness,
						wardrobeHeight - 2 * boardThickness,
						wardrobeDepth,
					]}
					rotation={[0, 0, 0]}
					position={[
						wardrobeWidth / 2 - boardThickness / 2,
						wardrobeHeight / 2,
						0,
					]}
					color='blue'
				/>

				<Board
					name='wardrobe-side-right'
					scale={[
						boardThickness,
						wardrobeHeight - 2 * boardThickness,
						wardrobeDepth,
					]}
					rotation={[0, 0, 0]}
					position={[
						-(wardrobeWidth / 2 - boardThickness / 2),
						wardrobeHeight / 2,
						0,
					]}
					color='blue'
				/>

				<Board
					name='wardrobe-back'
					scale={[wardrobeWidth, wardrobeHeight, backBoardThickness]}
					rotation={[0, 0, 0]}
					position={[
						0,
						wardrobeHeight / 2,
						-(wardrobeDepth / 2) + backBoardThickness / 2,
					]}
					color='orange'
				/>
                
				{/* {shelves.map((id, idx) => {
					const availableHeight = wardrobeHeight - 2 * boardThickness
					const spacing = availableHeight / (shelves.length + 1)
					const currentY = boardThickness + spacing * (idx + 1)

					return (
						<Board
							key={id}
							name={`shelf-${id}`}
							scale={[
								wardrobeWidth - 2 * boardThickness,
								boardThickness,
								wardrobeDepth,
							]}
							rotation={[0, 0, 0]}
							position={[0, currentY, 0]}
							color='purple'
						/>
					)
				})} */}

				<OrbitControls />
				<gridHelper args={[1000, 100, "#999999", "#cccccc"]} />
			</Canvas>
    )
}

export default Render