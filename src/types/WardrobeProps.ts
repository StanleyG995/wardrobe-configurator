
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
    onAddShelf: (idx: number) => void;
    onRemoveShelf: (idx: number) => void;
    onChangeSegmentType: (
      segmentIndex: number,
      type: "shelves" | "hanger" | "empty"
  ) => void,
    activeSegmentIdx: number | null,
    setActiveSegmentIdx: (idx: number | null) => void,
}
