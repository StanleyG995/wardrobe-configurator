
export interface SegmentData {
    id: string;
    type: 'shelves' | 'hanger' | 'empty';
    shelves: string[];
}

export interface WardrobeData {
    width: number;
    height: number;
    depth: number;
    boardThickness: number;
    backBoardThickness: number;
    segments: SegmentData[];
}

export interface WardrobeProps {
    wardrobe: WardrobeData;
    onUpdate: (name: string, value: number) => void;
    onAddShelf: () => void;
    onRemoveShelf: () => void;
}
