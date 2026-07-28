import { create } from "zustand";
import type { WardrobeState } from "@/types/WardrobeProps";
import { createHistorySlice } from "./slices/historySlice";
import { createWardrobeSlice } from "./slices/wardrobeSlice";
import { createSegmentsSlice } from "./slices/segmentsSlice";
import { createUISlice } from "./slices/uiSlice";

export const useWardrobeStore = create<WardrobeState>()((...a) => ({
  ...createHistorySlice(...a),
  ...createWardrobeSlice(...a),
  ...createSegmentsSlice(...a),
  ...createUISlice(...a),
}));