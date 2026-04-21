export interface WardrobeProps {
    wardrobe: {
        width: number;
        height: number;
        depth: number;
        boardThickness: number;
        backBoardThickness: number;
        shelves: string[];
    };
    onUpdate: (name: string, value: number) => void;
    onAddShelf: () => void;
    onRemoveShelf: () => void;
}

