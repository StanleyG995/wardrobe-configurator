import { FaRuler, FaUser, FaDoorClosed, FaBorderAll, FaDoorOpen } from "react-icons/fa6";
import { IoMdMale, IoMdFemale } from "react-icons/io";
import { cn } from "@/helpers/cn";
import { useWardrobeStore } from "@/store/useWardrobeStore";
import Button from "@/components/ui/primitives/Button";

const Viewport = () => {
  const viewportOptions = useWardrobeStore((state) => state.viewportOptions);
  const handleViewportToggle = useWardrobeStore((state) => state.handleViewportToggle);
  const handleViewportGenderToggle = useWardrobeStore((state) => state.handleViewportGenderToggle);
  const price = useWardrobeStore((state) => state.price);

  return (
    <>
      <div className="absolute z-50 flex flex-row gap-3 p-3">
        <Button
          onClick={() => handleViewportToggle("dimensionsVisible")}
          icon={<FaRuler className={STYLES.icon} />}
          iconPosition="left"
          active={viewportOptions.dimensionsVisible}
        >
          {viewportOptions.dimensionsVisible ? "Hide" : "Show"} dimensions
        </Button>

        <Button
          onClick={() => handleViewportToggle("humanScaleVisible")}
          icon={<FaUser className={STYLES.icon} />}
          iconPosition="left"
          active={viewportOptions.humanScaleVisible}
        >
          {viewportOptions.humanScaleVisible ? "Hide" : "Show"} human scale
        </Button>

        {viewportOptions.humanScaleVisible && (
          <Button
            onClick={() => handleViewportGenderToggle()}
            icon={viewportOptions.humanScaleGender === "male" ? <IoMdMale className={STYLES.icon} /> : <IoMdFemale className={STYLES.icon} />}
            iconPosition="left"
          >
            {viewportOptions.humanScaleGender === "male" ? <>Male</> : <>Female</>}
          </Button>
        )}

        <Button
          onClick={() => handleViewportToggle("doorsVisible")}
          icon={<FaDoorClosed className={STYLES.icon} />}
          iconPosition="left"
          active={viewportOptions.doorsVisible}
        >
          {viewportOptions.doorsVisible ? "Hide" : "Show"} doors
        </Button>

        {viewportOptions.doorsVisible && (
          <Button
            onClick={() => handleViewportToggle("doorsOpen")}
            icon={<FaDoorOpen className={STYLES.icon} />}
            iconPosition="left"
            active={viewportOptions.doorsOpen}
          >
            {viewportOptions.doorsOpen ? "Close" : "Open"} Doors
          </Button>
        )}

        <Button
          onClick={() => handleViewportToggle("floorVisible")}
          icon={<FaBorderAll className={STYLES.icon} />}
          iconPosition="left"
          active={viewportOptions.floorVisible}
        >
          {viewportOptions.floorVisible ? "Hide" : "Show"} Floor
        </Button>
      </div>

      <div className={STYLES.priceContainer}>
        <p className={STYLES.priceLabel}>Total price</p>
        <p className={STYLES.price}>
          {price.toFixed(2)} <span className={STYLES.priceCurrency}>PLN</span>
        </p>
      </div>
    </>
  );
};

const STYLES = {
  // cn function needed for prettier tailwind class sorting
  icon: cn("mr-2 text-lg"),
  priceContainer: cn("absolute top-3 right-3 z-999 flex flex-col rounded-md border-1 border-gray-200 bg-gray-50 p-3 pb-2 shadow-md shadow-brand-700/10"),
  price: cn("text-4xl leading-none font-semibold text-brand-500"),
  priceCurrency: cn("text-lg font-normal text-black-700"),
  priceLabel: cn("text-black-800"),
};

export default Viewport;
