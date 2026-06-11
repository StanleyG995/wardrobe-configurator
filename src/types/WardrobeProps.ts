
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
    doorHandle: 'string'
  }

export interface WardrobeProps {
    wardrobe: WardrobeData;
    price: number;
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

export interface DoorProps extends Omit<WardrobeDimensions, 'backBoardThickness'> {
  doorRotation: [number, number, number],
  isOpen: boolean,
} 