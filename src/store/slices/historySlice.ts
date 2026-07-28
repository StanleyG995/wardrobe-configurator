

import { StateCreator } from "zustand";
import type { WardrobeState, Wardrobe } from "@/types/WardrobeProps";
import { computePrice } from "@/helpers/pricing";

export const createHistorySlice: StateCreator<
  WardrobeState,
  [],
  [],
  any
> = (set, get) => ({
  history: [],
  future: [],

  saveToHistory: () => {
    const { history, wardrobe } = get();
    const wardrobeCopy: Wardrobe = JSON.parse(JSON.stringify(wardrobe));

    const lastHistoryItem = history[history.length - 1];
    if (lastHistoryItem && JSON.stringify(lastHistoryItem) === JSON.stringify(wardrobeCopy)) {
      return;
    }

    set({
      history: [...history, wardrobeCopy],
      future: [],
    });
  },

  undo: () => {
    const { history, wardrobe, future } = get();
    if (history.length === 0) return;

    const previous = history[history.length - 1];
    const newHistory = history.slice(0, history.length - 1);
    const currentCopy: Wardrobe = JSON.parse(JSON.stringify(wardrobe));

    set({
      wardrobe: previous,
      price: computePrice(previous),
      history: newHistory,
      future: [currentCopy, ...future],
    });
  },

  redo: () => {
    const { history, wardrobe, future } = get();
    if (future.length === 0) return;

    const next = future[0];
    const newFuture = future.slice(1);
    const currentCopy: Wardrobe = JSON.parse(JSON.stringify(wardrobe));

    set({
      wardrobe: next,
      price: computePrice(next),
      history: [...history, currentCopy],
      future: newFuture,
    });
  },
});