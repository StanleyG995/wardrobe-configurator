import { StateCreator } from "zustand";
import type { WardrobeState } from "@/types/WardrobeProps";
import type { SegmentsSlice } from "./segmentsSlice.types";
import { computePrice } from "@/helpers/pricing";

export const createSegmentsSlice: StateCreator<
  WardrobeState,
  [],
  [],
  SegmentsSlice
> = (set, get) => ({
  activeSegmentIdx: null,
  setActiveSegmentIdx: (idx) => set(() => ({ activeSegmentIdx: idx })),

  handleDoorPositionChange: (segmentIndex) => {
    get().saveToHistory();
    set((state) => {
      const updatedSegments = state.wardrobe.segments.map((seg, idx) => {
        if (idx !== segmentIndex) return seg;
        return { ...seg, doorPosition: (seg.doorPosition === "left" ? "right" : "left") as ("left" | "right") };
      });
      const nextWardrobe = { ...state.wardrobe, segments: updatedSegments };
      return { price: computePrice(nextWardrobe), wardrobe: nextWardrobe };
    });
  },

  addShelfToSegment: (segmentIndex) => {
    const state = get();
    const currentSegment = state.wardrobe.segments[segmentIndex];
    if (!currentSegment || currentSegment.type !== "shelves") return;

    get().saveToHistory();
    set((state) => {
      const updatedSegments = state.wardrobe.segments.map((seg, idx) => {
        if (idx !== segmentIndex) return seg;
        return { ...seg, shelves: [...seg.shelves, crypto.randomUUID()] };
      });
      const nextWardrobe = { ...state.wardrobe, segments: updatedSegments };
      return { price: computePrice(nextWardrobe), wardrobe: nextWardrobe };
    });
  },

  removeShelfFromSegment: (segmentIndex) => {
    const state = get();
    const currentSegment = state.wardrobe.segments[segmentIndex];
    if (!currentSegment || currentSegment.shelves.length === 0) return;

    get().saveToHistory();
    set((state) => {
      const updatedSegments = state.wardrobe.segments.map((seg, idx) => {
        if (idx !== segmentIndex) return seg;
        return { ...seg, shelves: seg.shelves.slice(0, -1) };
      });
      const nextWardrobe = { ...state.wardrobe, segments: updatedSegments };
      return { price: computePrice(nextWardrobe), wardrobe: nextWardrobe };
    });
  },

  changeSegmentType: (segmentIndex, newType) => {
    get().saveToHistory();
    set((state) => {
      const updatedSegments = state.wardrobe.segments.map((seg, idx) => {
        if (idx !== segmentIndex) return seg;
        return { ...seg, type: newType, shelves: [] };
      });
      const nextWardrobe = { ...state.wardrobe, segments: updatedSegments };
      return { price: computePrice(nextWardrobe), wardrobe: nextWardrobe };
    });
  },

  toggleDoorMirror: (segmentIndex) => {
    get().saveToHistory();
    set((state) => {
      const updatedSegments = state.wardrobe.segments.map((seg, idx) => {
        if (idx !== segmentIndex) return seg;
        return { ...seg, mirror: !seg.mirror };
      });
      const nextWardrobe = { ...state.wardrobe, segments: updatedSegments };
      return { price: computePrice(nextWardrobe), wardrobe: nextWardrobe };
    });
  },
});