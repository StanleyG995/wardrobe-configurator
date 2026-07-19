import { cn } from "@/helpers/cn";
import { LabelProps } from "@/types/LabelProps";

const Label = ({ htmlFor, children }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className={STYLES.label}>
      {children}
    </label>
  );
};

const STYLES = {
  label: cn("block text-sm font-medium text-gray-700"),
};

export default Label;
