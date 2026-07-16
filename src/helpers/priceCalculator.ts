import type { Wardrobe } from "@/types/WardrobeProps";

const PRICE_LIST = {
  m2_plate: 150,
  m2_mirror: 300,
  shelf_item: 45,
  rod_item: 80,
  margin: 1.25,
};

export function calculateWardrobePrice(
  width: number,
  height: number,
  depth: number,
  segments: Wardrobe["segments"],
): number {
  if (!segments || !Array.isArray(segments)) return 0;

  const wM = width / 1000;
  const hM = height / 1000;
  const dM = depth / 1000;

  const backPlate = wM * hM;
  const sidePlates = 2 * (hM * dM);
  const topBottomPlates = 2 * (wM * dM);
  const internalDivisions =
    segments.length > 0 ? (segments.length - 1) * (hM * dM) : 0;

  const totalPlateArea =
    backPlate + sidePlates + topBottomPlates + internalDivisions;
  let basePrice = totalPlateArea * PRICE_LIST.m2_plate;

  let equipmentPrice = 0;
  const segmentCount = segments.length;
  
  const singleDoorWidthM = segmentCount > 0 ? wM / segmentCount : 0;

  segments.forEach((segment) => {

    if (segment.mirror) {
      const mirrorArea = singleDoorWidthM * hM;
      equipmentPrice += mirrorArea * PRICE_LIST.m2_mirror;
    }


    const shelfCount =
      segment.type === "shelves" && segment.shelves
        ? segment.shelves.length
        : 0;
    const hangerCount = segment.type === "hanger" ? 1 : 0;

    equipmentPrice += shelfCount * PRICE_LIST.shelf_item;
    equipmentPrice += hangerCount * PRICE_LIST.rod_item;
  });

  const finalPrice = (basePrice + equipmentPrice) * PRICE_LIST.margin;

  return isNaN(finalPrice) ? 0 : Number(finalPrice.toFixed(2));
}