import type { WardrobeProps } from '../types/WardrobeProps'

import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import Board from './Board'

const Render = ( { wardrobe }: WardrobeProps ) => {
    
    return (
        <Canvas camera={{ position: [200, 200, 200] }}>
				<ambientLight intensity={3} />

				<Board
					name='wardrobe-bottom'
					scale={[wardrobe.width, wardrobe.boardThickness, wardrobe.depth]}
					rotation={[0, 0, 0]}
					position={[0, wardrobe.boardThickness / 2, 0]}
					color='red'
				/>

				<Board
					name='wardrobe-top'
					scale={[wardrobe.width, wardrobe.boardThickness, wardrobe.depth]}
					rotation={[0, 0, 0]}
					position={[0, wardrobe.height - wardrobe.boardThickness / 2, 0]}
					color='green'
				/>

				<Board
					name='wardrobe-side-left'
					scale={[
						wardrobe.boardThickness,
						wardrobe.height - 2 * wardrobe.boardThickness,
						wardrobe.depth,
					]}
					rotation={[0, 0, 0]}
					position={[
						wardrobe.width / 2 - wardrobe.boardThickness / 2,
						wardrobe.height / 2,
						0,
					]}
					color='blue'
				/>

				<Board
					name='wardrobe-side-right'
					scale={[
						wardrobe.boardThickness,
						wardrobe.height - 2 * wardrobe.boardThickness,
						wardrobe.depth,
					]}
					rotation={[0, 0, 0]}
					position={[
						-(wardrobe.width / 2 - wardrobe.boardThickness / 2),
						wardrobe.height / 2,
						0,
					]}
					color='blue'
				/>

				<Board
					name='wardrobe-back'
					scale={[wardrobe.width, wardrobe.height, wardrobe.backBoardThickness]}
					rotation={[0, 0, 0]}
					position={[
						0,
						wardrobe.height / 2,
						-(wardrobe.depth / 2) + wardrobe.backBoardThickness / 2,
					]}
					color='orange'
				/>
                
				{wardrobe.shelves.map((id, idx) => {
					const availableHeight = wardrobe.height - 2 * wardrobe.boardThickness
					const spacing = availableHeight / (wardrobe.shelves.length + 1)
					const currentY = wardrobe.boardThickness + spacing * (idx + 1)

					return (
						<Board
							key={id}
							name={`shelf-${id}`}
							scale={[
								wardrobe.width - 2 * wardrobe.boardThickness,
								wardrobe.boardThickness,
								wardrobe.depth,
							]}
							rotation={[0, 0, 0]}
							position={[0, currentY, 0]}
							color='purple'
						/>
					)
				})}

				<OrbitControls />
				<gridHelper args={[1000, 100, "#999999", "#cccccc"]} />
			</Canvas>
    )
}

export default Render