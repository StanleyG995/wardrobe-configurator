"use client"

import { useRef, useMemo, useLayoutEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { MathUtils, Group } from "three"
import Board from "@/components/scene/wardrobe/Board"
import { DoorProps } from "@/types/WardrobeProps"
import { toMeters } from "@/helpers/unitConverter"
import DoorHandle from "@/components/scene/wardrobe/DoorHandle"
import HingeCup from "@/components/scene/wardrobe/HingeCup"
import HingeArm from "@/components/scene/wardrobe/HingeArm"

const DOOR_ROTATION_ANGLE = Math.PI / 2.09
const LERP_FACTOR = 0.03
const HINGE_ARM_OFFSET = 18

const HANDLE_OFFSET_X = 50
const HANDLE_OFFSET_Z = 12
const HINGE_Z_OFFSET = 26
const HINGE_CUP_Z = -3

const EDGE_OFFSET = 100
const HEIGHT_BREAKPOINT_3 = 1000
const HEIGHT_BREAKPOINT_4 = 1600
const HEIGHT_BREAKPOINT_5 = 2100

const ROTATION_THRESHOLD = 0.001
const POSITION_THRESHOLD = 0.0001

const getHingePositionsY = (height: number): number[] => {
    let count = 2
    if (height >= HEIGHT_BREAKPOINT_3 && height < HEIGHT_BREAKPOINT_4) count = 3
    else if (height >= HEIGHT_BREAKPOINT_4 && height < HEIGHT_BREAKPOINT_5) count = 4
    else if (height >= HEIGHT_BREAKPOINT_5) count = 5

    if (count === 2) {
        return [EDGE_OFFSET, height - EDGE_OFFSET]
    }

    const availableSpace = height - (EDGE_OFFSET * 2)
    const step = availableSpace / (count - 1)
    const positions: number[] = []

    for (let i = 0; i < count; i++) {
        positions.push(EDGE_OFFSET + (i * step))
    }

    return positions
}

const Door = ({
    width,
    height,
    depth,
    boardThickness,
    isOpen,
    hingeSide,
    handleSide,
    topOffset
}: DoorProps) => {
    const hingeCupRef = useRef<Group>(null)
    const prevStates = useRef({ width, height, depth, topOffset, hingeSide })
    const shouldBypassLerpRef = useRef(false)

    const hingePositionsY = useMemo(() => getHingePositionsY(height), [height])

    const isLeftHinge = hingeSide === 'left'
    const isLeftHandle = handleSide === 'left'

    const staticGeometry = useMemo(() => {
        const hingePos: [number, number, number] = [
            toMeters(isLeftHinge ? -width / 2 : width / 2),
            toMeters(height / 2 + topOffset),
            toMeters(depth / 2)
        ]

        const handlePos: [number, number, number] = [
            toMeters(isLeftHandle ? width - HANDLE_OFFSET_X : -width + HANDLE_OFFSET_X),
            0,
            toMeters(boardThickness + HANDLE_OFFSET_Z)
        ]

        const hingeArmPos: [number, number, number] = [
            toMeters(isLeftHinge ? -width / 2 + boardThickness + boardThickness / 3 : width / 2 - boardThickness - boardThickness / 3),
            toMeters(height / 2 + topOffset),
            toMeters(depth)
        ]

        const hingeZPos = isLeftHandle ? toMeters(HINGE_Z_OFFSET) : toMeters(-HINGE_Z_OFFSET)

        return {
            hingePos,
            handlePos,
            hingeArmPos,
            hingeZPos
        }
    }, [width, height, depth, boardThickness, topOffset, isLeftHinge, isLeftHandle])

    useLayoutEffect(() => {
        if (hingeCupRef.current) {
           
            const currentTargetRotation = 0

            const destX = isLeftHinge ? staticGeometry.hingePos[0] : staticGeometry.hingePos[0]
            const destZ = staticGeometry.hingePos[2]

            hingeCupRef.current.rotation.y = currentTargetRotation
            hingeCupRef.current.position.x = destX
            hingeCupRef.current.position.z = destZ
            
            shouldBypassLerpRef.current = true
        }
    }, [staticGeometry.hingePos, isLeftHinge])

    useFrame(() => {
        if (hingeCupRef.current) {
            const stateChanged = 
                prevStates.current.width !== width ||
                prevStates.current.height !== height ||
                prevStates.current.depth !== depth ||
                prevStates.current.topOffset !== topOffset ||
                prevStates.current.hingeSide !== hingeSide

            if (stateChanged) {
                shouldBypassLerpRef.current = true
                prevStates.current = { width, height, depth, topOffset, hingeSide }
            }

            const targetRotation = isOpen ? DOOR_ROTATION_ANGLE : 0
            const currentTargetRotation = isLeftHinge ? -targetRotation : targetRotation

            const targetHingePositionX = isOpen ? toMeters(boardThickness) : 0
            const targetHingePositionZ = isOpen ? toMeters(6) : 0

            const destX = isLeftHinge ? staticGeometry.hingePos[0] + targetHingePositionX : staticGeometry.hingePos[0] - targetHingePositionX
            const destZ = staticGeometry.hingePos[2] + targetHingePositionZ

            if (shouldBypassLerpRef.current) {
                hingeCupRef.current.rotation.y = currentTargetRotation
                hingeCupRef.current.position.x = destX
                hingeCupRef.current.position.z = destZ
                shouldBypassLerpRef.current = false
                return
            }

            const rotationDiff = Math.abs(hingeCupRef.current.rotation.y - currentTargetRotation)
            const positionXDiff = Math.abs(hingeCupRef.current.position.x - destX)

            if (rotationDiff < ROTATION_THRESHOLD && positionXDiff < POSITION_THRESHOLD) {
                hingeCupRef.current.rotation.y = currentTargetRotation
                hingeCupRef.current.position.x = destX
                hingeCupRef.current.position.z = destZ
            } else {
                hingeCupRef.current.rotation.y = MathUtils.lerp(
                    hingeCupRef.current.rotation.y,
                    currentTargetRotation,
                    LERP_FACTOR
                )
                hingeCupRef.current.position.x = MathUtils.lerp(
                    hingeCupRef.current.position.x,
                    destX,
                    LERP_FACTOR
                )
                hingeCupRef.current.position.z = MathUtils.lerp(
                    hingeCupRef.current.position.z,
                    destZ,
                    LERP_FACTOR
                )
            }
        }
    })
    
    return (
        <group>
            <group position={staticGeometry.hingeArmPos}>
                {hingePositionsY.map((yPosition, index) => (
                    <HingeArm
                        key={`arm-${index}`}
                        position={[0, toMeters(yPosition - height / 2), -toMeters(depth / 2 + HINGE_ARM_OFFSET)]}
                        scale={isLeftHinge ? [1, 1, 1] : [-1, 1, 1]}
                    />
                ))}
            </group>
            <group
                ref={hingeCupRef}
                position={staticGeometry.hingePos}
            >
                <DoorHandle
                    position={staticGeometry.handlePos}
                    rotation={[0, -Math.PI / 2, 0]}
                />
                {hingePositionsY.map((yPosition, index) => (
                    <group key={index}>
                        <HingeCup 
                            position={[staticGeometry.hingeZPos, toMeters(yPosition - height / 2), toMeters(HINGE_CUP_Z)]} 
                            scale={isLeftHinge ? [1, 1, 1] : [-1, 1, 1]}
                            rotation={[Math.PI / 2, 0, 0]}
                        />
                    </group>
                ))}
                <Board
                    name='door'
                    w={width}
                    h={height}
                    d={boardThickness}
                    x={isLeftHinge ? width / 2 : -width / 2}
                    y={0}
                    z={boardThickness / 2}
                    rotation={[0, 0, 0]}
                />
            </group>
        </group>
    )
}

export default Door