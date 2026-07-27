import { create } from "zustand";
import { temporal } from "zundo";
import { calculateWardrobePrice } from "@/helpers/priceCalculator";
import { MATERIALS } from "@/config/Materials";
import { HANDLES } from '@/config/Handles';

import type { WardrobeState, Wardrobe } from "@/types/WardrobeProps";

const getMaterialPrice = (materialKey: string): number => {
  const material = MATERIALS[materialKey as keyof typeof MATERIALS];
  return material && "price" in material ? material.price : 150;
};

const getHandlePrice = (handleKey: string): number => {
  const handle = HANDLES[handleKey as keyof typeof HANDLES];
  return handle && "price" in handle ? handle.price : 50;
};

const computePrice = (wardrobe: Wardrobe): number => {
  return calculateWardrobePrice(
    wardrobe.dimensions.width,
    wardrobe.dimensions.height,
    wardrobe.dimensions.depth,
    wardrobe.segments,
    getMaterialPrice(wardrobe.caseMaterial),
    getMaterialPrice(wardrobe.doorMaterial),
    getHandlePrice(wardrobe.handleType)
  );
};

const initialWidth = 1000;
const initialHeight = 2000;
const initialDepth = 600;
const initialSegments = [
  {
    id: "1",
    type: "shelves" as const,
    shelves: [],
    doorPosition: "left" as const,
    mirror: false,
  },
  {
    id: "2",
    type: "hanger" as const,
    shelves: [],
    doorPosition: "right" as const,
    mirror: true,
  },
];
const initialCaseMaterial = "dark-wood";
const initialDoorMaterial = "dark-wood";
const initialHandleType = "straight";

const initialWardrobe: Wardrobe = {
  dimensions: {
    width: initialWidth,
    height: initialHeight,
    depth: initialDepth,
  },
  boardThickness: 18,
  backBoardThickness: 5,
  segments: initialSegments,
  caseMaterial: initialCaseMaterial,
  doorMaterial: initialDoorMaterial,
  handleType: initialHandleType,
};

