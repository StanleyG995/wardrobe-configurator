import { useMemo } from 'react'
import type { BoardProps } from '../types/BoardProps'
import { toMeters } from '../helpers/unitConverter'
import darkWood from '../assets/dark-wood.webp'

import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'

const Board = ({ name, w, h, d, x, y, z, rotation }: BoardProps) => {
    const width = toMeters(w);
    const height = toMeters(h);
    const depth = toMeters(d);
    const meshPosition: [number, number, number] = [toMeters(x), toMeters(y), toMeters(z)];
    
    const texture = useLoader(THREE.TextureLoader, darkWood);

    const tileSize = 1; 

    const materialsArray = useMemo(() => {
        const createTiledMaterial = (sX: number, sY: number) => {
            const t = texture.clone();
            t.wrapS = t.wrapT = THREE.RepeatWrapping;
            
            t.repeat.set(sX / tileSize, sY / tileSize);
            t.needsUpdate = true;
            return new THREE.MeshStandardMaterial({ map: t });
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