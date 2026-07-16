'use client';

import { useMemo, useEffect } from 'react'
import type { BoardProps } from '@/types/BoardProps' // <-- Dopisz tu w typach opcjonalny backMaterial?: MaterialType
import { toMeters } from '@/helpers/unitConverter'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'

const GAP_VALUE = 0.7
const TILE_SIZE = 1
const FALLBACK_PIXEL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

// Rozszerzam propsy lokalnie na wypadek, gdybyś nie zmienił jeszcze pliku types
interface ExtendedBoardProps extends BoardProps {
    backMaterial?: BoardProps['material']; // Druga tekstura (na tył płyty)
}

const Board = ({ 
    name, 
    w, 
    h, 
    d, 
    x, 
    y, 
    z, 
    rotation,
    material,
    backMaterial, // <-- Łapiemy nowy opcjonalny prop
}: ExtendedBoardProps) => {
    const texture = useLoader(THREE.TextureLoader, material.textureUrl || FALLBACK_PIXEL)
    const backTexture = useLoader(THREE.TextureLoader, backMaterial?.textureUrl || FALLBACK_PIXEL)

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
        const createMaterial = (sX: number, sY: number, customMat = material, customTex = texture) => {
            const matOptions: THREE.MeshStandardMaterialParameters = {
                color: customMat.colorHex || '#ffffff',
                metalness: customMat.metalness,
                roughness: customMat.roughness,
            }

            if (customMat.textureUrl) {
                const clonedTexture = customTex.clone()
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
            
            
            backMaterial 
                ? createMaterial(width, height, backMaterial, backTexture) 
                : createMaterial(width, height),
        ]
    }, [width, height, depth, texture, backTexture, material, backMaterial])

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