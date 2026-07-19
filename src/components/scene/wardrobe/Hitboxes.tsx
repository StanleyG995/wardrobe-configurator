"use client";

import { useState, useEffect } from "react";
import { toMeters } from "@/helpers/unitConverter";

import { useWardrobeStore } from "@/store/useWardrobeStore";

import * as THREE from "three";

const HITBOX_COLOR = "#4282ac";
const ACTIVE_OPACITY = 0.6;
const INACTIVE_OPACITY = 0;

function Hitboxes({}) {
  const {
    segments = [],
    dimensions: { width, height, depth },
    boardThickness,
  } = useWardrobeStore((state) => state.wardrobe);
  const { activeSegmentIdx, setActiveSegmentIdx } = useWardrobeStore(
    (state) => state,
  );

  const segmentCount = segments.length > 0 ? segments.length : 1;
  const hasDividers = segmentCount > 1;

  const totalInnerWidth =
    width -
    2 * boardThickness -
    (hasDividers ? (segmentCount - 1) * boardThickness : 0);

  const compartmentWidth = totalInnerWidth / segmentCount;
  const innerHeight = height - 2 * boardThickness;
  const startX = -width / 2 + boardThickness;
  const centerY = toMeters(boardThickness + innerHeight / 2);

  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  return (
    <group
      name="hitboxes"
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {segments.map((segment, idx) => {
        const segmentX =
          startX +
          idx * (compartmentWidth + boardThickness) +
          compartmentWidth / 2;

        return (
          <mesh
            key={`hitbox-${segment.id}`}
            position={[toMeters(segmentX), centerY, 0]}
            onClick={(e) => {
              e.stopPropagation();
              setActiveSegmentIdx(idx);
            }}
          >
            <boxGeometry
              args={[
                toMeters(compartmentWidth),
                toMeters(innerHeight),
                toMeters(depth),
              ]}
            />
            <meshBasicMaterial
              color={HITBOX_COLOR}
              transparent
              opacity={
                idx === activeSegmentIdx ? ACTIVE_OPACITY : INACTIVE_OPACITY
              }
              premultipliedAlpha={true}
              blending={THREE.NormalBlending}
              depthWrite={false}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default Hitboxes;
