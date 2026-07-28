import { calculateWardrobePrice } from "@/helpers/priceCalculator";
import { MATERIALS } from "@/config/Materials";
import { HANDLES } from '@/config/Handles';
import type { Wardrobe } from "@/types/WardrobeProps";

export const getMaterialPrice = (materialKey: string): number => {
  const material = MATERIALS[materialKey as keyof typeof MATERIALS];
  return material && "price" in material ? material.price : 150;
};

export const getHandlePrice = (handleKey: string): number => {
  const handle = HANDLES[handleKey as keyof typeof HANDLES];
  return handle && "price" in handle ? handle.price : 50;
};

export const computePrice = (wardrobe: Wardrobe): number => {
  return calculateWardrobePrice(
    wardrobe.dimensions.width,
    wardrobe.dimensions.height,
    wardrobe.dimensions.depth,
    wardrobe.segments,
    getMaterialPrice(wardrobe.caseMaterial),
    getMaterialPrice(wardrobe.doorMaterial),
    getHandlePrice(wardrobe.handleType)
  );
};