
export interface SegmentData {
    id: string;
    type: 'shelves' | 'hanger' | 'empty';
    shelves: string[];
    doorPosition: 'left' | 'right'
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

  isOpen: boolean,
  hingeSide: 'left' | 'right'
  handleSide: 'left' | 'right'
  topOffset: number
} 

export interface HitboxProps {
	wardrobe: {
		width: number
		height: number
		depth: number
		boardThickness: number
		segments?: Array<{
			id: string
			type: "shelves" | "hanger" | "empty"
			shelves: string[]
		}>
	}
	activeSegmentIdx: number | null
	setActiveSegmentIdx: (idx: number | null) => void
}