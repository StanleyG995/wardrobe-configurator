"use client";

import { MdUndo, MdRedo } from "react-icons/md";

import { useStore } from "zustand";
import { useWardrobeStore } from "@/store/useWardrobeStore";
import { cn } from "@/helpers/cn";

const HistoryControls = () => {
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
        className={`flex items-center justify-center  border p-3 shadow-lg transition-all ${
          canUndo
            ? "bg-black-800 hover:bg-brand-500 hover:border-brand-500 cursor-pointer border-black-800 text-gray-100"
            : "cursor-not-allowed border-gray-500 bg-gray-100 text-gray-400"
        }`}
      >
        <MdUndo className="text-[20px]" />
      </button>

      <button
        onClick={() => redo()}
        disabled={!canRedo}
        title="Redo (Ctrl+Y)"
        className={`flex items-center justify-center border p-3 shadow-lg transition-all ${
          canRedo
            ? "bg-black-800 border-black-800 hover:bg-brand-500 hover:border-brand-500 cursor-pointer text-gray-100"
            : "cursor-not-allowed border-gray-500 bg-gray-100 text-gray-400"
        }`}
      >
        <MdRedo className="text-[20px]" />
      </button>
    </div>
  );
};

const STYLES = {
  container: 'absolute right-[10px] bottom-[10px] z-50 flex flex-row gap-2'
}

export default HistoryControls;
