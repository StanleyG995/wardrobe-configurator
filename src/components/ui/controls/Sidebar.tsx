"use client";

import { useWardrobeStore } from "@/store/useWardrobeStore";
import InputText from "@/components/ui/primitives/InputText";
import InputRange from "@/components/ui/primitives/InputRange";
import Select from "@/components/ui/primitives/Select";
import { cn } from "@/helpers/cn";
import { RxDimensions, RxLayers, RxLayout } from "react-icons/rx";
import Button from "../primitives/Button";

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
      <h1 className={cn(STYLES.heading, STYLES.heading1)}>Customize Wardrobe</h1>

      <div className={STYLES.sidebarSection}>
        <div className="flex flex-row items-center gap-2">
          <RxDimensions className={STYLES.headingIcon} />
          <h2 className={cn(STYLES.heading, STYLES.heading2)}>Case dimensions</h2>
        </div>

        <InputText name="width" id="width" label="Width:" min={500} max={2400} value={wardrobe.dimensions.width} onUpdate={handleUpdateDimension} />
        <InputRange
          name="width"
          id="width-range"
          min={500}
          max={2400}
          value={wardrobe.dimensions.width}
          onUpdate={(key, value) => updateDimension(key, value)}
        />

        <InputText name="height" id="height" label="Height:" min={1800} max={2600} value={wardrobe.dimensions.height} onUpdate={handleUpdateDimension} />
        <InputRange
          name="height"
          id="height-range"
          min={1800}
          max={2600}
          value={wardrobe.dimensions.height}
          onUpdate={(key, value) => updateDimension(key, value)}
        />

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

      <div className={STYLES.sidebarSection}>
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

        <Select
          id="handle-type"
          label="Handle Type"
          value={wardrobe.caseMaterial}
          onChange={(val) => setMaterial("caseMaterial", val)}
          options={[
            { value: "dark-wood", label: "Dark Wood" },
            { value: "light-wood", label: "Light Wood" },
            { value: "white", label: "White" },
            { value: "black", label: "Black" },
            { value: "graphite", label: "Graphite" },
          ]}
        />

        <Select
          id="door-material"
          label="Door Material"
          value={wardrobe.doorMaterial}
          onChange={(val) => setMaterial("doorMaterial", val)}
          options={[
            { value: "dark-wood", label: "Dark Wood" },
            { value: "light-wood", label: "Light Wood" },
            { value: "white", label: "White" },
            { value: "black", label: "Black" },
            { value: "graphite", label: "Graphite" },
          ]}
        />
      </div>

      <div className={STYLES.sidebarSection}>
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

        {activeSegmentIdx !== null && activeSegment && (
          <div className="animate-fade-in flex flex-col gap-2 pt-2">
            <div className="flex flex-col gap-1 border-b border-black-800 pb-2">
              <h3 className={cn(STYLES.heading, STYLES.heading3)}>Bay {activeSegmentIdx + 1} Configuration</h3>
            </div>

            <div className="flex flex-col gap-1">
              <Select
                id="segmentType"
                label="Segment Type"
                value={activeSegment?.type || "shelves"}
                onChange={(val) => changeSegmentType(activeSegmentIdx, val as "shelves" | "hanger" | "empty")}
                options={[
                  { value: "shelves", label: "Shelves" },
                  { value: "hanger", label: "Hanger Rod" },
                  { value: "empty", label: "Empty Space" },
                ]}
              />
            </div>

            {activeSegment?.type === "shelves" && (
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2">
                  <Button onClick={() => removeShelfFromSegment(activeSegmentIdx)}>
                    - Remove Shelf
                  </Button>
                  <Button onClick={() => addShelfToSegment(activeSegmentIdx)}>
                    + Add Shelf
                  </Button>
                </div>
              </div>
            )}

            <Button onClick={() => handleDoorPositionChange(activeSegmentIdx)}>
              Change door position: <strong>{activeSegment.doorPosition}</strong>
            </Button>

            <Button onClick={() => toggleDoorMirror(activeSegmentIdx)}>
              Has mirror: <strong>{activeSegment.mirror ? "Yes" : "No"}</strong>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const STYLES = {
  sidebar: cn("flex h-full w-full flex-col overflow-y-auto px-4 py-6 text-sm text-black-500"),
  sidebarSection: cn("my-4 flex flex-col gap-2 pb-2"),

  heading: cn("leading-none font-semibold text-black-900"),
  heading1: cn("text-2xl"),
  heading2: cn("text-base tracking-wider uppercase"),
  heading3: cn("text-sm tracking-wider uppercase"),
  headingIcon: cn("text-xl text-brand-500"),

  segmentBoxes: cn("height-[100px] flex w-full flex-row flex-nowra gap-2"),
  segmentBox: cn(
    "align-center transition-box flex h-[100px] w-[25%] cursor-pointer flex-col items-center justify-center gap-2 border border-b-[10px] border-black-400 border-b-brand-500 p-2 transition-all",
  ),
  segmentBoxActive: cn(
    "align-center flex h-[100px] w-[25%] cursor-pointer flex-col items-center justify-center gap-2 border border-black-400 p-2 transition-all",
  ),
};

export default Sidebar;
