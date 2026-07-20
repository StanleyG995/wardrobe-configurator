export interface SwatchOption {
  value: string;
  label: string;
  img?: string;
  color?: string;
}

export interface SwatchGridProps {
  label: string;
  options: SwatchOption[];
  value: string;
  onChange: (value: string) => void;
}