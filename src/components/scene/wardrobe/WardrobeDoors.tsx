"use client"

import React from "react" // <-- WAŻNE: Musisz dodać ten import na górze pliku
import Door from "@/components/scene/wardrobe/Door"
import { toMeters } from "@/helpers/unitConverter"
import { WardrobeData } from "@/types/WardrobeProps"

interface WardrobeDoorsProps extends WardrobeData {
    isOpen: boolean
}

const WardrobeDoors = ({
    width,
    height,
    depth,
    boardThickness,
    segments,
    isOpen,
}: WardrobeDoorsProps) => {
    const segmentCount = segments.length > 0 ? segments.length : 1
    const compartmentWidth = width / segmentCount
    const topBayDoorsBreakpoint = 2300
    const topBayHeight = 1900

    return (
        <>
            {segments.map((segment, idx) => {
                const startX = -width / 2
                const segmentX =
                    startX +
                    idx * (compartmentWidth) +
                    compartmentWidth / 2

                return (
                    <React.Fragment key={`segment-door-wrapper-${segment.id}`}>
                        {height < topBayDoorsBreakpoint ? (
                            <group position={[toMeters(segmentX), 0, 0]}>
                                <Door
                                    width={compartmentWidth}
                                    height={height}
                                    depth={depth}
                                    boardThickness={boardThickness}
                                    isOpen={isOpen}
                                    hingeSide={segment.doorPosition || 'left'}
                                    handleSide={segment.doorPosition || 'left'}
                                    topOffset={0}
                                />
                            </group>
                        ) : (
                            <>
                            
                                <group position={[toMeters(segmentX), 0, 0]}>
                                    <Door
                                        width={compartmentWidth}
                                        height={height - (height - topBayHeight) - boardThickness / 2}
                                        depth={depth}
                                        boardThickness={boardThickness}
                                        isOpen={isOpen}
                                        hingeSide={segment.doorPosition || 'left'}
                                        handleSide={segment.doorPosition || 'left'}
                                        topOffset={0}
                                    />
                                </group>
                         
                                <group position={[toMeters(segmentX), 0, 0]}>
                                    <Door
                                        width={compartmentWidth}
                                        height={height - topBayHeight + boardThickness / 2}
                                        depth={depth}
                                        boardThickness={boardThickness}
                                        isOpen={isOpen}
                                        hingeSide={segment.doorPosition || 'left'}
                                        handleSide={segment.doorPosition || 'left'}
                                        topOffset={topBayHeight - boardThickness / 2}
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