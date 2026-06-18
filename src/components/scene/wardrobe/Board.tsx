'use client';
import { useMemo } from 'react'
import type { BoardProps } from '@/types/BoardProps'
import { toMeters } from '@/helpers/unitConverter'

import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'

const Board = ({ name, w, h, d, x, y, z, rotation }: BoardProps) => {
    const gap = toMeters(1.2)
    const width = toMeters(w)-gap;
    const height = toMeters(h)-gap;
    const depth = toMeters(d)-gap;
    const meshPosition: [number, number, number] = [toMeters(x), toMeters(y), toMeters(z)];
    
    const texture = useLoader(THREE.TextureLoader, '/dark-wood.webp')

    const tileSize = 1; 

    const materialsArray = useMemo(() => {
        const createTiledMaterial = (sX: number, sY: number) => {
            const t = texture.clone();
            t.wrapS = t.wrapT = THREE.RepeatWrapping;
            
            t.repeat.set(sX / tileSize, sY / tileSize);
            t.needsUpdate = true;
    
         
            return new THREE.MeshStandardMaterial({ 
                map: t,
                metalness: 0.0,
                roughness: 0.6  
            });
        };

    
        return [
            createTiledMaterial(depth, height),
            createTiledMaterial(depth, height),
            createTiledMaterial(width, depth),
            createTiledMaterial(width, depth), 
            createTiledMaterial(width, height),
            createTiledMaterial(width, height),
        ];
    }, [width, height, depth, texture]);

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
    );
};

export default Board