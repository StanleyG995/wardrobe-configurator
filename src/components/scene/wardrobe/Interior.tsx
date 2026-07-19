"use client"

import Board from "@/components/scene/wardrobe/Board"
import { toMeters } from "@/helpers/unitConverter"

import { MATERIALS } from "@/config/Materials"

import { useWardrobeStore } from "@/store/useWardrobeStore"

const TOP_BAY_HEIGHT = 1900
const TOP_BAY_BREAKPOINT = 2200
const HANGER_ROD_HEIGHT_LOW = 1600
const HANGER_ROD_HEIGHT_HIGH = 1800
const HANGER_ROD_BREAKPOINT = 2000

const INTERNAL_DEPTH_OFFSET = 10
const DIVIDER_Z_POSITION = 5

const ROD_RADIUS = 0.0125
const ROD_SEGMENTS = 16
const ROD_COLOR = "#cccccc"
const ROD_METALNESS = 0.8
const ROD_ROUGHNESS = 0.2

const Interior = () => {
    
    const { dimensions: { width, height, depth }, boardThickness, segments, caseMaterial } = useWardrobeStore((state) => state.wardrobe)
    const resolvedMaterial = MATERIALS[caseMaterial as keyof typeof MATERIALS]

    const segmentCount = segments.length > 0 ? segments.length : 1
    const hasDividers = segmentCount > 1

    const totalInnerWidth =
        width -
        2 * boardThickness -
        (hasDividers ? (segmentCount - 1) * boardThickness : 0)
    
    const compartmentWidth = totalInnerWidth / segmentCount
    const startX = -width / 2 + boardThickness
    const shelfDepth = depth - boardThickness - INTERNAL_DEPTH_OFFSET

    return (
        <>
            {hasDividers &&
                Array.from({ length: segmentCount - 1 }).map((_, idx) => {
                    const dividerX =
                        startX +
                        (idx + 1) * compartmentWidth +
                        idx * boardThickness +
                        boardThickness / 2

                    return (
                        <Board
                            key={`divider-${idx}`}
                            name={`wardrobe-divider-${idx}`}
                            w={boardThickness}
                            h={height - 2 * boardThickness}
                            d={shelfDepth}
                            x={dividerX}
                            y={height / 2}
                            z={DIVIDER_Z_POSITION}
                            rotation={[0, 0, 0]}
                            material={{ textureUrl: resolvedMaterial.textureUrl, colorHex: resolvedMaterial.color, roughness: resolvedMaterial.roughness, metalness: resolvedMaterial.metalness }}
                        />
                    )
                })}

            {segments.map((segment, idx) => {
                const segmentX =
                    startX +
                    idx * (compartmentWidth + boardThickness) +
                    compartmentWidth / 2
                
                const hangerRodHeight = height < HANGER_ROD_BREAKPOINT 
                    ? HANGER_ROD_HEIGHT_LOW 
                    : HANGER_ROD_HEIGHT_HIGH

                return (
                    <group key={segment.id} position={[toMeters(segmentX), 0, 0]}>
                        {height > TOP_BAY_BREAKPOINT && (
                            <Board
                                key={`top-shelf-${segment.id}`}
                                name={`top-shelf-${segment.id}`}
                                w={compartmentWidth}
                                h={boardThickness}
                                d={shelfDepth}
                                x={0}
                                y={TOP_BAY_HEIGHT}
                                z={0}
                                rotation={[0, 0, 0]}
                                material={{ textureUrl: resolvedMaterial.textureUrl, colorHex: resolvedMaterial.color, roughness: resolvedMaterial.roughness, metalness: resolvedMaterial.metalness }}
                            />
                        )}

                        {segment.type === "shelves" &&
                            segment.shelves.map((shelfId, shelfIdx) => {
                                const availableHeight =
                                    height < TOP_BAY_BREAKPOINT
                                        ? height
                                        : height - (height - TOP_BAY_HEIGHT)
                                
                                const spacing = availableHeight / (segment.shelves.length + 1)
                                const currentY = boardThickness + spacing * (shelfIdx + 1)

                                return (
                                    <Board
                                        key={shelfId}
                                        name={`shelf-${shelfId}`}
                                        w={compartmentWidth}
                                        h={boardThickness}
                                        d={shelfDepth}
                                        x={0}
                                        y={currentY}
                                        z={0}
                                        rotation={[0, 0, 0]}
                                        material={{ textureUrl: resolvedMaterial.textureUrl, colorHex: resolvedMaterial.color, roughness: resolvedMaterial.roughness, metalness: resolvedMaterial.metalness }}
                                    />
                                )
                            })}

                        {segment.type === "hanger" && (
                            <group>
                                <mesh 
                                    position={[0, toMeters(hangerRodHeight), 0]} 
                                    rotation={[0, 0, Math.PI / 2]}
                                    castShadow
                                >
                                    <cylinderGeometry
                                        args={[ROD_RADIUS, ROD_RADIUS, toMeters(compartmentWidth), ROD_SEGMENTS]}
                                    />
                                    <meshStandardMaterial
                                        color={ROD_COLOR}
                                        metalness={ROD_METALNESS}
                                        roughness={ROD_ROUGHNESS}
                                    />
                                </mesh>
                            </group>
                        )}
                    </group>
                )
            })}
        </>
    )
}

export default Interior