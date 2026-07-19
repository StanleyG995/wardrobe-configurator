export interface InputRangeProps {
  id: "width-range" | "height-range" | "depth-range";
  name: "width" | "height" | "depth";
  label?: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  editableText?: boolean;
  onUpdate: (key: "width" | "height" | "depth", value: number) => void;
}