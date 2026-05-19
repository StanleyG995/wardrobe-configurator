'use client';

import type { RenderProps } from "@/types/RenderProps"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, ContactShadows } from "@react-three/drei"
import Board from "./Board"
import DimensionLabel from "./DimensionLabel"
import * as THREE from "three"
import { toMeters } from '../helpers/unitConverter'

// Definiujemy strukturę segmentu wewnątrz pliku, jeśli nie masz jej w osobnym typie
interface SegmentData {
    id: string;
    type: 'shelves' | 'hanger' | 'empty';
    shelves: string[];
}

const Render = ({ wardrobe }: RenderProps) => {
    const boardGap = 0

    // 1. Wyliczamy podstawowe dane o wnękach
    const segments: SegmentData[] = wardrobe.segments || [];
    const segmentCount = segments.length > 0 ? segments.length : 1;
    const hasDividers = segmentCount > 1;

    // 2. Obliczamy przestrzeń użytkową w środku szafy (mm)
    // Całkowita szerokość - boki szafy - (liczba przegród * grubość płyty)
    const totalInnerWidth = wardrobe.width - (2 * wardrobe.boardThickness) - (hasDividers ? (segmentCount - 1) * wardrobe.boardThickness : 0);
    const compartmentWidth = totalInnerWidth / segmentCount;

    return (
        <Canvas shadows camera={{ position: [3, 3, 3] }}>
            <ambientLight intensity={0.3} />
            <directionalLight
                position={[1, 3, 4]}
                shadow-mapSize={[2048, 2048]}
                intensity={1}
                castShadow
                shadow-radius={5}
                shadow-camera-left={-1.5}
                shadow-camera-right={1.5}
                shadow-camera-top={2.5}
                shadow-camera-bottom={-0.5}
            />
            <hemisphereLight intensity={0.5} color='#ffffff' groundColor='#b97a20' />

            {/* Podłoga pokoju */}
            <mesh
                scale={[10, 10, 1]}
                position={[0, -0.001, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                receiveShadow>
                <planeGeometry />
                <meshStandardMaterial color='#E8CEA0' side={THREE.DoubleSide} />
            </mesh>

            {/* KORPUS GŁÓWNY SZAFY */}
            <group position={[0, 0.001, 0]}>
                {/* Wieniec dolny */}
                <Board
                    name='wardrobe-bottom'
                    w={wardrobe.width-boardGap}
                    h={wardrobe.boardThickness-boardGap}
                    d={wardrobe.depth-boardGap}
                    x={0}
                    y={wardrobe.boardThickness / 2}
                    z={0}
                    rotation={[0, 0, 0]}
                />

                {/* Wieniec górny */}
                <Board
                    name='wardrobe-top'
                    w={wardrobe.width-boardGap}
                    h={wardrobe.boardThickness-boardGap}
                    d={wardrobe.depth-boardGap}
                    x={0}
                    y={wardrobe.height - wardrobe.boardThickness / 2}
                    z={0}
                    rotation={[0, 0, 0]}
                />

                {/* Bok lewy */}
                <Board
                    name='wardrobe-side-left'
                    w={wardrobe.boardThickness-boardGap}
                    h={wardrobe.height - 2 * wardrobe.boardThickness-boardGap}
                    d={wardrobe.depth-boardGap}
                    x={wardrobe.width / 2 - wardrobe.boardThickness / 2}
                    y={wardrobe.height / 2}
                    z={0}
                    rotation={[0, 0, 0]}
                />

                {/* Bok prawy */}
                <Board
                    name='wardrobe-side-right'
                    w={wardrobe.boardThickness-boardGap}
                    h={wardrobe.height - 2 * wardrobe.boardThickness-boardGap}
                    d={wardrobe.depth-boardGap}
                    x={-(wardrobe.width / 2 - wardrobe.boardThickness / 2)}
                    y={wardrobe.height / 2}
                    z={0}
                    rotation={[0, 0, 0]}
                />

                {/* Plecy szafy */}
                <Board
                    name='wardrobe-back'
                    w={wardrobe.width-2*wardrobe.boardThickness-boardGap}
                    h={wardrobe.height-2*wardrobe.boardThickness-boardGap}
                    d={wardrobe.backBoardThickness-boardGap}
                    x={0}
                    y={wardrobe.height / 2}
                    z={-(wardrobe.depth / 2) + wardrobe.backBoardThickness}
                    rotation={[0, 0, 0]}
                />

                {/* 3. PRZEGRODY PIONOWE (Renderują się tylko gdy mamy min. 2 segmenty) */}
                {hasDividers && Array.from({ length: segmentCount - 1 }).map((_, idx) => {
                    // Matematyczne wyliczenie pozycji X kolejnych pionowych przegród mebla
                    const startX = -wardrobe.width / 2 + wardrobe.boardThickness;
                    const dividerX = startX + (idx + 1) * compartmentWidth + idx * wardrobe.boardThickness + wardrobe.boardThickness / 2;

                    return (
                        <Board
                            key={`divider-${idx}`}
                            name={`wardrobe-divider-${idx}`}
                            w={wardrobe.boardThickness}
                            h={wardrobe.height - 2 * wardrobe.boardThickness}
                            d={wardrobe.depth - wardrobe.boardThickness - 10} // cofnięte o 10mm na plecy
                            x={dividerX}
                            y={wardrobe.height / 2}
                            z={5} // przesunięcie środka z uwagi na cofnięcie głębokości
                            rotation={[0, 0, 0]}
                        />
                    )
                })}

                {/* 4. RENDEROWANIE WNĘTRZA SEGMENTÓW */}
                {segments.map((segment, idx) => {
                    // Obliczamy lewą krawędź pierwszej wnęki mebla jako punkt odniesienia
                    const startX = -wardrobe.width / 2 + wardrobe.boardThickness;
                    // Środek danej wnęki na osi X
                    const segmentX = startX + idx * (compartmentWidth + wardrobe.boardThickness) + compartmentWidth / 2;

                    return (
                        <group key={segment.id} position={[toMeters(segmentX), 0, 0]}>
                            
                            {/* Układ Półek w tym segmencie */}
                            {segment.type === 'shelves' && segment.shelves.map((shelfId, shelfIdx) => {
                                const availableHeight = wardrobe.height - 2 * wardrobe.boardThickness
                                const spacing = availableHeight / (segment.shelves.length + 1)
                                const currentY = wardrobe.boardThickness + spacing * (shelfIdx + 1)

                                return (
                                    <Board
                                        key={shelfId}
                                        name={`shelf-${shelfId}`}
                                        w={compartmentWidth}
                                        h={wardrobe.boardThickness}
                                        d={wardrobe.depth - wardrobe.boardThickness - 10}
                                        x={0}
                                        y={currentY}
                                        z={0}
                                        rotation={[0, 0, 0]}
                                    />
                                )
                            })}

                            
                            {segment.type === 'hanger' && (
                                <mesh 
                                    position={[0, toMeters(wardrobe.height - 300), 0]} 
                                    rotation={[0, 0, Math.PI / 2]}
                                    castShadow
                                >
                                    <cylinderGeometry args={[0.0125, 0.0125, toMeters(compartmentWidth), 16]} />
                                    <meshStandardMaterial color="#cccccc" metalness={0.8} roughness={0.2} />
                                </mesh>
                            )}

                        </group>
                    )
                })}
            </group>

            {/* Linie wymiarowe */}
            <group>
                <DimensionLabel 
                    position={[0, 0, toMeters(wardrobe.depth/2)+0.3]} 
                    value={wardrobe.width} 
                    linePositionStart={[toMeters(-wardrobe.width/2),0,toMeters(wardrobe.depth/2)+0.3]}
                    linePositionEnd={[toMeters(wardrobe.width/2),0,toMeters(wardrobe.depth/2)+0.3]}
                    label="W" 
                    axis='z'
                />
                <DimensionLabel 
                    position={[toMeters(wardrobe.width) / 2 + 0.3, toMeters(wardrobe.height)/2, 0]} 
                    value={wardrobe.height}
                    linePositionStart={[toMeters(wardrobe.width) / 2 + 0.3,0,0]}
                    linePositionEnd={[toMeters(wardrobe.width) / 2 + 0.3,toMeters(wardrobe.height),0]}
                    label="H" 
                    axis='x'
                />
                <DimensionLabel 
                    position={[toMeters(-wardrobe.width) / 2 - 0.3, 0, 0]} 
                    value={wardrobe.depth} 
                    linePositionStart={[toMeters(-wardrobe.width) / 2 - 0.3,0,toMeters(wardrobe.depth) / 2]}
                    linePositionEnd={[toMeters(-wardrobe.width) / 2 - 0.3,0,toMeters(-wardrobe.depth) / 2]}
                    label="D" 
                    axis='x'
                />
            </group>

            <ContactShadows
                position={[0, -0.0005, 0]}
                opacity={1}
                scale={12}
                blur={0.5}
                far={0.2}
                resolution={512}
            />

            <OrbitControls
                target={[0, toMeters(wardrobe.height/2), 0]} 
                enablePan={false}
                maxPolarAngle={Math.PI / 2} 
                minDistance={1} 
                maxDistance={10}
            />
        </Canvas>
    )
}

export default Render;