import { create } from "zustand";
import { temporal } from "zundo";
import { calculateWardrobePrice } from "@/helpers/priceCalculator"; // Dopasuj ścieżkę do swojego projektu

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
  doorRotation?: number[];
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
        doorRotation: [0, 0, 0],
      },

      updateDimension: (key, value) =>
        set((state) => {
          const nextDimensions = {
            ...state.wardrobe.dimensions,
            [key]: value,
          };
          const nextPrice = calculateWardrobePrice(
            nextDimensions.width,
            nextDimensions.height,
            nextDimensions.depth,
            state.wardrobe.segments
          );
          return {
            ...state,
            price: nextPrice,
            wardrobe: {
              ...state.wardrobe,
              dimensions: nextDimensions,
            },
          };
        }),

      setActiveSegmentIdx: (idx) =>
        set(() => ({
          activeSegmentIdx: idx,
        })),

      handleViewportToggle: (name) =>
        set((state) => ({
          ...state,
          viewportOptions: {
            ...state.viewportOptions,
            [name]: !state.viewportOptions[name],
          },
        })),

      handleViewportGenderToggle: () =>
        set((state) => ({
          ...state,
          viewportOptions: {
            ...state.viewportOptions,
            humanScaleGender:
              state.viewportOptions.humanScaleGender === "male" ? "female" : "male",
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

      handleDoorPositionChange: (segmentIndex) =>
        set((state) => {
          const updatedSegments = state.wardrobe.segments.map((seg, idx) => {
            if (idx !== segmentIndex) return seg;
            return {
              ...seg,
                doorPosition: seg.doorPosition === "left" ? "right" : "left" as "left" | "right",
            };
          });
          const nextPrice = calculateWardrobePrice(
            state.wardrobe.dimensions.width,
            state.wardrobe.dimensions.height,
            state.wardrobe.dimensions.depth,
            updatedSegments
          );
          return {
            ...state,
            price: nextPrice,
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