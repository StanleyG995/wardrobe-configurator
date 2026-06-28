"use client"

import Board from "@/components/scene/wardrobe/Board"
import { useWardrobeStore } from "@/store/useWardrobeStore"

import { CASE_MATERIAL_TEXTURES, MATERIAL_COLORS } from "@/config/Materials"

const WardrobeCase = () => {
    const { dimensions: { width, height, depth }, boardThickness, backBoardThickness, caseMaterial,  } = useWardrobeStore((state) => state.wardrobe)
    
    const halfThickness = boardThickness / 2
    const innerHeight = height - 2 * boardThickness
    const sideX = width / 2 - halfThickness
    const centerY = height / 2
    const currentCaseMaterial = CASE_MATERIAL_TEXTURES[caseMaterial as keyof typeof CASE_MATERIAL_TEXTURES]
    const resolvedColorHex = MATERIAL_COLORS[caseMaterial as keyof typeof MATERIAL_COLORS];
    
    const backBoardMaterial = '/textures/backboard.webp'
    
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
                colorHex={resolvedColorHex}
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
                colorHex={resolvedColorHex}
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
                colorHex={resolvedColorHex}
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
                textureUrl={currentCaseMaterial}
                colorHex={resolvedColorHex}
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