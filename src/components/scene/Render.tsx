"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment, useTexture } from "@react-three/drei";

import Floor from "@/components/scene/environment/Floor";
import HumanScale from "@/components/scene/environment/HumanScale";
import ViewportControls from "@/components/ui/controls/Viewport";
import HistoryControls from "@/components/ui/controls/History";

import WardrobeCase from "@/components/scene/wardrobe/WardrobeCase";
import WardrobeDoors from "@/components/scene/wardrobe/WardrobeDoors";
import WardrobeHitbox from "./wardrobe/WardrobeHitbox";
import WardrobeInterior from "@/components/scene/wardrobe/WardrobeInterior";
import WardrobeLabels from "./wardrobe/WardrobeLabels";

import * as THREE from "three";

import { useWardrobeStore } from "@/store/useWardrobeStore";
import { MATERIALS } from "@/config/Materials";

const Render = () => {
  const setActiveSegmentIdx = useWardrobeStore(
    (state) => state.setActiveSegmentIdx,
  );
  const { floorVisible, humanScaleVisible, dimensionsVisible, doorsVisible } =
    useWardrobeStore((state) => state.viewportOptions);

  return (
    <>
      <ViewportControls />
      <HistoryControls />
      <Canvas
        resize={{ scroll: true, debounce: 0 }}
        shadows={{ type: THREE.PCFSoftShadowMap }}
        camera={{ position: [0, 1.4, 2.5] }}
        gl={{ 
          antialias: true, 
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.85, 
        }}

        onPointerMissed={() => {
          setActiveSegmentIdx(null);
        }}
      >
     
        <Environment preset="apartment" environmentIntensity={0.7} />
        
        <group name="scene">
         
          <directionalLight
            position={[4, 7, 3]}
            color="#fffdf6"
            intensity={1.2}
            shadow-mapSize={[2048, 2048]}
            castShadow
            shadow-radius={8}
            shadow-camera-left={-4}
            shadow-camera-right={4}
            shadow-camera-top={4}
            shadow-camera-bottom={-1}
            shadow-camera-near={0.1}
            shadow-camera-far={20}
            shadow-bias={-0.0002}
          />
          
          <hemisphereLight
            intensity={0.4}
            color="#f5f9ff"
            groundColor="#ebdcd0"
          />
          
          <ContactShadows
            position={[0, -0.0005, 0]}
            opacity={0.65}
            scale={12}
            blur={2.0}
            far={0.6}
            resolution={1024}
          />
          
          <OrbitControls
            target={[0, 1, 0]}
            maxPolarAngle={Math.PI / 1.8}
            minDistance={0.5}
            maxDistance={10}
          />
        </group>
        
        <group name="viewport">
          {floorVisible && <Floor />}
          {humanScaleVisible && <HumanScale />}
          {dimensionsVisible && <WardrobeLabels />}
        </group>
        
        <group name="wardrobe">
          <WardrobeCase />
          <WardrobeInterior />
          <WardrobeHitbox />
          {doorsVisible && <WardrobeDoors />}
        </group>
      </Canvas>
    </>
  );
};

const dynamicTextureUrls = Array.from(
  new Set(
    Object.values(MATERIALS)
      .map((mat) => mat.textureUrl)
      .filter((url): url is string => !!url)
  )
);

const staticTextureUrls = [
  "/textures/backboard.webp",
  "/silhouette-01.svg",
  "/silhouette-02.svg",
];

[...dynamicTextureUrls, ...staticTextureUrls].forEach((url) => {
  useTexture.preload(url);
});

export default Render;