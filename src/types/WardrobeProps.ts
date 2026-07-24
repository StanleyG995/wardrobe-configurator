export interface HandleType {
    handleType: 'straight' | 'knob' | 'none'; 
}

export interface Material {
    material: string;
}

export interface MaterialConfig {
    textureUrl?: string;
    color?: string;
    metalness: number;
    roughness: number;
    price: number,
}

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
    mirror: boolean,
  }[];
  caseMaterial: Material["material"];
  doorMaterial: Material["material"];
  handleType: HandleType["handleType"];
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
  setHandleType: (type: 'straight' | 'knob' | 'none') => void;
  setMaterial: (materialType: 'caseMaterial' | 'doorMaterial', materialValue: string) => void;
  toggleDoorMirror: (segmentIndex: number) => void
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
}