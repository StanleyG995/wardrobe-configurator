export interface Wardrobe {
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  boardThickness: number;
  backBoardThickness: number;
  segments: {
    id: string;
    type: "shelves" | "hanger" | "empty";
    shelves: string[];
    doorPosition: "left" | "right";
  }[];
  caseMaterial: string;
  doorMaterial: string;
  handleType: 'straight' | 'long' | 'modern' | 'none'
}

export interface ViewportOptionsProps {
  dimensionsVisible: boolean;
  humanScaleVisible: boolean;
  humanScaleGender: "male" | "female";
  doorsOpen: boolean;
  doorsVisible: boolean;
  floorVisible: boolean;
}

export interface WardrobeState {
  wardrobe: Wardrobe;
  viewportOptions: ViewportOptionsProps;
  price: number;
  activeSegmentIdx: number | null;
  updateDimension: (key: keyof Wardrobe["dimensions"], value: number) => void;
  setActiveSegmentIdx: (idx: number | null) => void;
  handleViewportToggle: (name: keyof ViewportOptionsProps) => void;
  handleViewportGenderToggle: () => void;
  toggleOpenDoors: () => void;
  handleDoorPositionChange: (segmentIndex: number) => void;
  addShelfToSegment: (segmentIndex: number) => void;
  removeShelfFromSegment: (segmentIndex: number) => void;
  changeSegmentType: (segmentIndex: number, newType: "shelves" | "hanger" | "empty") => void;
}