export const useWardrobeStore = create<WardrobeState>()(
  temporal(
    (set) => ({
      wardrobe: initialWardrobe,
      price: computePrice(initialWardrobe),
      activeSegmentIdx: null,

      viewportOptions: {
        dimensionsVisible: true,
        humanScaleVisible: false,
        humanScaleGender: "male",
        doorsOpen: false,
        doorsVisible: true,
        floorVisible: true,
      },

      setHandleType: (type) =>
        set((state) => {
          const nextWardrobe = { ...state.wardrobe, handleType: type };
          return {
            ...state,
            price: computePrice(nextWardrobe),
            wardrobe: nextWardrobe,
          };
        }),

      setMaterial: (materialType, materialValue) =>
        set((state) => {
          const nextWardrobe = {
            ...state.wardrobe,
            [materialType]: materialValue,
          };
          return {
            ...state,
            price: computePrice(nextWardrobe),
            wardrobe: nextWardrobe,
          };
        }),

      updateDimension: (key, value) =>
        set((state) => {
          const nextDimensions = {
            ...state.wardrobe.dimensions,
            [key]: value,
          };

          let nextSegments = [...state.wardrobe.segments];

          if (key === "width") {
            const targetSegmentCount =
              value < 700 ? 1 : value < 1400 ? 2 : value < 2100 ? 3 : value < 2800 ? 4 : 5;

            const currentCount = nextSegments.length;

            if (targetSegmentCount > currentCount) {
              const segmentsToAdd = Array.from({
                length: targetSegmentCount - currentCount,
              }).map((_, i) => ({
                id: `segment-${currentCount + i}-${crypto.randomUUID().slice(0, 4)}`,
                type: "shelves" as const,
                shelves: [],
                doorPosition: "right" as const,
                mirror: false,
              }));
              nextSegments = [...nextSegments, ...segmentsToAdd];
            } else if (targetSegmentCount < currentCount) {
              nextSegments = nextSegments.slice(0, targetSegmentCount);
            }
          }

          const nextWardrobe = {
            ...state.wardrobe,
            dimensions: nextDimensions,
            segments: nextSegments,
          };

          return {
            ...state,
            price: computePrice(nextWardrobe),
            wardrobe: nextWardrobe,
          };
        }),

      setActiveSegmentIdx: (idx) => set(() => ({ activeSegmentIdx: idx })),

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
              doorPosition: (seg.doorPosition === "left" ? "right" : "left") as "left" | "right",
            };
          });

          const nextWardrobe = { ...state.wardrobe, segments: updatedSegments };
          return {
            ...state,
            price: computePrice(nextWardrobe),
            wardrobe: nextWardrobe,
          };
        }),

      addShelfToSegment: (segmentIndex) =>
        set((state) => {
          const currentSegment = state.wardrobe.segments[segmentIndex];
          if (!currentSegment || currentSegment.type !== "shelves") return state;

          const minShelfGap = 450;
          const usableHeight =
            state.wardrobe.dimensions.height -
            2 * state.wardrobe.boardThickness -
            currentSegment.shelves.length * state.wardrobe.boardThickness;

          const potentialGap =
            (usableHeight - state.wardrobe.boardThickness) /
            (currentSegment.shelves.length + 1);

          if (potentialGap <= minShelfGap) return state;

          const updatedSegments = state.wardrobe.segments.map((seg, idx) => {
            if (idx !== segmentIndex) return seg;
            return {
              ...seg,
              shelves: [...seg.shelves, crypto.randomUUID()],
            };
          });

          const nextWardrobe = { ...state.wardrobe, segments: updatedSegments };
          return {
            ...state,
            price: computePrice(nextWardrobe),
            wardrobe: nextWardrobe,
          };
        }),

      removeShelfFromSegment: (segmentIndex) =>
        set((state) => {
          const currentSegment = state.wardrobe.segments[segmentIndex];
          if (!currentSegment || currentSegment.shelves.length === 0) return state;

          const updatedSegments = state.wardrobe.segments.map((seg, idx) => {
            if (idx !== segmentIndex) return seg;
            return {
              ...seg,
              shelves: seg.shelves.slice(0, -1),
            };
          });

          const nextWardrobe = { ...state.wardrobe, segments: updatedSegments };
          return {
            ...state,
            price: computePrice(nextWardrobe),
            wardrobe: nextWardrobe,
          };
        }),

      changeSegmentType: (segmentIndex, newType) =>
        set((state) => {
          const updatedSegments = state.wardrobe.segments.map((seg, idx) => {
            if (idx !== segmentIndex) return seg;
            return {
              ...seg,
              type: newType,
              shelves: [],
            };
          });

          const nextWardrobe = { ...state.wardrobe, segments: updatedSegments };
          return {
            ...state,
            price: computePrice(nextWardrobe),
            wardrobe: nextWardrobe,
          };
        }),

      toggleDoorMirror: (segmentIndex) =>
        set((state) => {
          const updatedSegments = state.wardrobe.segments.map((seg, idx) => {
            if (idx !== segmentIndex) return seg;
            return {
              ...seg,
              mirror: !seg.mirror,
            };
          });

          const nextWardrobe = { ...state.wardrobe, segments: updatedSegments };
          return {
            ...state,
            price: computePrice(nextWardrobe),
            wardrobe: nextWardrobe,
          };
        }),

      isSidebarOpen: true,
      toggleSidebar: () =>
        set((state) => ({
          ...state,
          isSidebarOpen: !state.isSidebarOpen,
        })),
      setSidebarOpen: (isOpen) =>
        set((state) => ({
          ...state,
          isSidebarOpen: isOpen,
        })),
    }),
    {
      partialize: (state) => ({ wardrobe: state.wardrobe }),
      equality: (currentState, nextState) => {
        return JSON.stringify(currentState.wardrobe) === JSON.stringify(nextState.wardrobe);
      },
    },
  ),
);