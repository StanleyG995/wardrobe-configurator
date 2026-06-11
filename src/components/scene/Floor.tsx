"use client"

import { useLoader } from '@react-three/fiber'
import { useMemo } from 'react'
import * as THREE from 'three'

const Floor = () => {
    const baseTexture = useLoader(THREE.TextureLoader, "/floor.png")

    const floorTexture = useMemo(() => {
        if (!baseTexture) return null
        
        const cloned = baseTexture.clone()
        cloned.wrapS = THREE.RepeatWrapping
        cloned.wrapT = THREE.RepeatWrapping
        cloned.repeat.set(10, 10)
        cloned.colorSpace = THREE.SRGBColorSpace
        cloned.needsUpdate = true
        
        return cloned
    }, [baseTexture])

    if (!floorTexture) return null

    return (
        <mesh
            name='floor'
            scale={[10, 10, 1]}
            position={[0, -0.001, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
        >
            <planeGeometry />
            <meshStandardMaterial map={floorTexture} side={THREE.DoubleSide} />
        </mesh>
    )
}

export default Floor