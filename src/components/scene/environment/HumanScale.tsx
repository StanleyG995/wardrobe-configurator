'use client';

import type { HumanScaleProps } from "@/types/RenderProps"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Image as DreiImage, Line, Html } from "@react-three/drei"
import { useTexture } from "@react-three/drei" // <-- Importujemy useTexture
import { toMeters, toMilimeters } from "@/helpers/unitConverter"
import * as THREE from "three"

const ASPECT_RATIO = 0.268;

const HumanScale = ({ gender, dimensions }: HumanScaleProps) => {
    const groupRef = useRef<THREE.Group>(null)

    const maleHeight = toMeters(1800)
    const maleWidth = maleHeight * ASPECT_RATIO

    const femaleHeight = toMeters(1650)
    const femaleWidth = femaleHeight * ASPECT_RATIO

    const currentHeight = gender === "male" ? maleHeight : femaleHeight

    useFrame(({ camera }) => {
        if (groupRef.current) {
            const camPos = camera.position
            groupRef.current.rotation.y = Math.atan2(
                camPos.x - groupRef.current.position.x,
                camPos.z - groupRef.current.position.z
            )
        }
    })

    return (
        <group ref={groupRef} position={[0, 0, 1.4]}>
            <DreiImage
                url="/silhouette-01.svg"
                scale={[maleWidth, maleHeight]}
                position={[0, maleHeight / 2, 0]}
                transparent
                opacity={0.8}
                visible={gender === "male"} 
            />

            <DreiImage
                url="/silhouette-02.svg"
                scale={[femaleWidth, femaleHeight]}
                position={[0, femaleHeight / 2, 0]}
                transparent
                opacity={0.8}
                visible={gender === "female"}
            />

            {dimensions && (
                <group>
                    <Html position={[0.4, currentHeight / 2, 0]} center>
                        <div className='bg-black/60 whitespace-nowrap backdrop-blur-md text-white px-2 flex flex-row justify-center py-1 rounded border border-white/20 text-[10px] text-[clamp(10px,1vw,14px)] max-w-[200px]'>
                            <span>{Math.round(toMilimeters(currentHeight))} mm</span>
                        </div>
                    </Html>
                    <Line color='black' points={[[0.4, 0, 0], [0.4, currentHeight, 0]]} lineWidth={1} />
                    <Line color='black' points={[[0, 0, 0], [0.4, 0, 0]]} lineWidth={1} />
                    <Line color='black' points={[[0, currentHeight, 0], [0.4, currentHeight, 0]]} lineWidth={1} />
                </group>
            )}
        </group>
    )
}
useTexture.preload("/silhouette-01.svg");
useTexture.preload("/silhouette-02.svg");

export default HumanScale;