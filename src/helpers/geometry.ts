import type { Wardrobe } from "@/types/WardrobeProps";

export const initialWidth = 1000;
export const initialHeight = 2000;
export const initialDepth = 600;
export const initialSegments: Wardrobe["segments"] = [
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

export const initialWardrobe: Wardrobe = {
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

export const calculateSegmentsForWidth = (value: number, currentSegments: Wardrobe["segments"]): Wardrobe["segments"] => {
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