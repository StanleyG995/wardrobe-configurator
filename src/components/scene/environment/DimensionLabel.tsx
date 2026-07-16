"use client";

import { useRef, useCallback } from "react";
import { Html, Line } from "@react-three/drei";
import { DimensionProps } from "@/types/DimensionProps";
import { cn } from "@/helpers/cn";

const LINE_COLOR = "black";
const LINE_WIDTH = 1;
const CAP_SIZE = 0.05;

function DimensionLabel({ name, position, value, label, linePositionStart, linePositionEnd, axis, onUpdate, min, max }: DimensionProps) {
  const [sX, sY, sZ] = linePositionStart;
  const [eX, eY, eZ] = linePositionEnd;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleValidateAndSubmit = () => {
    const inputEl = inputRef.current;
    if (!inputEl) return;

    const parsed = parseFloat(inputEl.value);

    if (!isNaN(parsed)) {
      const clampedValue = Math.max(min, Math.min(max, parsed));
      onUpdate(name, clampedValue);
      inputEl.value = clampedValue.toString();
    } else {
      inputEl.value = value.toString();
    }
  };

  const getCapPoints = useCallback(
    (x: number, y: number, z: number): [[number, number, number], [number, number, number]] => {
      if (axis === "x")
        return [
          [x + CAP_SIZE, y, z],
          [x - CAP_SIZE, y, z],
        ];
      if (axis === "y")
        return [
          [x, y + CAP_SIZE, z],
          [x, y - CAP_SIZE, z],
        ];
      return [
        [x, y, z + CAP_SIZE],
        [x, y, z - CAP_SIZE],
      ];
    },
    [axis],
  );

  const stopPropagation = (e: React.MouseEvent | React.PointerEvent) => {
    e.stopPropagation();
  };

  return (
    <group>
      <Html position={position} center>
        <div onPointerDown={stopPropagation} onMouseDown={stopPropagation} onPointerUp={stopPropagation} className={STYLES.label}>
          {label}:{" "}
          <input
            ref={inputRef}
            name={name}
            type="number"
            key={value}
            defaultValue={value}
            className={STYLES.input}
            onBlur={handleValidateAndSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.currentTarget.blur();
              }
              if (e.key === "Escape") {
                if (inputRef.current) {
                  inputRef.current.value = value.toString();
                }
                e.currentTarget.blur();
              }
            }}
          />{" "}
          mm
        </div>
      </Html>

      <Line lineWidth={LINE_WIDTH} color={LINE_COLOR} points={[linePositionStart, linePositionEnd]} />
      <Line lineWidth={LINE_WIDTH} color={LINE_COLOR} points={getCapPoints(sX, sY, sZ)} />
      <Line lineWidth={LINE_WIDTH} color={LINE_COLOR} points={getCapPoints(eX, eY, eZ)} />
    </group>
  );
}

const STYLES = {
  // cn function needed for prettier tailwind class sorting
  label: cn(
    "flex cursor-pointer items-center justify-start gap-1 border border-black-800 bg-gray-100 px-3 py-2 text-[12px] text-black-800 transition-all duration-200 outline-none focus-within:border-black-800 focus-within:bg-black-800 focus-within:text-gray-100",
  ),
  input: cn(
    "w-12 [appearance:textfield] border-none bg-transparent px-2 text-center outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
  ),
};

export default DimensionLabel;
