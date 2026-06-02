"use client"

import type { HumanScaleProps } from '@/types/RenderProps'

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Image as DreiImage } from "@react-three/drei"
import { toMeters } from "../helpers/unitConverter"
import * as THREE from "three"

const HumanScale = ( { gender } : HumanScaleProps) => {

    const groupRef = useRef<THREE.Group>(null)


    const humanHeight = (gender==='male') ? toMeters(1800) : toMeters(1600)
    const humanWidth = humanHeight * 0.268 

    useFrame(({ camera }) => {
        if (groupRef.current) {
            const camPos = camera.position

            const angle = Math.atan2(
                camPos.x - groupRef.current.position.x,
                camPos.z - groupRef.current.position.z
            )

            groupRef.current.rotation.y = angle
        }
    })

    return (
        <group ref={groupRef} position={[0, 0, 1]}>
            <DreiImage
                url={gender === 'male' ? "/silhouette-01.svg" : "/silhouette-02.svg"}
                scale={[humanWidth, humanHeight]}
                position={[0, humanHeight / 2, 0]}
                transparent
                opacity={0.5}
            />
        </group>
    )
}

export default HumanScale