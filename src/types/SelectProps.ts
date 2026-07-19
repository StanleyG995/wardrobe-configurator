export interface SelectProps {
  options: { value: string; label: string, img?: string, imgAlt?: string}[];
  value: string;
  onChange: (value: string) => void;
  id: string;
  label?: string;
}
