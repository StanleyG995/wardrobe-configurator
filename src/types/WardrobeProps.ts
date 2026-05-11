// src/types/Wardrobe.ts
export interface WardrobeData {
    width: number;
    height: number;
    depth: number;
    boardThickness: number;
    backBoardThickness: number;
    shelves: string[];
}

export interface WardrobeProps {
    wardrobe: WardrobeData;
    onUpdate: (name: string, value: number) => void;
    onAddShelf: () => void;
    onRemoveShelf: () => void;
}