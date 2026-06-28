"use client"

import React from "react"
import Door from "@/components/scene/wardrobe/Door"
import { toMeters } from "@/helpers/unitConverter"

import { useWardrobeStore } from "@/store/useWardrobeStore"



const TOP_BAY_DOORS_BREAKPOINT = 2300
const TOP_BAY_HEIGHT = 1900
const DEFAULT_HINGE_SIDE = "left"

const WardrobeDoors = () => {
    const { dimensions: { width, height, depth }, boardThickness, segments, doorMaterial } = useWardrobeStore((state) => state.wardrobe)
    const { doorsOpen: isOpen } = useWardrobeStore((state) => state.viewportOptions)

    const segmentCount = segments.length > 0 ? segments.length : 1
    const compartmentWidth = width / segmentCount
    const startX = -width / 2
    const halfThickness = boardThickness / 2
    const topBayOffset = TOP_BAY_HEIGHT - halfThickness

    return (
        <>
            {segments.map((segment, idx) => {
                const segmentX = startX + idx * compartmentWidth + compartmentWidth / 2
                const doorSide = segment.doorPosition || DEFAULT_HINGE_SIDE
                const positionX = toMeters(segmentX)

                const baseDoorProps = {
                    width: compartmentWidth,
                    depth,
                    boardThickness,
                    isOpen,
                    hingeSide: doorSide,
                    handleSide: doorSide,
                    material: doorMaterial
                }

                return (
                    <React.Fragment key={`segment-door-wrapper-${segment.id}`}>
                        {height < TOP_BAY_DOORS_BREAKPOINT ? (
                            <group position={[positionX, 0, 0]}>
                                <Door
                                    {...baseDoorProps}
                                    height={height}
                                    topOffset={0}
                                    mirror={segment.mirror}
                                />
                            </group>
                        ) : (
                            <>
                                <group position={[positionX, 0, 0]}>
                                    <Door
                                        {...baseDoorProps}
                                        height={height - (height - TOP_BAY_HEIGHT) - halfThickness}
                                        topOffset={0}
                                        mirror={segment.mirror}
                                    />
                                </group>
                                 
                                <group position={[positionX, 0, 0]}>
                                    <Door
                                        {...baseDoorProps}
                                        height={height - TOP_BAY_HEIGHT + halfThickness}
                                        topOffset={topBayOffset}
                                        mirror={segment.mirror}                                      
                                    />
                                </group>
                            </>
                        )}
                    </React.Fragment>
                )
            })}
        </>
    )
}

export default WardrobeDoors