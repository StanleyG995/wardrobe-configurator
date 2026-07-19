import { FaRuler, FaUser, FaDoorClosed, FaBorderAll, FaDoorOpen } from "react-icons/fa6";
import { IoMdMale, IoMdFemale } from "react-icons/io";
import { cn } from "@/helpers/cn";
import { useWardrobeStore } from "@/store/useWardrobeStore";
import Button from "@/components/ui/primitives/Button";

const ViewportControls = () => {
  const viewportOptions = useWardrobeStore((state) => state.viewportOptions);
  const handleViewportToggle = useWardrobeStore((state) => state.handleViewportToggle);
  const handleViewportGenderToggle = useWardrobeStore((state) => state.handleViewportGenderToggle);
  const price = useWardrobeStore((state) => state.price);

  return (
    <>
      <div className="absolute z-50 flex flex-row gap-3 p-3">
        <Button
          onClick={() => handleViewportToggle("dimensionsVisible")}
          className={cn(STYLES.button, viewportOptions.dimensionsVisible ? STYLES.buttonActive : STYLES.buttonInactive)}
          icon={<FaRuler className={STYLES.icon} />}
          iconPosition="left"
        >
          {viewportOptions.dimensionsVisible ? "Hide" : "Show"} dimensions
        </Button>

        <Button
          onClick={() => handleViewportToggle("humanScaleVisible")}
          className={cn(STYLES.button, viewportOptions.humanScaleVisible ? STYLES.buttonActive : STYLES.buttonInactive)}
          icon={<FaUser className={STYLES.icon} />}
          iconPosition="left"
        >
          {viewportOptions.humanScaleVisible ? "Hide" : "Show"} human scale
        </Button>

        {viewportOptions.humanScaleVisible && (
          <Button
            onClick={() => handleViewportGenderToggle()}
            className={cn(STYLES.button, STYLES.buttonActive)}
            icon={viewportOptions.humanScaleGender === "male" ? <IoMdMale className={STYLES.icon} /> : <IoMdFemale className={STYLES.icon} />}
            iconPosition="left"
          >
            {viewportOptions.humanScaleGender === "male" ? (
              <>
                Male
              </>
            ) : (
              <>
                Female
              </>
            )}
          </Button>
        )}

        <Button
          onClick={() => handleViewportToggle("doorsVisible")}
          className={cn(STYLES.button, viewportOptions.doorsVisible ? STYLES.buttonActive : STYLES.buttonInactive)}
          icon={<FaDoorClosed className={STYLES.icon} />}
          iconPosition="left"
        >
          {viewportOptions.doorsVisible ? "Hide" : "Show"} doors
        </Button>

        {viewportOptions.doorsVisible && (
          <Button
            onClick={() => handleViewportToggle("doorsOpen")}
            className={cn(STYLES.button, viewportOptions.doorsOpen ? STYLES.buttonActive : STYLES.buttonInactive)}
            icon={<FaDoorOpen className={STYLES.icon} />}
            iconPosition="left"
          >
            {viewportOptions.doorsOpen ? "Close" : "Open"} Doors
          </Button>
        )}

        <Button
          onClick={() => handleViewportToggle("floorVisible")}
          className={cn(STYLES.button, viewportOptions.floorVisible ? STYLES.buttonActive : STYLES.buttonInactive)}
          icon={<FaBorderAll className={STYLES.icon} />}
          iconPosition="left"
        >
          {viewportOptions.floorVisible ? "Hide" : "Show"} Floor
        </Button>
      </div>

      <div className={STYLES.priceContainer}>
        <p className={STYLES.priceLabel}>Total price:</p>
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
  priceContainer: cn("absolute top-3 right-3 z-999 flex flex-col border-1 border-black-800 bg-gray-100 p-3 pb-2"),
  price: cn("text-4xl leading-none font-semibold text-brand-500"),
  priceCurrency: cn("text-lg font-normal text-black-700"),
  priceLabel: cn("text-black-800"),
  button: cn("bg-blur-2 flex cursor-pointer items-center justify-start gap-2 border-1 border-black-800 px-3 py-2 text-[12px] transition-colors duration-200"),
  buttonActive: cn("bg-black-800 text-gray-100"),
  buttonInactive: cn("bg-gray-100 text-black-800"),
};

export default ViewportControls;
