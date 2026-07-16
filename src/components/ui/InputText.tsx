"use client";
import { useRef } from "react";

export interface InputTextProps {
  id: "width" | "height" | "depth";
  name: "width" | "height" | "depth";
  classNames?: string;
  min: number;
  max: number;
  step?: number;
  value: string | number; // Przywrócone w typach
  onUpdate: (key: "width" | "height" | "depth", value: number) => void;
}

const InputText = (InputData: InputTextProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleValidateAndSubmit = () => {
    const inputEl = inputRef.current;
    if (!inputEl) return;

    const parsed = parseFloat(inputEl.value);

    if (!isNaN(parsed)) {
      const clampedValue = Math.max(
        InputData.min,
        Math.min(InputData.max, parsed),
      );
      InputData.onUpdate(InputData.name, clampedValue);
      inputEl.value = clampedValue.toString();
    } else {
      inputEl.value = InputData.value.toString();
    }
  };

  return (
    <input
      ref={inputRef}
      id={InputData.id}
      name={InputData.name}
      type="text"
      key={InputData.value}
      defaultValue={InputData.value}
      className="text-black-800 border-black-800 w-[100px] border-1 px-2 py-1 text-center outline-none focus:ring-1"
      onBlur={handleValidateAndSubmit}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.currentTarget.blur();
        }
        if (e.key === "Escape") {
          if (inputRef.current) {
            inputRef.current.value = InputData.value.toString();
          }
          e.currentTarget.blur();
        }
      }}
    />
  );
};

export default InputText;
