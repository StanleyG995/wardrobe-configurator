import {Material, MaterialConfig } from "@/types/WardrobeProps";

export const MATERIALS: Record<Material['material'], MaterialConfig> = {
  "white":      { color: "#f5f5f5", metalness: 1.0, roughness: 0.6 },
  "black":      { color: "#1a1a1a", metalness: 1.0, roughness: 0.6 },
  "graphite":   { color: "#4e6070", metalness: 1.0, roughness: 0.6 },
  "gray":   { color: "#4e6070", metalness: 1.0, roughness: 0.6 },
  "light-wood": { color: "#ffffff", textureUrl: "/textures/light-wood.webp", metalness: 1.0, roughness: 0.4 },
  "dark-wood":  { color: "#ffffff", textureUrl: "/textures/dark-wood.webp", metalness: 1.0, roughness: 0.4 },
};