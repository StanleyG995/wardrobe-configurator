import type { Wardrobe } from "@/types/WardrobeProps";

export interface HistorySlice {
  history: Wardrobe[];
  future: Wardrobe[];
  saveToHistory: () => void;
  undo: () => void;
  redo: () => void;
}