export interface BayCardProps {
  id: string,
  idx: number,
  segmentType: 'empty' | 'shelves' | 'hanger'
  shelves: string[];
  onClick: (idx: number) => void;
  icon?: React.ReactNode
}
