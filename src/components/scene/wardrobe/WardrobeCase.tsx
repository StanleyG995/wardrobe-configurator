import Board from "@/components/scene/wardrobe/Board"
import type { WardrobeDimensions } from "@/types/WardrobeProps"

const WardrobeCase = (wardrobe: WardrobeDimensions) => {

	const boardGap = 0

    return (
        <group position={[0, 0.001, 0]}>
					
					<Board
						name='wardrobe-bottom'
						w={wardrobe.width - boardGap}
						h={wardrobe.boardThickness - boardGap}
						d={wardrobe.depth - boardGap}
						x={0}
						y={wardrobe.boardThickness / 2}
						z={0}
						rotation={[0, 0, 0]}
					/>

					<Board
						name='wardrobe-top'
						w={wardrobe.width - boardGap}
						h={wardrobe.boardThickness - boardGap}
						d={wardrobe.depth - boardGap}
						x={0}
						y={wardrobe.height - wardrobe.boardThickness / 2}
						z={0}
						rotation={[0, 0, 0]}
					/>

					<Board
						name='wardrobe-side-left'
						w={wardrobe.boardThickness - boardGap}
						h={wardrobe.height - 2 * wardrobe.boardThickness - boardGap}
						d={wardrobe.depth - boardGap}
						x={wardrobe.width / 2 - wardrobe.boardThickness / 2}
						y={wardrobe.height / 2}
						z={0}
						rotation={[0, 0, 0]}
					/>

					<Board
						name='wardrobe-side-right'
						w={wardrobe.boardThickness - boardGap}
						h={wardrobe.height - 2 * wardrobe.boardThickness - boardGap}
						d={wardrobe.depth - boardGap}
						x={-(wardrobe.width / 2 - wardrobe.boardThickness / 2)}
						y={wardrobe.height / 2}
						z={0}
						rotation={[0, 0, 0]}
					/>

					<Board
						name='wardrobe-back'
						w={wardrobe.width - 2 * wardrobe.boardThickness - boardGap}
						h={wardrobe.height - 2 * wardrobe.boardThickness - boardGap}
						d={wardrobe.backBoardThickness - boardGap}
						x={0}
						y={wardrobe.height / 2}
						z={-(wardrobe.depth / 2) + wardrobe.backBoardThickness}
						rotation={[0, 0, 0]}
					/>
                </group>
    )
}

export default WardrobeCase