"use client";

import { MdUndo, MdRedo } from "react-icons/md";
import { useWardrobeStore } from "@/store/useWardrobeStore";
import { cn } from "@/helpers/cn";
import Button from "@/components/ui/primitives/Button";

const HistoryControls = () => {
  // Pobieramy funkcje i tablice historii bezpośrednio z naszego store'a
  const undo = useWardrobeStore((state) => state.undo);
  const redo = useWardrobeStore((state) => state.redo);
  const history = useWardrobeStore((state) => state.history);
  const future = useWardrobeStore((state) => state.future);

  const canUndo = history.length > 0;
  const canRedo = future.length > 0;

  return (
    <div className={STYLES.container} role='toolbar' aria-label='History controls'>
      <Button
        onClick={() => undo()}
        disabled={!canUndo}
        title="Undo (Ctrl+Z)"
        icon={<MdUndo className="text-lg" />}
        active={canUndo}
        iconPosition="left"
        aria-label="Undo (Ctrl+Z)"
      />

      <Button
        onClick={() => redo()}
        disabled={!canRedo}
        title="Redo (Ctrl+Y)"
        icon={<MdRedo className="text-lg" />}
        active={canRedo}
        iconPosition="left"
        aria-label="Redo (Ctrl+Y)"
      />
    </div>
  );
};

const STYLES = {
  container: cn("absolute right-3 bottom-3 z-50 flex flex-row gap-2"),
  button: cn("flex items-center justify-center border p-3 shadow-lg transition-all"),
  buttonDisabled: cn("cursor-not-allowed border-gray-500 bg-gray-100 text-gray-400"),
  buttonActive: cn("cursor-pointer border-black-800 bg-black-800 text-gray-100 hover:border-brand-500 hover:bg-brand-500"),
};

export default HistoryControls;