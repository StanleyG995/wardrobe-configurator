
export interface SegmentData {
    id: string;
    type: 'shelves' | 'hanger' | 'empty';
    shelves: string[];
}

export interface WardrobeDimensions {
    width: number;
    height: number;
    depth: number;
    boardThickness: number;
    backBoardThickness: number;
  }

  export interface WardrobeData extends WardrobeDimensions {
    segments: SegmentData[];
  }

export interface WardrobeProps {
    wardrobe: WardrobeData;
    onUpdate: (name: string, value: number) => void;
    onAddShelf: () => void;
    onRemoveShelf: () => void;
}
