"use client";

import { FaUndo, FaRedo } from "react-icons/fa";

import { useStore } from "zustand";
import { useWardrobeStore } from "@/store/useWardrobeStore";

const HistoryControls = () => {
  // POPRAWKA: Przekazujemy temporal API do hooka useStore, aby poprawnie subskrybować historię
  const { undo, redo, pastStates, futureStates } = useStore(
    useWardrobeStore.temporal,
    (state) => state,
  );

  const canUndo = pastStates.length > 0;
  const canRedo = futureStates.length > 0;

  return (
    <div className="absolute right-[10px] bottom-[10px] z-50 flex flex-row gap-2">
      <button
        onClick={() => undo()}
        disabled={!canUndo}
        title="Undo (Ctrl+Z)"
        className={`flex items-center justify-center rounded-lg border p-3 shadow-lg transition-all ${
          canUndo
            ? "cursor-pointer border-blue-500 bg-[#2b7fff] text-white hover:bg-blue-600"
            : "cursor-not-allowed border-neutral-700 bg-neutral-800/80 text-neutral-500"
        }`}
      >
        <FaUndo />
      </button>

      <button
        onClick={() => redo()}
        disabled={!canRedo}
        title="Redo (Ctrl+Y)"
        className={`flex items-center justify-center rounded-lg border p-3 shadow-lg transition-all ${
          canRedo
            ? "cursor-pointer border-blue-500 bg-[#2b7fff] text-white hover:bg-blue-600"
            : "cursor-not-allowed border-neutral-700 bg-neutral-800/80 text-neutral-500"
        }`}
      >
        <FaRedo />
      </button>
    </div>
  );
};

export default HistoryControls;
