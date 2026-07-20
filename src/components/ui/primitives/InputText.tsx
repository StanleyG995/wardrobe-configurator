"use client";
import { useRef } from "react";
import { cn } from "@/helpers/cn";
import { InputTextProps } from "@/types/InputTextProps";
import Label from "@/components/ui/primitives/Label";

const InputText = (InputData: InputTextProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleValidateAndSubmit = () => {
    const inputEl = inputRef.current;
    if (!inputEl) return;

    const parsed = parseFloat(inputEl.value);

    if (!isNaN(parsed)) {
      const clampedValue = Math.max(InputData.min, Math.min(InputData.max, parsed));
      InputData.onUpdate(InputData.name, clampedValue);
      inputEl.value = clampedValue.toString();
    } else {
      inputEl.value = InputData.value.toString();
    }
  };

  return (
    <div className="flex flex-row items-center gap-3 py-2">
      {InputData.label && <Label htmlFor={InputData.id}>{InputData.label}</Label>}
      <input
        ref={inputRef}
        id={InputData.id}
        name={InputData.name}
        type="text"
        key={InputData.value}
        defaultValue={InputData.value}
        className={cn(STYLES.input, InputData.size === 's' ? STYLES.inputS : STYLES.inputM, InputData.fullWidth ? "w-full" : "w-auto")}
        onBlur={handleValidateAndSubmit}
        size={InputData.dynamicWidth ? InputData.value.toString().length || 1 : 10}
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
    </div>
  );
};

const STYLES = {
  // cn function needed for prettier tailwind class sorting
  input: cn(
    "rounded-md border-1 border-gray-300 bg-gray-100 px-3 py-2 text-center text-black-800 shadow-md shadow-brand-700/10 ring-brand-500 outline-none focus:ring-2",
  ),
  inputS: cn('text-sm'),
  inputM: cn('text-base'),
};

export default InputText;
