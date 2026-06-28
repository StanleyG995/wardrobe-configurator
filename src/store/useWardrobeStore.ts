import { create } from "zustand";
import { temporal } from "zundo";

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
}

export const useWardrobeStore = create<WardrobeState>()(
  temporal(
    (set) => ({
      wardrobe: {
        dimensions: {
          width: 1000,
          height: 2000,
          depth: 600,
        },
        boardThickness: 18,
        backBoardThickness: 5,
        segments: [
          { id: "1", type: "shelves", shelves: [], doorPosition: "left" },
          { id: "2", type: "hanger", shelves: [], doorPosition: "right" },
        ],
        caseMaterial: "wood",
        doorMaterial: "wood",
      },
      price: 0,
      activeSegmentIdx: null,

      viewportOptions: {
        dimensionsVisible: true,
        humanScaleVisible: true,
        humanScaleGender: "male",
        doorsOpen: true,
        doorsVisible: true,
        floorVisible: true,
      },

      updateDimension: (key: keyof Wardrobe["dimensions"], value: number) =>
        set((state) => ({
          wardrobe: {
            ...state.wardrobe,
            dimensions: {
              ...state.wardrobe.dimensions,
              [key]: value,
            },
          },
        })),

      setActiveSegmentIdx: (idx: number | null) =>
        set((state) => ({
          wardrobe: {
            ...state.wardrobe,
            activeSegmentIdx: idx,
          },
        })),

      handleViewportToggle: (name: keyof ViewportOptionsProps) => {
        set((state) => ({
          ...state,

          viewportOptions: {
            ...state.viewportOptions,
            [name]: !state.viewportOptions[name],
          },
        }));
      },
      handleViewportGenderToggle: () =>
        set((state) => ({
          ...state,
          viewportOptions: {
            ...state.viewportOptions,
            humanScaleGender:
              state.viewportOptions.humanScaleGender === "male"
                ? "female"
                : "male",
          },
        })),
      toggleOpenDoors: () =>
        set((state) => {
          const nextDoorsOpen = !state.viewportOptions.doorsOpen;
          return {
            ...state,
            viewportOptions: {
              ...state.viewportOptions,
              doorsOpen: nextDoorsOpen,
              doorRotation: nextDoorsOpen ? [0, -Math.PI / 1.5, 0] : [0, 0, 0],
            },
          };
        }),
      handleDoorPositionChange: (segmentIndex: number) =>
        set((state) => {
          const updatedSegments = state.wardrobe.segments.map((seg, idx) => {
            if (idx !== segmentIndex) return seg;
            return {
              ...seg,
              doorPosition: seg.doorPosition === "left" ? "right" : "left",
            };
          });

          return {
            ...state,
            wardrobe: {
              ...state.wardrobe,
              segments: updatedSegments,
            },
          };
        }),
    }),
    {
      partialize: (state) => ({ wardrobe: state.wardrobe }),
    },
  ),
);
