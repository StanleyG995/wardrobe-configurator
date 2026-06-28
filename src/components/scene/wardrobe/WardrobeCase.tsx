"use client"

import Board from "@/components/scene/wardrobe/Board"
import { useWardrobeStore } from "@/store/useWardrobeStore"

const WardrobeCase = () => {
    const { dimensions: { width, height, depth }, boardThickness, backBoardThickness, caseMaterial } = useWardrobeStore((state) => state.wardrobe)

    const halfThickness = boardThickness / 2
    const innerHeight = height - 2 * boardThickness
    const sideX = width / 2 - halfThickness
    const centerY = height / 2

    const currentCaseMaterial = caseMaterial
    const backBoardMaterial = '/backboard.webp'
    
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
                textureUrl={currentCaseMaterial}
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
                textureUrl={currentCaseMaterial}
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
                textureUrl={currentCaseMaterial}
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
                textureUrl={caseMaterial}
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
                textureUrl={backBoardMaterial}
            />
        </group>
    )
}

export default WardrobeCase