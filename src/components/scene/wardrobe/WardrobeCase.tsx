"use client"

import Board from "@/components/scene/wardrobe/Board"
import type { WardrobeDimensions } from "@/types/WardrobeProps"

const WardrobeCase = ({
    width,
    height,
    depth,
    boardThickness,
    backBoardThickness,
}: WardrobeDimensions) => {
    const halfThickness = boardThickness / 2
    const innerHeight = height - 2 * boardThickness
    const sideX = width / 2 - halfThickness
    const centerY = height / 2

    return (
        <group position={[0, 0.001, 0]}>
            <Board
                name='wardrobe-bottom'
                w={width}
                h={boardThickness}
                d={depth}
                x={0}
                y={halfThickness}
                z={0}
                rotation={[0, 0, 0]}
            />

            <Board
                name='wardrobe-top'
                w={width}
                h={boardThickness}
                d={depth}
                x={0}
                y={height - halfThickness}
                z={0}
                rotation={[0, 0, 0]}
            />

            <Board
                name='wardrobe-side-left'
                w={boardThickness}
                h={innerHeight}
                d={depth}
                x={sideX}
                y={centerY}
                z={0}
                rotation={[0, 0, 0]}
            />

            <Board
                name='wardrobe-side-right'
                w={boardThickness}
                h={innerHeight}
                d={depth}
                x={-sideX}
                y={centerY}
                z={0}
                rotation={[0, 0, 0]}
            />

            <Board
                name='wardrobe-back'
                w={width - 2 * boardThickness}
                h={innerHeight}
                d={backBoardThickness}
                x={0}
                y={centerY}
                z={-(depth / 2) + backBoardThickness}
                rotation={[0, 0, 0]}
            />
        </group>
    )
}

export default WardrobeCase