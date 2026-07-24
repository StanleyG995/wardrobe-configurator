import { Material, MaterialConfig } from "@/types/WardrobeProps";

export const MATERIALS: Record<Material['material'], MaterialConfig> = {
  "white":      { color: "#f5f5f5", metalness: 0, roughness: 0.7, price: 150 },
  "black":      { color: "#353434", metalness: 0, roughness: 0.7, price: 150 },
  "graphite":   { color: "#4e6070", metalness: 0, roughness: 0.7, price: 150 },
  "gray":       { color: "#929699", metalness: 0, roughness: 0.7, price: 150 },
  "beige":      { color: "#b39d8c", metalness: 0, roughness: 0.7, price: 160 },
  "cashmere":   { color: "#cf9887", metalness: 0, roughness: 0.7, price: 170 },
  "sage":       { color: "#9eb39d", metalness: 0, roughness: 0.7, price: 170 }, 
  "terracota":  { color: "#b06d58", metalness: 0, roughness: 0.7, price: 170 }, 
  "light-wood": { color: "#ffffff", textureUrl: "/textures/light-wood.webp", metalness: 0, roughness: 0.7, price: 190 },
  "dark-wood":  { color: "#ffffff", textureUrl: "/textures/dark-wood.webp", metalness: 0, roughness: 0.7, price: 190 },
};