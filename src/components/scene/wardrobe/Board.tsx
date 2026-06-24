'use client';

import { useMemo, useEffect } from 'react'
import type { BoardProps } from '@/types/BoardProps'
import { toMeters } from '@/helpers/unitConverter'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'

const GAP_VALUE = 0.7
const TILE_SIZE = 1
const MATERIAL_METALNESS = 0.0
const FALLBACK_PIXEL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

const Board = ({ 
    name, 
    w, 
    h, 
    d, 
    x, 
    y, 
    z, 
    rotation,
    textureUrl,
    colorHex = '#ffffff',
    roughness = 0.6
}: BoardProps) => {
    const texture = useLoader(THREE.TextureLoader, textureUrl || FALLBACK_PIXEL)

    const gap = toMeters(GAP_VALUE)
    const width = toMeters(w) - gap
    const height = toMeters(h) - gap
    const depth = toMeters(d) - gap

    const meshPosition = useMemo(() => [
        toMeters(x), 
        toMeters(y), 
        toMeters(z)
    ] as [number, number, number], [x, y, z])

    const materialsArray = useMemo(() => {
        const createMaterial = (sX: number, sY: number) => {
            const matOptions: THREE.MeshStandardMaterialParameters = {
                color: new THREE.Color(colorHex),
                metalness: MATERIAL_METALNESS,
                roughness: roughness
            }

            if (textureUrl) {
                const clonedTexture = texture.clone()
                clonedTexture.wrapS = THREE.RepeatWrapping
                clonedTexture.wrapT = THREE.RepeatWrapping
                clonedTexture.repeat.set(sX / TILE_SIZE, sY / TILE_SIZE)
                clonedTexture.needsUpdate = true
                matOptions.map = clonedTexture
            }

            return new THREE.MeshStandardMaterial(matOptions)
        }

        return [
            createMaterial(depth, height),
            createMaterial(depth, height),
            createMaterial(width, depth),
            createMaterial(width, depth),
            createMaterial(width, height),
            createMaterial(width, height),
        ]
    }, [width, height, depth, texture, textureUrl, colorHex, roughness])

    useEffect(() => {
        return () => {
            materialsArray.forEach((material) => {
                if (material.map) material.map.dispose()
                material.dispose()
            })
        }
    }, [materialsArray])

    return (
        <mesh 
            name={name}
            position={meshPosition} 
            rotation={rotation} 
            castShadow 
            receiveShadow
            material={materialsArray}
        >
            <boxGeometry args={[width, height, depth]} />
        </mesh>
    )
}

export default Board