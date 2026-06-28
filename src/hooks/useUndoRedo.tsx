import { useEffect } from "react";
import { useWardrobeStore } from "@/store/useWardrobeStore";

export function useWardrobeHistory() {
  const { undo, redo } = useWardrobeStore.temporal.getState();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isZ = event.key.toLowerCase() === "z";
      const isY = event.key.toLowerCase() === "y";
      const isMetaOrCtrl = event.metaKey || event.ctrlKey;

      if (isMetaOrCtrl && isZ) {
        event.preventDefault();
        if (event.shiftKey) {
          redo();
        } else {
          undo();
        }
      }

      if (isMetaOrCtrl && isY) {
        event.preventDefault();
        redo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo]);
}