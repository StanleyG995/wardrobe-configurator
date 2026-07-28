import { StateCreator } from "zustand";
import type { WardrobeState, Wardrobe } from "@/types/WardrobeProps";
import type { WardrobeSlice } from "./wardrobeSlice.types";
import { computePrice } from "@/helpers/pricing";
import { initialWardrobe, calculateSegmentsForWidth } from "@/helpers/geometry";

export const createWardrobeSlice: StateCreator<
  WardrobeState,
  [],
  [],
  WardrobeSlice
> = (set, get) => ({
  wardrobe: initialWardrobe,
  price: computePrice(initialWardrobe),

  updateDimensionPreview: (key, value) =>
    set((state) => {
      const nextDimensions = { ...state.wardrobe.dimensions, [key]: value };
      let nextSegments = [...state.wardrobe.segments];
      if (key === "width") {
        nextSegments = calculateSegmentsForWidth(value, nextSegments);
      }
      const nextWardrobe: Wardrobe = {
        ...state.wardrobe,
        dimensions: nextDimensions,
        segments: nextSegments,
      };
      return {
        price: computePrice(nextWardrobe),
        wardrobe: nextWardrobe,
      };
    }),

  commitDimension: (key, value) => {
    get().updateDimensionPreview(key, value);
  },

  updateDimension: (key, value) => {
    get().commitDimension(key, value);
  },

  setHandleType: (type) => {
    get().saveToHistory();
    set((state) => {
      const nextWardrobe = { ...state.wardrobe, handleType: type };
      return { price: computePrice(nextWardrobe), wardrobe: nextWardrobe };
    });
  },

  setMaterial: (materialType, materialValue) => {
    get().saveToHistory();
    set((state) => {
      const nextWardrobe = { ...state.wardrobe, [materialType]: materialValue };
      return { price: computePrice(nextWardrobe), wardrobe: nextWardrobe };
    });
  },
});