import { create } from "zustand";
import { temporal } from "zundo";
import { calculateWardrobePrice } from "@/helpers/priceCalculator";
import { MATERIALS } from "@/config/Materials";

import type { WardrobeState } from "@/types/WardrobeProps";

const getMaterialPrice = (materialKey: string): number => {
  const mat = MATERIALS[materialKey as keyof typeof MATERIALS];
  return mat && "price" in mat ? mat.price : 150;
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

export const useWardrobeStore = create<WardrobeState>()(
  temporal(
    (set) => ({
      wardrobe: {
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
        handleType: "straight",
      },
      price: calculateWardrobePrice(
        initialWidth,
        initialHeight,
        initialDepth,
        initialSegments,
        getMaterialPrice(initialCaseMaterial),
        getMaterialPrice(initialDoorMaterial),
      ),
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
        set((state) => ({
          ...state,
          wardrobe: {
            ...state.wardrobe,
            handleType: type,
          },
        })),

      setMaterial: (
        materialType: "caseMaterial" | "doorMaterial",
        materialValue: string,
      ) =>
        set((state) => {
          const nextWardrobe = {
            ...state.wardrobe,
            [materialType]: materialValue,
          };

          const nextPrice = calculateWardrobePrice(
            nextWardrobe.dimensions.width,
            nextWardrobe.dimensions.height,
            nextWardrobe.dimensions.depth,
            nextWardrobe.segments,
            getMaterialPrice(nextWardrobe.caseMaterial),
            getMaterialPrice(nextWardrobe.doorMaterial),
          );

          return {
            ...state,
            price: nextPrice,
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
              value < 700
                ? 1
                : value < 1400
                  ? 2
                  : value < 2100
                    ? 3
                    : value < 2800
                      ? 4
                      : 5;

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

          const nextPrice = calculateWardrobePrice(
            nextDimensions.width,
            nextDimensions.height,
            nextDimensions.depth,
            nextSegments,
            getMaterialPrice(state.wardrobe.caseMaterial),
            getMaterialPrice(state.wardrobe.doorMaterial),
          );

          return {
            ...state,
            price: nextPrice,
            wardrobe: {
              ...state.wardrobe,
              dimensions: nextDimensions,
              segments: nextSegments,
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

      handleDoorPositionChange: (segmentIndex) =>
        set((state) => {
          const updatedSegments = state.wardrobe.segments.map((seg, idx) => {
            if (idx !== segmentIndex) return seg;
            return {
              ...seg,
              doorPosition: (seg.doorPosition === "left" ? "right" : "left") as
                "left" | "right",
            };
          });
          const nextPrice = calculateWardrobePrice(
            state.wardrobe.dimensions.width,
            state.wardrobe.dimensions.height,
            state.wardrobe.dimensions.depth,
            updatedSegments,
            getMaterialPrice(state.wardrobe.caseMaterial),
            getMaterialPrice(state.wardrobe.doorMaterial),
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

      addShelfToSegment: (segmentIndex) =>
        set((state) => {
          const currentSegment = state.wardrobe.segments[segmentIndex];
          if (!currentSegment || currentSegment.type !== "shelves")
            return state;

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

          const nextPrice = calculateWardrobePrice(
            state.wardrobe.dimensions.width,
            state.wardrobe.dimensions.height,
            state.wardrobe.dimensions.depth,
            updatedSegments,
            getMaterialPrice(state.wardrobe.caseMaterial),
            getMaterialPrice(state.wardrobe.doorMaterial),
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

      removeShelfFromSegment: (segmentIndex) =>
        set((state) => {
          const currentSegment = state.wardrobe.segments[segmentIndex];
          if (!currentSegment || currentSegment.shelves.length === 0)
            return state;

          const updatedSegments = state.wardrobe.segments.map((seg, idx) => {
            if (idx !== segmentIndex) return seg;
            return {
              ...seg,
              shelves: seg.shelves.slice(0, -1),
            };
          });

          const nextPrice = calculateWardrobePrice(
            state.wardrobe.dimensions.width,
            state.wardrobe.dimensions.height,
            state.wardrobe.dimensions.depth,
            updatedSegments,
            getMaterialPrice(state.wardrobe.caseMaterial),
            getMaterialPrice(state.wardrobe.doorMaterial),
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

          const nextPrice = calculateWardrobePrice(
            state.wardrobe.dimensions.width,
            state.wardrobe.dimensions.height,
            state.wardrobe.dimensions.depth,
            updatedSegments,
            getMaterialPrice(state.wardrobe.caseMaterial),
            getMaterialPrice(state.wardrobe.doorMaterial),
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

      toggleDoorMirror: (segmentIndex) =>
        set((state) => {
          const updatedSegments = state.wardrobe.segments.map((seg, idx) => {
            if (idx !== segmentIndex) return seg;
            return {
              ...seg,
              mirror: !seg.mirror,
            };
          });
          const nextPrice = calculateWardrobePrice(
            state.wardrobe.dimensions.width,
            state.wardrobe.dimensions.height,
            state.wardrobe.dimensions.depth,
            updatedSegments,
            getMaterialPrice(state.wardrobe.caseMaterial),
            getMaterialPrice(state.wardrobe.doorMaterial),
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
        return (
          JSON.stringify(currentState.wardrobe) ===
          JSON.stringify(nextState.wardrobe)
        );
      },
    },
  ),
);
