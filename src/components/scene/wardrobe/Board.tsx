'use client';

import { useMemo, useEffect } from 'react'
import type { BoardProps } from '@/types/BoardProps'
import { toMeters } from '@/helpers/unitConverter'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'

const GAP_VALUE = 0.7
const TILE_SIZE = 1
const MATERIAL_ROUGHNESS = 0.6
const MATERIAL_METALNESS = 0.0

const Board = ({ name, w, h, d, x, y, z, rotation }: BoardProps) => {
    const texture = useLoader(THREE.TextureLoader, '/dark-wood.webp')

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
        const createTiledMaterial = (sX: number, sY: number) => {
            const clonedTexture = texture.clone()
            clonedTexture.wrapS = THREE.RepeatWrapping
            clonedTexture.wrapT = THREE.RepeatWrapping
            clonedTexture.repeat.set(sX / TILE_SIZE, sY / TILE_SIZE)
            clonedTexture.needsUpdate = true
    
            return new THREE.MeshStandardMaterial({ 
                map: clonedTexture,
                metalness: MATERIAL_METALNESS,
                roughness: MATERIAL_ROUGHNESS  
            })
        }

        return [
            createTiledMaterial(depth, height), // Right
            createTiledMaterial(depth, height), // Left
            createTiledMaterial(width, depth),  // Top
            createTiledMaterial(width, depth),  // Bottom
            createTiledMaterial(width, height), // Front
            createTiledMaterial(width, height), // Back
        ]
    }, [width, height, depth, texture])

    // CRITICAL: Czyszczenie pamięci GPU przy zmianie wymiarów lub unmouncie komponentu
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