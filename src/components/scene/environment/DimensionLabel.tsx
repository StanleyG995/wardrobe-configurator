"use client";

import { useRef, useCallback } from "react";
import { Html, Line } from "@react-three/drei";
import { DimensionProps } from "@/types/DimensionProps";
import { cn } from "@/helpers/cn";
import InputText from "@/components/ui/primitives/InputText";

const LINE_COLOR = "black";
const LINE_WIDTH = 1;
const CAP_SIZE = 0.05;

function DimensionLabel({ name, position, value, label, linePositionStart, linePositionEnd, axis, onUpdate, min, max }: DimensionProps) {
  const [sX, sY, sZ] = linePositionStart;
  const [eX, eY, eZ] = linePositionEnd;

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

  return (
    <group>
      <Html position={position} center>
        <InputText
            id={name}
            name={name}
            min={min}
            max={max}
            onUpdate={onUpdate}
            value={value}
            fullWidth={false}
            dynamicWidth={true}
            size='s'
          />
      </Html>

      <Line lineWidth={LINE_WIDTH} color={LINE_COLOR} points={[linePositionStart, linePositionEnd]} />
      <Line lineWidth={LINE_WIDTH} color={LINE_COLOR} points={getCapPoints(sX, sY, sZ)} />
      <Line lineWidth={LINE_WIDTH} color={LINE_COLOR} points={getCapPoints(eX, eY, eZ)} />
    </group>
  );
}

export default DimensionLabel;
