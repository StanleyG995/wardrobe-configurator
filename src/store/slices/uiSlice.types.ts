export interface ViewportOptions {
  dimensionsVisible: boolean;
  humanScaleVisible: boolean;
  humanScaleGender: "male" | "female";
  doorsOpen: boolean;
  doorsVisible: boolean;
  floorVisible: boolean;
}

export interface UISlice {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  viewportOptions: ViewportOptions;
  handleViewportToggle: (name: keyof ViewportOptions) => void;
  handleViewportGenderToggle: () => void;
  toggleOpenDoors: () => void;
}