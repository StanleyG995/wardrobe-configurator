export interface DimensionProps {
  name: string,
  position: [number, number, number];
  value: number;
  min: number;
  max: number;
  label: string;
  linePositionStart: [number, number, number];
  linePositionEnd: [number, number, number];
  onUpdate: (name: string, value: number) => void;
}