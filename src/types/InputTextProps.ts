export interface InputTextProps {
  id: "width" | "height" | "depth";
  name: "width" | "height" | "depth";
  label?: string;
  classNames?: string;
  min: number;
  max: number;
  step?: number;
  value: string | number;
  widthFull?: boolean
  onUpdate: (key: "width" | "height" | "depth", value: number) => void;
}