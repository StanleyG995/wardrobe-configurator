import { BayCardProps } from "@/types/BayCardProps";
import { useWardrobeStore } from "@/store/useWardrobeStore";
import { cn } from "@/helpers/cn";
import { PiCoatHanger, PiSquare } from "react-icons/pi";
import { BsBookshelf } from "react-icons/bs";

const BayCard = ({ id, idx, segmentType, shelves, onClick }: BayCardProps) => {
  const SEGMENT_ICONS = {
    empty: <PiSquare aria-hidden="true"/>,
    shelves: <BsBookshelf aria-hidden="true"/>,
    hanger: <PiCoatHanger aria-hidden="true"/>,
  };

  const { activeSegmentIdx, wardrobe } = useWardrobeStore((state) => state);
  const activeSegment = activeSegmentIdx !== null ? wardrobe.segments[activeSegmentIdx] : null;
  const icon = SEGMENT_ICONS[segmentType as keyof typeof SEGMENT_ICONS] || SEGMENT_ICONS.empty;

  const isActive = id === activeSegment?.id;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick(idx);
    }
  };

  return (
    <div
      key={id}
      onClick={() => onClick(idx)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-pressed={isActive}
      aria-label={`Bay ${idx + 1}, type: ${segmentType}${segmentType === "shelves" ? `, ${shelves.length} shelves` : ""}`}
      className={cn(STYLES.BayCard, isActive && STYLES.BayCardActive, "focus:ring-2 focus:ring-brand-500 focus:outline-none")}
    >
      <div className={cn(STYLES.icon, isActive ? "text-brand-500" : "text-gray-400")}>{icon}</div>
      <div className="flex flex-col">
        <span className="font-semibold text-black-800">Bay {idx + 1}</span>
      </div>
      <span aria-hidden="true">{segmentType === "shelves" ? `${shelves.length} shelves` : segmentType}</span>
    </div>
  );
};

const STYLES = {
  BayCard: cn(
    "align-center transition-box flex h-[100px] w-[25%] cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-black-300 bg-gray-100 p-2 shadow-md shadow-brand-700/10 transition-all hover:bg-gray-50 hover:ring-2 hover:ring-brand-500",
  ),
  BayCardActive: cn("bg-gray-50 ring-2 ring-brand-500"),
  icon: cn("text-xl transition-colors duration-150"),
};

export default BayCard;
