"use client";

import { useWardrobeStore } from "@/store/useWardrobeStore";
import InputText from "@/components/ui/InputText";
import InputRange from "@/components/ui/InputRange";

const Sidebar = () => {
  const wardrobe = useWardrobeStore((state) => state.wardrobe);
  const {
    updateDimension,
    activeSegmentIdx,
    setActiveSegmentIdx,
    changeSegmentType,
    addShelfToSegment,
    removeShelfFromSegment,
    handleDoorPositionChange,
    setMaterial,
    setHandleType,
    toggleDoorMirror,
  } = useWardrobeStore((state) => state);

  const activeSegment =
    activeSegmentIdx !== null ? wardrobe.segments[activeSegmentIdx] : null;

  const handleUpdateDimension = useWardrobeStore(
    (state) => state.updateDimension,
  );

  return (
  
    <div className="flex h-full w-full flex-col gap-6 overflow-y-auto p-6 text-black-500">
      <h1 className='text-black-900 text-[32px] font-[600]'>Configuration:</h1>
      <h2 className="text-black-900 text-[24px] font-[600]">
        Case dimensions:
      </h2>
      <div className="border-black-300 flex flex-col gap-2 border-b pb-6">
        <div className="align-center flex flex-col justify-start gap-2 pb-2">
          <label
            htmlFor="width"
            className="flex w-full flex-row items-center justify-start gap-2"
          >
            Width:{" "}
            <InputText
              name="width"
              id="width"
              min={500}
              max={2400}
              value={wardrobe.dimensions.width}
              onUpdate={handleUpdateDimension}
            />
            <span className="text-black-900">mm</span>
          </label>
          <InputRange
            name="width"
            id="width-range"
            min={500}
            max={2400}
            value={wardrobe.dimensions.width}
            onUpdate={(key, value) => updateDimension(key, value)}
          />
          <div className="flex flex-row justify-between gap-2">
            <span className="w-50 text-[14px]">500 mm</span>
            <span className="w-50 text-right text-[14px]">2400 mm</span>
          </div>
        </div>

        <div className="align-center flex flex-col justify-start gap-2 pb-2">
          <label
            htmlFor="height"
            className="flex w-full flex-row items-center justify-start gap-2"
          >
            Height:{" "}
            <InputText
              name="height"
              id="height"
              min={1800}
              max={2600}
              value={wardrobe.dimensions.height}
              onUpdate={handleUpdateDimension}
            />
            <span className="text-black-900">mm</span>
          </label>
          <InputRange
            name="height"
            id="height-range"
            min={1800}
            max={2600}
            value={wardrobe.dimensions.height}
            onUpdate={(key, value) => updateDimension(key, value)}
          />
          <div className="flex flex-row justify-between gap-2">
            <span className="w-50 text-[14px]">1800 mm</span>
            <span className="w-50 text-right text-[14px]">2700 mm</span>
          </div>
        </div>

        <div className="align-center flex flex-col justify-start gap-4">
          <label
            htmlFor="depth"
            className="flex w-full flex-row items-center justify-start gap-2"
          >
            Depth:{" "}
            <InputText
              name="depth"
              id="depth"
              min={400}
              max={800}
              value={wardrobe.dimensions.depth}
              onUpdate={handleUpdateDimension}
            />
            <span className="text-black-900"> mm</span>
          </label>
          <InputRange
            name="depth"
            id="depth-range"
            min={400}
            max={800}
            value={wardrobe.dimensions.depth}
            onUpdate={(key, value) => updateDimension(key, value)}
          />
          <div className="flex flex-row justify-between gap-2">
            <span className="w-50 text-[14px]">40 mm</span>
            <span className="w-50 text-right text-[14px]">80 mm</span>
          </div>
        </div>
      </div>

      <div className="border-black-300 flex flex-col gap-2 border-b pb-6">
        <h2 className="text-black-900 text-[24px] font-[600]">
          Materials & Handles:
        </h2>

        <label
          htmlFor="handleType"
          className="flex w-full flex-row items-center justify-start gap-2"
        >
          Handle Type:{" "}
        </label>
        <select
          id="handleType"
          value={wardrobe.handleType}
          onChange={(e) =>
            setHandleType(e.target.value as "straight" | "long" | "none")
          }
          className="border-black-400 bg-white-700 text-black-900 w-full border-1 p-2 outline-none"
        >
          <option value="straight">Straight Handle</option>
          <option value="long">Long Design Handle</option>
          <option value="none">No Handles (Push-to-open)</option>
        </select>

        <label
          htmlFor="caseMaterial"
          className="flex w-full flex-row items-center justify-start gap-2"
        >
          Case Material:{" "}
        </label>

        <select
          id="caseMaterial"
          value={wardrobe.caseMaterial}
          onChange={(e) => setMaterial("caseMaterial", e.target.value)}
          className="border-black-400 bg-white-700 text-black-900 w-full border-1 p-2 outline-none"
        >
          <option value="dark-wood">Dark Wood</option>
          <option value="light-wood">Light Wood</option>
          <option value="white">White</option>
          <option value="black">Black</option>
          <option value="graphite">Graphite</option>
        </select>

        <label
          htmlFor="doorMaterial"
          className="flex w-full flex-row items-center justify-start gap-2"
        >
          Door Material:{" "}
        </label>
        <select
          id="doorMaterial"
          value={wardrobe.doorMaterial}
          onChange={(e) => setMaterial("doorMaterial", e.target.value)}
          className="border-black-400 bg-white-700 text-black-900 w-full border-1 p-2 outline-none"
        >
          <option value="dark-wood">Dark Wood</option>
          <option value="light-wood">Light Wood</option>
          <option value="white">White</option>
          <option value="black">Black</option>
          <option value="graphite">Graphite</option>
          <option value="glass">Glass</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-black-900 text-[24px] font-[600]">
          Segment:
        </h2>
        <div className="height-[100px] flex w-full flex-row flex-nowrap">
          {wardrobe.segments?.map((segment, idx) => (
            <div
              key={segment.id}
              onClick={() => setActiveSegmentIdx(idx)}
              className={
                segment.id === activeSegment?.id
                  ? "align-center border-black-400 transition-box border-b-brand-500 flex h-[100px] w-[25%] cursor-pointer flex-col items-center justify-center gap-2 border border-b-[10px] p-2 transition-all"
                  : "align-center border-black-400 flex h-[100px] w-[25%] cursor-pointer flex-col items-center justify-center gap-2 border p-2 transition-all"
              }
            >
              <div className="flex flex-col">
                <span className="text-black-800 font-semibold">
                  Bay {idx + 1}
                </span>
              </div>
              <span className="text-black-600 border-1 border-gray-400 bg-gray-200 px-2 py-0.5 text-[14px]">
                {segment.type === "shelves"
                  ? `${segment.shelves.length} shelves`
                  : segment.type}
              </span>
            </div>
          ))}
        </div>
      </div>

      {activeSegmentIdx !== null && activeSegment && (
        <div className="animate-fade-in flex flex-col gap-2 pt-2">
          <div className="border-black-800 flex flex-col gap-1 border-b pb-2">
            <h3 className="text-black-900 text-[18px] font-[600]">
              Bay {activeSegmentIdx + 1} Configuration
            </h3>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="segmentType"
              className="flex w-full flex-row items-center justify-start gap-2"
            >
              Segment Type:{" "}
            </label>
            <select
              id="segmentType"
              value={activeSegment?.type || "shelves"}
              onChange={(e) =>
                changeSegmentType(
                  activeSegmentIdx,
                  e.target.value as "shelves" | "hanger" | "empty",
                )
              }
              className="border-black-400 bg-white-700 text-black-900 w-full border-1 p-2 outline-none"
            >
              <option value="shelves">Shelves</option>
              <option value="hanger">Hanger Rod</option>
              <option value="empty">Empty Space</option>
            </select>
          </div>

          {activeSegment?.type === "shelves" && (
            <div className="mt-1 flex flex-col gap-2">
              <label className="text-[14px] text-black-800">
                Shelves in section:{" "}
                <strong>{activeSegment.shelves.length}</strong>
              </label>
              <div className="flex flex-row gap-2">
                <button
                  onClick={() => removeShelfFromSegment(activeSegmentIdx)}
                  className="border-black-400 bg-white-700 text-black-900 w-full border-1 p-2 outline-none cursor-pointer"
                >
                  - Remove Shelf
                </button>
                <button
                  onClick={() => addShelfToSegment(activeSegmentIdx)}
                  className="border-black-400 bg-white-700 text-black-900 w-full border-1 p-2 outline-none cursor-pointer"
                >
                  + Add Shelf
                </button>
              </div>
            </div>
          )}
          <button
            onClick={() => handleDoorPositionChange(activeSegmentIdx)}
            className="border-black-400 bg-white-700 text-black-900 w-full border-1 p-2 outline-none cursor-pointer"
          >
            Change door position: <strong>{activeSegment.doorPosition}</strong>
          </button>

          <button
            onClick={() => toggleDoorMirror(activeSegmentIdx)}
            className="border-black-400 bg-white-700 text-black-900 w-full border-1 p-2 outline-none cursor-pointer"
          >
            Has mirror: <strong>{activeSegment.mirror ? "Yes" : "No"}</strong>
          </button>
        </div>
      )}

    </div>
  );
};

export default Sidebar;