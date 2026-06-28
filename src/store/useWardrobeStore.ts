import { create } from "zustand";
import { temporal } from "zundo";
import { calculateWardrobePrice } from "@/helpers/priceCalculator";



import type { WardrobeState } from "@/types/WardrobeProps";

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
        caseMaterial: 'dark-wood',
        doorMaterial: 'dark-wood',
        handleType: "straight",
      },
      price: 0,
      activeSegmentIdx: null,

      viewportOptions: {
        dimensionsVisible: true,
        humanScaleVisible: false,
        humanScaleGender: "male",
        doorsOpen: true,
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
