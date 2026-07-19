"use client";

import { useWardrobeStore } from "@/store/useWardrobeStore";
import InputText from "@/components/ui/primitives/InputText";
import InputRange from "@/components/ui/primitives/InputRange";
import Select from "@/components/ui/primitives/Select";
import { cn } from "@/helpers/cn";
import { RxDimensions, RxLayers, RxLayout } from "react-icons/rx";

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

  const activeSegment = activeSegmentIdx !== null ? wardrobe.segments[activeSegmentIdx] : null;

  const handleUpdateDimension = useWardrobeStore((state) => state.updateDimension);

  return (
    <div className={STYLES.sidebar}>
      <div className="mb-2 flex flex-row items-center gap-2">
        <h1 className={cn(STYLES.heading, STYLES.heading1)}>Customize Wardrobe</h1>
      </div>
      <div className="flex flex-row items-center gap-2">
        <RxDimensions className={STYLES.headingIcon} />
        <h2 className={cn(STYLES.heading, STYLES.heading2)}>Case dimensions</h2>
      </div>

      <div>
        <div>
          <InputText name="width" id="width" label="Width:" min={500} max={2400} value={wardrobe.dimensions.width} onUpdate={handleUpdateDimension} />
          <InputRange
            name="width"
            id="width-range"
            min={500}
            max={2400}
            value={wardrobe.dimensions.width}
            onUpdate={(key, value) => updateDimension(key, value)}
          />
        </div>

        <div>
          <InputText name="height" id="height" label="Height:" min={1800} max={2600} value={wardrobe.dimensions.height} onUpdate={handleUpdateDimension} />
          <InputRange
            name="height"
            id="height-range"
            min={1800}
            max={2600}
            value={wardrobe.dimensions.height}
            onUpdate={(key, value) => updateDimension(key, value)}
          />
        </div>

        <div>
          <InputText name="depth" id="depth" label="Depth:" min={400} max={800} value={wardrobe.dimensions.depth} onUpdate={handleUpdateDimension} />
          <InputRange
            name="depth"
            id="depth-range"
            min={400}
            max={800}
            value={wardrobe.dimensions.depth}
            onUpdate={(key, value) => updateDimension(key, value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 border-b border-black-300 pb-6">
        <div className="flex flex-row items-center gap-2">
          <RxLayers className={STYLES.headingIcon} />
          <h2 className={cn(STYLES.heading, STYLES.heading2)}>Materials & Handles</h2>
        </div>
      
        <Select
          id="handle-type"
          label="Handle Type"
          value={wardrobe.handleType}
          onChange={(val) => setHandleType(val as "straight" | "knob" | "none")}
          options={[
            { value: "straight", label: "Straight" },
            { value: "knob", label: "Knob" },
            { value: "none", label: "None" },
          ]}
        />

        <label htmlFor="caseMaterial" className={STYLES.label}>
          Case Material:{" "}
        </label>
        <select id="caseMaterial" value={wardrobe.caseMaterial} onChange={(e) => setMaterial("caseMaterial", e.target.value)} className={STYLES.select}>
          <option value="dark-wood">Dark Wood</option>
          <option value="light-wood">Light Wood</option>
          <option value="white">White</option>
          <option value="black">Black</option>
          <option value="graphite">Graphite</option>
        </select>
        <label htmlFor="doorMaterial" className={STYLES.label}>
          Door Material:{" "}
        </label>
        <select id="doorMaterial" value={wardrobe.doorMaterial} onChange={(e) => setMaterial("doorMaterial", e.target.value)} className={STYLES.select}>
          <option value="dark-wood">Dark Wood</option>
          <option value="light-wood">Light Wood</option>
          <option value="white">White</option>
          <option value="black">Black</option>
          <option value="graphite">Graphite</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2">
          <RxLayout className={STYLES.headingIcon} />
          <h2 className={cn(STYLES.heading, STYLES.heading2)}>Segments</h2>
        </div>
        <div className={STYLES.segmentBoxes}>
          {wardrobe.segments?.map((segment, idx) => (
            <div
              key={segment.id}
              onClick={() => setActiveSegmentIdx(idx)}
              className={segment.id === activeSegment?.id ? STYLES.segmentBox : STYLES.segmentBoxActive}
            >
              <div className="flex flex-col">
                <span className="font-semibold text-black-800">Bay {idx + 1}</span>
              </div>
              <span className="border-1 border-gray-400 bg-gray-200 px-2 py-0.5 text-xs text-black-600">
                {segment.type === "shelves" ? `${segment.shelves.length} shelves` : segment.type}
              </span>
            </div>
          ))}
        </div>
      </div>

      {activeSegmentIdx !== null && activeSegment && (
        <div className="animate-fade-in flex flex-col gap-2 pt-2">
          <div className="flex flex-col gap-1 border-b border-black-800 pb-2">
            <h3 className={cn(STYLES.heading, STYLES.heading3)}>Bay {activeSegmentIdx + 1} Configuration</h3>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="segmentType" className={STYLES.label}>
              Segment Type:{" "}
            </label>
            <select
              id="segmentType"
              value={activeSegment?.type || "shelves"}
              onChange={(e) => changeSegmentType(activeSegmentIdx, e.target.value as "shelves" | "hanger" | "empty")}
              className={STYLES.select}
            >
              <option value="shelves">Shelves</option>
              <option value="hanger">Hanger Rod</option>
              <option value="empty">Empty Space</option>
            </select>
          </div>

          {activeSegment?.type === "shelves" && (
            <div className="flex flex-col gap-2">
              <label className={STYLES.label}>
                Shelves in section: <strong>{activeSegment.shelves.length}</strong>
              </label>
              <div className="flex flex-row gap-2">
                <button onClick={() => removeShelfFromSegment(activeSegmentIdx)} className={STYLES.button}>
                  - Remove Shelf
                </button>
                <button onClick={() => addShelfToSegment(activeSegmentIdx)} className={STYLES.button}>
                  + Add Shelf
                </button>
              </div>
            </div>
          )}
          <button onClick={() => handleDoorPositionChange(activeSegmentIdx)} className={STYLES.button}>
            Change door position: <strong>{activeSegment.doorPosition}</strong>
          </button>

          <button onClick={() => toggleDoorMirror(activeSegmentIdx)} className={STYLES.button}>
            Has mirror: <strong>{activeSegment.mirror ? "Yes" : "No"}</strong>
          </button>
        </div>
      )}
    </div>
  );
};

const STYLES = {
  sidebar: cn("flex h-full w-full flex-col overflow-y-auto px-4 py-6 text-sm text-black-500"),
  heading: cn("font-semibold text-black-900"),
  heading1: cn("text-2xl"),
  heading2: cn("text-base tracking-wider uppercase"),
  heading3: cn("text-sm tracking-wider uppercase"),
  headingIcon: cn("text-xl text-brand-500"),
  select: cn("bg-white-700 w-full border-1 border-black-400 p-2 text-black-900 outline-none"),
  inputRange: cn('align-center pb-2" flex flex-col justify-start gap-2'),
  button: cn("bg-white-700 w-full cursor-pointer border-1 border-black-400 p-2 text-black-900 outline-none"),
  label: cn("flex w-full flex-row items-center justify-start gap-2"),
  segmentBoxes: cn("height-[100px] flex w-full flex-row flex-nowrap"),
  segmentBox: cn(
    "align-center transition-box flex h-[100px] w-[25%] cursor-pointer flex-col items-center justify-center gap-2 border border-b-[10px] border-black-400 border-b-brand-500 p-2 transition-all",
  ),
  segmentBoxActive: cn(
    "align-center flex h-[100px] w-[25%] cursor-pointer flex-col items-center justify-center gap-2 border border-black-400 p-2 transition-all",
  ),
};

export default Sidebar;
