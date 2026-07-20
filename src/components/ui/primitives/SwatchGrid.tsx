"use client";

import { useId } from "react";
import { cn } from "@/helpers/cn";
import { SwatchGridProps } from "@/types/SwatchGridProps";

const SwatchGrid = ({ label, options, value, onChange }: SwatchGridProps) => {
  const labelId = useId();
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div role="radiogroup" aria-labelledby={labelId} className={STYLES.wrapper}>
      <div>
        <span id={labelId}>{label}:</span>
        {selectedOption && (
          <span className={STYLES.selectedName} aria-live="polite">
            {" " + selectedOption.label}
          </span>
        )}
      </div>

      <div className={STYLES.grid}>
        {options.map((option) => {
          const isSelected = option.value === value;

          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(option.value)}
              title={option.label}
              className={cn(STYLES.swatchButton, isSelected ? STYLES.swatchActive : STYLES.swatchInactive)}
            >
              {option.img ? (
                <img src={option.img} alt="" className={STYLES.image} />
              ) : (
                <div className={STYLES.colorFill} style={{ background: option.color || "#ccc" }} />
              )}

              <span className="sr-only">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const STYLES = {
  wrapper: cn("flex w-full flex-col gap-2.5 text-gray-700 font-semibold mt-2"),

  selectedName: cn("font-bold text-gray-700"),
  grid: cn("flex flex-wrap gap-2.5"),
  swatchButton: cn(
    "relative h-12 w-12 cursor-pointer overflow-hidden rounded-md border-2 p-0.5 transition-all duration-150 outline-none",
    "focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 active:scale-95",
  ),
  swatchActive: cn("scale-105 border-brand-500 shadow-md"),
  swatchInactive: cn("border-gray-200 hover:scale-105 hover:border-gray-400"),
  image: cn("h-full w-full rounded-sm object-cover"),
  colorFill: cn("h-full w-full rounded-sm"),
};

export default SwatchGrid;
