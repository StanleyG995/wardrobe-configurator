import type { Wardrobe } from "@/types/WardrobeProps";

export interface WardrobeSlice {
  wardrobe: Wardrobe;
  price: number;
  updateDimensionPreview: (key: keyof Wardrobe["dimensions"], value: number) => void;
  commitDimension: (key: keyof Wardrobe["dimensions"], value: number) => void;
  updateDimension: (key: keyof Wardrobe["dimensions"], value: number) => void;
  setHandleType: (type: 'straight' | 'knob' | 'none') => void;
  setMaterial: (materialType: 'caseMaterial' | 'doorMaterial', materialValue: string) => void;
}