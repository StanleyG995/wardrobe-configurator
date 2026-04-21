export interface WardrobeProps {
    wardrobeHeight: number;
    wardrobeDepth: number;
    wardrobeWidth: number;
    boardThickness: number;
    backBoardThickness: number;
    shelves: string[];
    onUpdate: (name: string, value: number) => void;
}

