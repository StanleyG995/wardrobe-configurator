"use client";

import { useWardrobeStore } from "@/store/useWardrobeStore";

const Sidebar = () => {
  const wardrobe = useWardrobeStore((state) => state.wardrobe);
  const {
    updateDimension,
    activeSegmentIdx,
    setActiveSegmentIdx,
    price,
    changeSegmentType,
    addShelfToSegment,
    removeShelfFromSegment,
    handleDoorPositionChange,
    setMaterial,
	setHandleType,
  } = useWardrobeStore((state) => state);

  const activeSegment =
    activeSegmentIdx !== null ? wardrobe.segments[activeSegmentIdx] : null;

  return (
    <div className="flex flex-col gap-1 text-white">
      <div className="flex flex-col pb-2 text-[56px] text-blue-400">
        <p className="text-[56px] leading-none font-[700]">
          {price} <span className="text-[16px] text-blue-400">PLN</span>
        </p>
      </div>
      <div className="align-center flex flex-row justify-start gap-4 pb-2">
        <label htmlFor="width" className="w-full">
          Width: <strong>{wardrobe.dimensions.width} mm</strong>
        </label>
        <input
          name="width"
          id="width"
          type="range"
          className="w-full cursor-pointer rounded-lg accent-blue-600"
          max="2400"
          min="500"
          value={wardrobe.dimensions.width}
          onChange={(e) => updateDimension("width", parseFloat(e.target.value))}
        />
      </div>

      <div className="align-center flex flex-row justify-start gap-4 pb-2">
        <label htmlFor="height" className="w-full">
          Height: <strong>{wardrobe.dimensions.height} mm</strong>
        </label>
        <input
          name="height"
          id="height"
          type="range"
          className="w-full cursor-pointer rounded-lg accent-blue-600"
          max="2700"
          min="1800"
          value={wardrobe.dimensions.height}
          onChange={(e) =>
            updateDimension("height", parseFloat(e.target.value))
          }
        />
      </div>

      <div className="align-center flex flex-row justify-start gap-4 pb-3">
        <label htmlFor="depth" className="w-full">
          Depth: <strong>{wardrobe.dimensions.depth} mm</strong>
        </label>
        <input
          name="depth"
          id="depth"
          type="range"
          className="w-full cursor-pointer rounded-lg accent-blue-600"
          max="700"
          min="450"
          value={wardrobe.dimensions.depth}
          onChange={(e) => updateDimension("depth", parseFloat(e.target.value))}
        />
      </div>

      <div className="align-center flex flex-row justify-start gap-4 pb-4">
        <span>
          Thickness: <strong>{wardrobe.boardThickness} mm</strong>
        </span>
      </div>

	<select
 	 value={wardrobe.handleType}
  	onChange={(e) => setHandleType(e.target.value as "straight" | "long" | "none")}
  	className="border border-white/20 rounded p-2 w-full bg-neutral-900 text-white"
>
  <option value="straight">Straight Handle</option>
  <option value="long">Long Design Handle</option>
  <option value="none">No Handles (Push-to-open)</option>
</select>

<select
 	 value={wardrobe.caseMaterial}
  	onChange={(e) => setMaterial('caseMaterial', e.target.value)}
  	className="border border-white/20 rounded p-2 w-full bg-neutral-900 text-white"
>
  <option value="dark-wood">Dark Wood</option>
  <option value="light-wood">Light Wood</option>
  <option value="white">White</option>
  <option value="black">Black</option>
  <option value="graphite">Graphite</option>
</select>

<select
 	 value={wardrobe.doorMaterial}
  	onChange={(e) => setMaterial('doorMaterial', e.target.value)}
  	className="border border-white/20 rounded p-2 w-full bg-neutral-900 text-white"
>
  <option value="dark-wood">Dark Wood</option>
  <option value="light-wood">Light Wood</option>
  <option value="white">White</option>
  <option value="black">Black</option>
  <option value="graphite">Graphite</option>
  <option value="glass">Glass</option>
</select>


      <hr className="my-2 border-white/40" />

      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold tracking-wider text-[#eeeeff] uppercase">
          Internal Configuration
        </h3>
        <div className="height-[300px] flex w-full flex-row flex-nowrap">
          {wardrobe.segments?.map((segment, idx) => (
            <div
              key={segment.id}
              onClick={() => setActiveSegmentIdx(idx)}
              className={
                segment.id === activeSegment?.id
                  ? "align-center flex h-[300px] w-[25%] cursor-pointer flex-col items-center justify-center gap-2 border border-gray-200 bg-blue-500 p-2 transition-all"
                  : "align-center flex h-[300px] w-[25%] cursor-pointer flex-col items-center justify-center gap-2 border border-gray-200 bg-black/20 p-2 transition-all hover:bg-white/5"
              }
            >
              <div className="flex flex-col">
                <span
                  className={
                    segment.id === activeSegment?.id
                      ? "font-semibold text-white"
                      : "font-semibold text-blue-500"
                  }
                >
                  Bay {idx + 1}
                </span>
              </div>
              <span className="rounded bg-black/50 px-2 py-0.5 text-[14px] text-white/70">
                {segment.type === "shelves"
                  ? `${segment.shelves.length} shelves`
                  : segment.type}
              </span>
            </div>
          ))}
        </div>
      </div>
      {activeSegmentIdx !== null && activeSegment && (
        <div className="animate-fade-in flex flex-col gap-4 pt-3 text-white">
          <div className="flex flex-col gap-1 pb-1">
            <h2 className="text-[20px] font-bold text-blue-400">
              Bay {activeSegmentIdx + 1} Configuration
            </h2>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[14px] font-medium text-white">
              Layout Type:
            </label>
            <select
              value={activeSegment?.type || "shelves"}
              onChange={(e) =>
                changeSegmentType(
                  activeSegmentIdx,
                  e.target.value as "shelves" | "hanger" | "empty",
                )
              }
              className="w-full rounded border border-gray-300 bg-neutral-900 p-2 text-white outline-none"
            >
              <option value="shelves">Shelves</option>
              <option value="hanger">Hanger Rod</option>
              <option value="empty">Empty Space</option>
            </select>
          </div>

          {activeSegment?.type === "shelves" && (
            <div className="mt-1 flex flex-col gap-2">
              <label className="text-[14px] text-white/70">
                Shelves in section:{" "}
                <strong>{activeSegment.shelves.length}</strong>
              </label>
              <div className="flex flex-row gap-2">
                <button
                  onClick={() => removeShelfFromSegment(activeSegmentIdx)}
                  className="w-full cursor-pointer rounded-md bg-[#E04646] px-3 py-2 text-[14px] text-white transition-colors hover:bg-red-600"
                >
                  - Remove Shelf
                </button>
                <button
                  onClick={() => addShelfToSegment(activeSegmentIdx)}
                  className="w-full cursor-pointer rounded-md bg-[#2b7fff] px-3 py-2 text-[14px] text-white transition-colors hover:bg-blue-600"
                >
                  + Add Shelf
                </button>
              </div>
            </div>
          )}
          <button
            onClick={() => handleDoorPositionChange(activeSegmentIdx)}
            className="w-full cursor-pointer rounded-md border border-white/20 bg-white/10 py-2.5 text-[14px] text-white transition-all hover:bg-white/20"
          >
            Change door position: <strong>{activeSegment.doorPosition}</strong>
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
