import {Material, DoorMaterial } from "@/types/WardrobeProps";

export const CASE_MATERIAL_TEXTURES: Record<Material['material'], string | undefined> = {
  "dark-wood": "/textures/dark-wood.webp",
  "light-wood": "/textures/light-wood.webp",
  'white': undefined,
  'black': undefined,
  'graphite': undefined,
};

export const MATERIAL_COLORS: Record<DoorMaterial['material'], string> = {
  "white": "#f5f5f5",
  "black": "#1a1a1a",
  "graphite": "#4e6070",
  "dark-wood": "#ffffff", 
  "light-wood": "#ffffff",
  "glass": "#e0f2f1",
};

export const DOOR_MATERIAL_TEXTURES: Record<DoorMaterial['material'], string | undefined> = {
  "dark-wood": "/textures/dark-wood.webp",
  "light-wood": "/textures/light-wood.webp",
  'white': undefined,
  'black': undefined,
  'graphite': undefined,
  'glass': undefined,
};
