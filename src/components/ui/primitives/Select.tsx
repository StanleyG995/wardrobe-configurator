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
  select: cn("bg-white-700 w-full border-1 border-black-400 p-2 text-black-900 outline-none mt-1"),
};
export default Select;
