"use client";

import { useWardrobeStore } from "@/store/useWardrobeStore";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, Html, useTexture } from "@react-three/drei";
import { toMeters, toMilimeters } from "@/helpers/unitConverter";
import { cn } from "@/helpers/cn";
import * as THREE from "three";

const ASPECT_RATIO = 0.268;
const MALE_HEIGHT_MM = 1800;
const FEMALE_HEIGHT_MM = 1650;
const DIMENSION_OFFSET = 0.4;

const LINE_COLOR = "black";
const LINE_WIDTH = 1;
const COMPONENT_POSITION: [number, number, number] = [0, 0, 1.4];

const SILHOUETTE_COLOR = "#4282ac";

const HumanScale = () => {
  const { humanScaleGender, dimensionsVisible } = useWardrobeStore((state) => state.viewportOptions);

  const groupRef = useRef<THREE.Group>(null);

  const maleTexture = useTexture("/silhouette-01.svg");
  const femaleTexture = useTexture("/silhouette-02.svg");

  const maleHeight = toMeters(MALE_HEIGHT_MM);
  const maleWidth = maleHeight * ASPECT_RATIO;

  const femaleHeight = toMeters(FEMALE_HEIGHT_MM);
  const femaleWidth = femaleHeight * ASPECT_RATIO;

  const currentHeight = humanScaleGender === "male" ? maleHeight : femaleHeight;

  useFrame(({ camera }) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y = Math.atan2(camera.position.x - groupRef.current.position.x, camera.position.z - groupRef.current.position.z);
  });

  return (
    <group ref={groupRef} position={COMPONENT_POSITION}>
      {humanScaleGender === "male" && (
        <mesh position={[0, maleHeight / 2, 0]}>
          <planeGeometry args={[maleWidth, maleHeight]} />
          <meshBasicMaterial color={SILHOUETTE_COLOR} map={maleTexture} transparent opacity={0.8} depthWrite={false} />
        </mesh>
      )}
      {humanScaleGender === "female" && (
        <mesh position={[0, femaleHeight / 2, 0]}>
          <planeGeometry args={[femaleWidth, femaleHeight]} />
          <meshBasicMaterial color={SILHOUETTE_COLOR} map={femaleTexture} transparent opacity={0.8} depthWrite={false} />
        </mesh>
      )}

      {dimensionsVisible && (
        <group>
          <Html position={[DIMENSION_OFFSET, currentHeight / 2, 0]} center>
            <div className={STYLES.label}>
              <span>{Math.round(toMilimeters(currentHeight))}</span>
            </div>
          </Html>
          <Line
            color={LINE_COLOR}
            lineWidth={LINE_WIDTH}
            points={[
              [DIMENSION_OFFSET, 0, 0],
              [DIMENSION_OFFSET, currentHeight, 0],
            ]}
          />
          <Line
            color={LINE_COLOR}
            lineWidth={LINE_WIDTH}
            points={[
              [0, 0, 0],
              [DIMENSION_OFFSET, 0, 0],
            ]}
          />
          <Line
            color={LINE_COLOR}
            lineWidth={LINE_WIDTH}
            points={[
              [0, currentHeight, 0],
              [DIMENSION_OFFSET, currentHeight, 0],
            ]}
          />
        </group>
      )}
    </group>
  );
};

const STYLES = {
  // cn function needed for prettier tailwind class sorting
  label: cn(
    "rounded-md border-1 border-gray-300 bg-gray-100 px-3 py-2 text-center text-black-800 shadow-md shadow-brand-700/10 ring-brand-500 outline-none focus:ring-2 whitespace-nowrap",
  ),
};

useTexture.preload("/silhouette-01.svg");
useTexture.preload("/silhouette-02.svg");

export default HumanScale;
