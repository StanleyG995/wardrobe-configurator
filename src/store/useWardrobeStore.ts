import { create } from "zustand";
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
const initialSegments: Wardrobe["segments"] = [
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

const initialWardrobe: Wardrobe = {
  dimensions: {
    width: initialWidth,
    height: initialHeight,
    depth: initialDepth,
  },
  boardThickness: 18,
  backBoardThickness: 5,
  segments: initialSegments,
  caseMaterial: "dark-wood",
  doorMaterial: "dark-wood",
  handleType: "straight",
};

const calculateSegmentsForWidth = (value: number, currentSegments: Wardrobe["segments"]): Wardrobe["segments"] => {
  let nextSegments = [...currentSegments];
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
      doorPosition: "right" as ("left" | "right"),
      mirror: false,
    }));
    nextSegments = [...nextSegments, ...segmentsToAdd];
  } else if (targetSegmentCount < currentCount) {
    nextSegments = nextSegments.slice(0, targetSegmentCount);
  }
  return nextSegments;
};

export const useWardrobeStore = create<WardrobeState>()((set, get) => ({
  wardrobe: initialWardrobe,
  price: computePrice(initialWardrobe),
  activeSegmentIdx: null,

  history: [],
  future: [],

  saveToHistory: () => {
    const { history, wardrobe } = get();
    const wardrobeCopy: Wardrobe = JSON.parse(JSON.stringify(wardrobe));

    const lastHistoryItem = history[history.length - 1];
    if (lastHistoryItem && JSON.stringify(lastHistoryItem) === JSON.stringify(wardrobeCopy)) {
      return;
    }

    set({
      history: [...history, wardrobeCopy],
      future: [],
    });
  },

  undo: () => {
    const { history, wardrobe, future } = get();
    if (history.length === 0) return;

    const previous = history[history.length - 1];
    const newHistory = history.slice(0, history.length - 1);
    const currentCopy: Wardrobe = JSON.parse(JSON.stringify(wardrobe));

    set({
      wardrobe: previous,
      price: computePrice(previous),
      history: newHistory,
      future: [currentCopy, ...future],
    });
  },

  redo: () => {
    const { history, wardrobe, future } = get();
    if (future.length === 0) return;

    const next = future[0];
    const newFuture = future.slice(1);
    const currentCopy: Wardrobe = JSON.parse(JSON.stringify(wardrobe));

    set({
      wardrobe: next,
      price: computePrice(next),
      history: [...history, currentCopy],
      future: newFuture,
    });
  },

  updateDimensionPreview: (key, value) =>
    set((state) => {
      const nextDimensions = { ...state.wardrobe.dimensions, [key]: value };
      let nextSegments = [...state.wardrobe.segments];
      if (key === "width") {
        nextSegments = calculateSegmentsForWidth(value, nextSegments);
      }
      const nextWardrobe: Wardrobe = {
        ...state.wardrobe,
        dimensions: nextDimensions,
        segments: nextSegments,
      };
      return {
        price: computePrice(nextWardrobe),
        wardrobe: nextWardrobe,
      };
    }),

  commitDimension: (key, value) => {
    get().updateDimensionPreview(key, value);
  },

  updateDimension: (key, value) => {
    get().commitDimension(key, value);
  },

  setHandleType: (type) => {
    get().saveToHistory();
    set((state) => {
      const nextWardrobe = { ...state.wardrobe, handleType: type };
      return { price: computePrice(nextWardrobe), wardrobe: nextWardrobe };
    });
  },

  setMaterial: (materialType, materialValue) => {
    get().saveToHistory();
    set((state) => {
      const nextWardrobe = { ...state.wardrobe, [materialType]: materialValue };
      return { price: computePrice(nextWardrobe), wardrobe: nextWardrobe };
    });
  },

  

  setActiveSegmentIdx: (idx) => set(() => ({ activeSegmentIdx: idx })),

  handleViewportToggle: (name) =>
    set((state) => ({
      viewportOptions: {
        ...state.viewportOptions,
        [name]: !state.viewportOptions[name],
      },
    })),

  handleViewportGenderToggle: () =>
    set((state) => ({
      viewportOptions: {
        ...state.viewportOptions,
        humanScaleGender: state.viewportOptions.humanScaleGender === "male" ? "female" : "male",
      },
    })),

  toggleOpenDoors: () =>
    set((state) => {
      const nextDoorsOpen = !state.viewportOptions.doorsOpen;
      return {
        viewportOptions: {
          ...state.viewportOptions,
          doorsOpen: nextDoorsOpen,
        },
      };
    }),

  handleDoorPositionChange: (segmentIndex) => {
    get().saveToHistory();
    set((state) => {
      const updatedSegments = state.wardrobe.segments.map((seg, idx) => {
        if (idx !== segmentIndex) return seg;
        return { ...seg, doorPosition: (seg.doorPosition === "left" ? "right" : "left") as ("left" | "right") };
      });
      const nextWardrobe = { ...state.wardrobe, segments: updatedSegments };
      return { price: computePrice(nextWardrobe), wardrobe: nextWardrobe };
    });
  },

  addShelfToSegment: (segmentIndex) => {
    const state = get();
    const currentSegment = state.wardrobe.segments[segmentIndex];
    if (!currentSegment || currentSegment.type !== "shelves") return;

    get().saveToHistory();
    set((state) => {
      const updatedSegments = state.wardrobe.segments.map((seg, idx) => {
        if (idx !== segmentIndex) return seg;
        return { ...seg, shelves: [...seg.shelves, crypto.randomUUID()] };
      });
      const nextWardrobe = { ...state.wardrobe, segments: updatedSegments };
      return { price: computePrice(nextWardrobe), wardrobe: nextWardrobe };
    });
  },

  removeShelfFromSegment: (segmentIndex) => {
    const state = get();
    const currentSegment = state.wardrobe.segments[segmentIndex];
    if (!currentSegment || currentSegment.shelves.length === 0) return;

    get().saveToHistory();
    set((state) => {
      const updatedSegments = state.wardrobe.segments.map((seg, idx) => {
        if (idx !== segmentIndex) return seg;
        return { ...seg, shelves: seg.shelves.slice(0, -1) };
      });
      const nextWardrobe = { ...state.wardrobe, segments: updatedSegments };
      return { price: computePrice(nextWardrobe), wardrobe: nextWardrobe };
    });
  },

  changeSegmentType: (segmentIndex, newType) => {
    get().saveToHistory();
    set((state) => {
      const updatedSegments = state.wardrobe.segments.map((seg, idx) => {
        if (idx !== segmentIndex) return seg;
        return { ...seg, type: newType, shelves: [] };
      });
      const nextWardrobe = { ...state.wardrobe, segments: updatedSegments };
      return { price: computePrice(nextWardrobe), wardrobe: nextWardrobe };
    });
  },

  toggleDoorMirror: (segmentIndex) => {
    get().saveToHistory();
    set((state) => {
      const updatedSegments = state.wardrobe.segments.map((seg, idx) => {
        if (idx !== segmentIndex) return seg;
        return { ...seg, mirror: !seg.mirror };
      });
      const nextWardrobe = { ...state.wardrobe, segments: updatedSegments };
      return { price: computePrice(nextWardrobe), wardrobe: nextWardrobe };
    });
  },

  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),

  viewportOptions: {
    dimensionsVisible: true,
    humanScaleVisible: false,
    humanScaleGender: "male",
    doorsOpen: false,
    doorsVisible: true,
    floorVisible: true,
  },
}));