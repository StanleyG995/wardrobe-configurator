import {Material, MaterialConfig } from "@/types/WardrobeProps";

export const MATERIALS: Record<Material['material'], MaterialConfig> = {
  "white":      { color: "#f5f5f5", metalness: 0, roughness: 0.7 },
  "black":      { color: "#353434", metalness: 0, roughness: 0.7 },
  "graphite":   { color: "#4e6070", metalness: 0, roughness: 0.7 },
  "gray":   { color: "#929699", metalness: 0, roughness: 0.7 },
  "beige":   { color: "#b39d8c", metalness: 0, roughness: 0.7 },
  "cashmere":   { color: "#cf9887", metalness: 0, roughness: 0.7 },
  "sage":   { color: "#9eb39d", metalness: 0, roughness: 0.7 }, 
  "terracota":   { color: "#b06d58", metalness: 0, roughness: 0.7 }, 
  "light-wood": { color: "#ffffff", textureUrl: "/textures/light-wood.webp", metalness: 0, roughness: 0.7 },
  "dark-wood":  { color: "#ffffff", textureUrl: "/textures/dark-wood.webp", metalness: 0, roughness: 0.7 },
};