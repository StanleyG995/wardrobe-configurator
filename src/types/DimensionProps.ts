export interface DimensionProps {
  name: "width" | "height" | "depth",
  position: [number, number, number];
  value: number;
  min: number;
  max: number;
  label: string;
  linePositionStart: [number, number, number];
  linePositionEnd: [number, number, number];
  onUpdate: (key: "width" | "height" | "depth", value: number) => void
	axis: "x" | "y" | "z"

}