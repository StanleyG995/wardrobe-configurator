import { SelectProps } from "@/types/SelectProps";
import { cn } from "@/helpers/cn";
import Label from "@/components/ui/primitives/Label";

const Select = ({
  id,
  label,
  ariaLabel,
  options,
  value,
  onChange,
}: SelectProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={STYLES.select}
        aria-label={!label ? ariaLabel : undefined}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const STYLES = {
  select: cn(
    "w-full cursor-pointer rounded-md border-1 border-gray-300 bg-gray-100 px-3 py-2 text-left text-black-800 shadow-md shadow-brand-700/10 ring-brand-500 outline-none focus:ring-2",
  ),
};

export default Select;
