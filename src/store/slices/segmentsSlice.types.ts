export interface SegmentsSlice {
  activeSegmentIdx: number | null;
  setActiveSegmentIdx: (idx: number | null) => void;
  handleDoorPositionChange: (segmentIndex: number) => void;
  addShelfToSegment: (segmentIndex: number) => void;
  removeShelfFromSegment: (segmentIndex: number) => void;
  changeSegmentType: (segmentIndex: number, newType: "shelves" | "hanger" | "empty") => void;
  toggleDoorMirror: (segmentIndex: number) => void;
}