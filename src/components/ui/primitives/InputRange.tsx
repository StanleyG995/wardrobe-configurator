"use client";
import { useState } from "react";
import { cn } from "@/helpers/cn";
import { InputRangeProps } from "@/types/InputRangeProps";
import Label from "@/components/ui/primitives/Label";

const InputRange = (InputData: InputRangeProps) => {
  const [localValue, setLocalValue] = useState<number>(InputData.value);
  const [prevValue, setPrevValue] = useState<number>(InputData.value);

  if (InputData.value !== prevValue) {
    setLocalValue(InputData.value);
    setPrevValue(InputData.value);
  }

  return (
    <div className="flex flex-col gap-2">
      {InputData.label && (
        <Label htmlFor={InputData.id}>
          {InputData.label}
        </Label>
      )}
      <input
        name={InputData.name}
        id={InputData.id}
        type="range"
        step={InputData.step || 1}
        className={STYLES.input}
        max={InputData.max}
        min={InputData.min}
        value={localValue}
        onChange={(e) => setLocalValue(parseFloat(e.target.value))}
        onMouseUp={() => InputData.onUpdate(InputData.name, localValue)}
        onTouchEnd={() => InputData.onUpdate(InputData.name, localValue)}
      />
      <div className="flex flex-row justify-between gap-2">
        <span className={STYLES.minValue}>{InputData.min} mm</span>
        <span className={STYLES.maxValue}>{InputData.max} mm</span>
      </div>
    </div>
  );
};

const STYLES = {
  // cn function needed for prettier tailwind class sorting
  input: cn(
    "w-full cursor-pointer appearance-none bg-transparent focus:outline-none",
    
    "[&::-webkit-slider-runnable-track]:h-[2px] [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-gray-300",
    
    "[&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-500 [&::-webkit-slider-thumb]:shadow-md",
    
    "[&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150 [&::-webkit-slider-thumb]:hover:scale-125",
    
    "[&::-webkit-slider-thumb]:-mt-[4px]"
  ),
  minValue: cn("w-50 text-[14px]"),
  maxValue: cn("w-50 text-right text-[14px]"),
};

export default InputRange;
