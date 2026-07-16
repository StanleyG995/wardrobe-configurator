"use client";
import { useState } from "react";

export interface InputRangeProps {
  id: "width-range" | "height-range" | "depth-range";
  name: "width" | "height" | "depth";
  min: number;
  max: number;
  step?: number;
  value: number;
  onUpdate: (key: "width" | "height" | "depth", value: number) => void;
}

const InputRange = (InputData: InputRangeProps) => {
  const [localValue, setLocalValue] = useState<number>(InputData.value);
  const [prevValue, setPrevValue] = useState<number>(InputData.value);

  if (InputData.value !== prevValue) {
    setLocalValue(InputData.value);
    setPrevValue(InputData.value);
  }

  return (
    <input
      name={InputData.name}
      id={InputData.id}
      type="range"
      step={InputData.step || 1}
      className="accent-brand-500 w-full cursor-pointer rounded-lg"
      max={InputData.max}
      min={InputData.min}
      value={localValue}
      onChange={(e) => setLocalValue(parseFloat(e.target.value))}
      onMouseUp={() => InputData.onUpdate(InputData.name, localValue)}
      onTouchEnd={() => InputData.onUpdate(InputData.name, localValue)}
    />
  );
};

export default InputRange;

