import { SelectProps } from "@/types/SelectProps";
import { cn } from "@/helpers/cn";
import Label from "@/components/ui/primitives/Label";

const Select = ({ id, label, options, value, onChange }: SelectProps) => {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={STYLES.select}>
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
  select: cn("w-full rounded-md border-1 border-gray-300 bg-gray-50 px-3 py-2 text-left text-black-800 shadow-md shadow-brand-700/10 ring-brand-500 outline-none focus:ring-2 mt-2"),
};
export default Select;
