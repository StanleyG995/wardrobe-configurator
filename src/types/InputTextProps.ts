export interface InputTextProps {
  id: "width" | "height" | "depth";
  name: "width" | "height" | "depth";
  label?: string;
  ariaLabel?: string;
  classNames?: string;
  min: number;
  max: number;
  step?: number;
  size: 's' | 'm'
  value: string | number;
  fullWidth?: boolean;
  dynamicWidth?: boolean;
  onUpdate: (key: "width" | "height" | "depth", value: number) => void;
}
