import { PiRuler, PiUser, PiDoor, PiGridFour, PiDoorOpen, PiGenderMale, PiGenderFemale } from "react-icons/pi";

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
      <div className="absolute z-50 flex md:flex-row  flex-col gap-2 md:gap-3 p-3">
        <Button
          onClick={() => handleViewportToggle("dimensionsVisible")}
          icon={<PiRuler className={STYLES.icon} />}
          iconPosition="left"
          active={viewportOptions.dimensionsVisible}
          toggleable={true}
        >
          <span className="hidden md:inline">
          {viewportOptions.dimensionsVisible ? "Hide" : "Show"} dimensions
          </span>
        </Button>
      
        <Button
          onClick={() => handleViewportToggle("humanScaleVisible")}
          icon={<PiUser className={STYLES.icon} />}
          iconPosition="left"
          active={viewportOptions.humanScaleVisible}
          toggleable={true}
        >
          <span className="hidden md:inline">
          {viewportOptions.humanScaleVisible ? "Hide" : "Show"} human scale
          </span>
        </Button>

        {viewportOptions.humanScaleVisible && (
          <Button
            onClick={() => handleViewportGenderToggle()}
            icon={viewportOptions.humanScaleGender === "male" ? <PiGenderMale className={STYLES.icon} /> : <PiGenderFemale className={STYLES.icon} />}
            iconPosition="left"
            active={true}
          >
            <span className="hidden md:inline">
            {viewportOptions.humanScaleGender === "male" ? <>Male</> : <>Female</>}
            </span>
          </Button>
        )}

        <Button
          onClick={() => handleViewportToggle("doorsVisible")}
          icon={<PiDoor className={STYLES.icon} />}
          iconPosition="left"
          active={viewportOptions.doorsVisible}
          toggleable={true}
        >
          <span className="hidden md:inline">
            {viewportOptions.doorsVisible ? "Hide" : "Show"} doors
          </span>  
          
        </Button>

        {viewportOptions.doorsVisible && (
          <Button
            onClick={() => handleViewportToggle("doorsOpen")}
            icon={<PiDoorOpen className={STYLES.icon} />}
            iconPosition="left"
            active={viewportOptions.doorsOpen}
            toggleable={true}
          >
            <span className="hidden md:inline">
            {viewportOptions.doorsOpen ? "Close" : "Open"}
            </span>
          </Button>
        )}

        <Button
          onClick={() => handleViewportToggle("floorVisible")}
          icon={<PiGridFour className={STYLES.icon} />}
          iconPosition="left"
          active={viewportOptions.floorVisible}
          toggleable={true}
        >
          <span className="hidden md:inline">
          {viewportOptions.floorVisible ? "Hide" : "Show"} Floor
          </span>
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
  icon: cn(" text-lg"),
  priceContainer: cn("absolute top-3 right-3 z-999 flex flex-col rounded-md border-1 border-gray-200 bg-gray-50 p-3 pb-2 shadow-md shadow-brand-700/10"),
  price: cn("text-xl md:text-4xl leading-none font-semibold text-brand-500"),
  priceCurrency: cn("text-sm md:text-base font-normal text-black-700"),
  priceLabel: cn("text-black-800 text-sm"),
};

export default Viewport;
