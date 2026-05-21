'use client';

import { toMeters } from '../helpers/unitConverter'

interface HitboxProps {
    wardrobe: {
        width: number;
        height: number;
        depth: number;
        boardThickness: number;
        segments?: Array<{ id: string; type: 'shelves' | 'hanger' | 'empty'; shelves: string[] }>;
    };
}

function Hitbox({ wardrobe }: HitboxProps) {
  const segments = wardrobe.segments || [];
  const segmentCount = segments.length > 0 ? segments.length : 1;
  const hasDividers = segmentCount > 1;

  const totalInnerWidth = wardrobe.width - (2 * wardrobe.boardThickness) - (hasDividers ? (segmentCount - 1) * wardrobe.boardThickness : 0);
  const compartmentWidth = totalInnerWidth / segmentCount;
  const innerHeight = wardrobe.height - (2 * wardrobe.boardThickness);

  return (
    <group name="hitboxes">
      {segments.map((segment, idx) => {
        const startX = -wardrobe.width / 2 + wardrobe.boardThickness;
        const segmentX = startX + idx * (compartmentWidth + wardrobe.boardThickness) + compartmentWidth / 2;

        return (
          <mesh
            key={`hitbox-${segment.id}`}
            position={[
              toMeters(segmentX), 
              toMeters(wardrobe.boardThickness + innerHeight / 2), 
              0
            ]}
            onClick={(e) => {
              e.stopPropagation();
              console.log(`Kliknięto wnękę numer: ${idx + 1}`);
            }}
          >
            <boxGeometry args={[
              toMeters(compartmentWidth), 
              toMeters(innerHeight), 
              toMeters(wardrobe.depth)
            ]} />
            <meshBasicMaterial 
              color="lime" 
              transparent 
              opacity={0.3+Number(`0.${2*idx}`)} 
              
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default Hitbox;