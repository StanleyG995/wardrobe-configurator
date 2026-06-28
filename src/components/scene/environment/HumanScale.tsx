'use client';

import { useWardrobeStore } from '@/store/useWardrobeStore';

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Image as DreiImage, Line, Html, useTexture } from "@react-three/drei"
import { toMeters, toMilimeters } from "@/helpers/unitConverter"
import * as THREE from "three"

const ASPECT_RATIO = 0.268
const MALE_HEIGHT_MM = 1800
const FEMALE_HEIGHT_MM = 1650
const DIMENSION_OFFSET = 0.4

const LINE_COLOR = "black"
const LINE_WIDTH = 1
const COMPONENT_POSITION: [number, number, number] = [0, 0, 1.4]

const HumanScale = () => {

    const { humanScaleGender, dimensionsVisible } = useWardrobeStore((state) => state.viewportOptions)

    const groupRef = useRef<THREE.Group>(null)

    const maleHeight = toMeters(MALE_HEIGHT_MM)
    const maleWidth = maleHeight * ASPECT_RATIO

    const femaleHeight = toMeters(FEMALE_HEIGHT_MM)
    const femaleWidth = femaleHeight * ASPECT_RATIO

    const currentHeight = humanScaleGender === "male" ? maleHeight : femaleHeight

    useFrame(({ camera }) => {
        if (!groupRef.current) return
        
        groupRef.current.rotation.y = Math.atan2(
            camera.position.x - groupRef.current.position.x,
            camera.position.z - groupRef.current.position.z
        )
    })

    return (
        <group ref={groupRef} position={COMPONENT_POSITION}>
            <DreiImage
                url="/silhouette-01.svg"
                scale={[maleWidth, maleHeight]}
                position={[0, maleHeight / 2, 0]}
                transparent
                opacity={0.8}
                visible={humanScaleGender === "male"} 
            />

            <DreiImage
                url="/silhouette-02.svg"
                scale={[femaleWidth, femaleHeight]}
                position={[0, femaleHeight / 2, 0]}
                transparent
                opacity={0.8}
                visible={humanScaleGender === "female"}
            />

            {dimensionsVisible && (
                <group>
                    <Html position={[DIMENSION_OFFSET, currentHeight / 2, 0]} center>
                        <div className='bg-black/60 whitespace-nowrap backdrop-blur-md text-white px-2 flex flex-row justify-center py-1 rounded border border-white/20 text-[10px] text-[clamp(10px,1vw,14px)] max-w-[200px]'>
                            <span>{Math.round(toMilimeters(currentHeight))} mm</span>
                        </div>
                    </Html>
                    <Line 
                        color={LINE_COLOR} 
                        lineWidth={LINE_WIDTH} 
                        points={[[DIMENSION_OFFSET, 0, 0], [DIMENSION_OFFSET, currentHeight, 0]]} 
                    />
                    <Line 
                        color={LINE_COLOR} 
                        lineWidth={LINE_WIDTH} 
                        points={[[0, 0, 0], [DIMENSION_OFFSET, 0, 0]]} 
                    />
                    <Line 
                        color={LINE_COLOR} 
                        lineWidth={LINE_WIDTH} 
                        points={[[0, currentHeight, 0], [DIMENSION_OFFSET, currentHeight, 0]]} 
                    />
                </group>
            )}
        </group>
    )
}

useTexture.preload("/silhouette-01.svg")
useTexture.preload("/silhouette-02.svg")

export default HumanScale