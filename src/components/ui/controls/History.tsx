"use client";

import { MdUndo, MdRedo } from "react-icons/md";

import { useStore } from "zustand";
import { useWardrobeStore } from "@/store/useWardrobeStore";
import { cn } from "@/helpers/cn";
import Button from "@/components/ui/primitives/Button";

const HistoryControls = () => {
  const { undo, redo, pastStates, futureStates } = useStore(useWardrobeStore.temporal, (state) => state);

  const canUndo = pastStates.length > 0;
  const canRedo = futureStates.length > 0;

  return (
    <div className={STYLES.container}>
      <Button onClick={() => undo()} disabled={!canUndo} title="Undo (Ctrl+Z)" icon={<MdUndo className="text-lg" />} active={canUndo} iconPosition="left" />

      <Button onClick={() => redo()} disabled={!canRedo} title="Redo (Ctrl+Y)" icon={<MdRedo className="text-lg" />} active={canRedo}
      iconPosition="left">
      </Button>
    </div>
  );
};

const STYLES = {
  // cn function needed for prettier tailwind class sorting
  container: cn("absolute right-3 bottom-3 z-50 flex flex-row gap-2"),
  button: cn("flex items-center justify-center border p-3 shadow-lg transition-all"),
  buttonDisabled: cn("cursor-not-allowed border-gray-500 bg-gray-100 text-gray-400"),
  buttonActive: cn("cursor-pointer border-black-800 bg-black-800 text-gray-100 hover:border-brand-500 hover:bg-brand-500"),
};

export default HistoryControls;
