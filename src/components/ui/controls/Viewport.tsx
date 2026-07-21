import {
  PiRuler,
  PiUser,
  PiDoor,
  PiGridFour,
  PiDoorOpen,
  PiGenderMale,
  PiGenderFemale,
  PiFloppyDisk,
  PiFolder,
  PiShoppingCart,
} from "react-icons/pi";

import { cn } from "@/helpers/cn";
import { useWardrobeStore } from "@/store/useWardrobeStore";
import Button from "@/components/ui/primitives/Button";

const Viewport = () => {
  const viewportOptions = useWardrobeStore((state) => state.viewportOptions);
  const handleViewportToggle = useWardrobeStore(
    (state) => state.handleViewportToggle,
  );
  const handleViewportGenderToggle = useWardrobeStore(
    (state) => state.handleViewportGenderToggle,
  );
  const price = useWardrobeStore((state) => state.price);

  return (
    <>
      <div className="absolute z-50 flex flex-col gap-2 p-3 md:gap-3 2xl:flex-row">
        <Button
          onClick={() => handleViewportToggle("dimensionsVisible")}
          icon={<PiRuler className={STYLES.icon} />}
          iconPosition="left"
          active={viewportOptions.dimensionsVisible}
          toggleable
          aria-label={
            viewportOptions.dimensionsVisible
              ? "Hide dimensions"
              : "Show dimensions"
          }
        >
          <span className="hidden lg:inline">
            {viewportOptions.dimensionsVisible ? "Hide" : "Show"} dimensions
          </span>
        </Button>

        <Button
          onClick={() => handleViewportToggle("humanScaleVisible")}
          icon={<PiUser className={STYLES.icon} />}
          iconPosition="left"
          active={viewportOptions.humanScaleVisible}
          toggleable
          aria-label={
            viewportOptions.humanScaleVisible
              ? "Hide human scale"
              : "Show human scale"
          }
        >
          <span className="hidden lg:inline">
            {viewportOptions.humanScaleVisible ? "Hide" : "Show"} human scale
          </span>
        </Button>

        {viewportOptions.humanScaleVisible && (
          <Button
            onClick={() => handleViewportGenderToggle()}
            icon={
              viewportOptions.humanScaleGender === "male" ? (
                <PiGenderMale className={STYLES.icon} />
              ) : (
                <PiGenderFemale className={STYLES.icon} />
              )
            }
            iconPosition="left"
            active
            aria-label={`Change human scale gender, current: ${viewportOptions.humanScaleGender}`}
          >
            <span className="hidden lg:inline">
              {viewportOptions.humanScaleGender === "male" ? (
                <>Male</>
              ) : (
                <>Female</>
              )}
            </span>
          </Button>
        )}

        <Button
          onClick={() => handleViewportToggle("doorsVisible")}
          icon={<PiDoor className={STYLES.icon} />}
          iconPosition="left"
          active={viewportOptions.doorsVisible}
          toggleable
          aria-label={
            viewportOptions.doorsVisible ? "Hide doors" : "Show doors"
          }
        >
          <span className="hidden lg:inline">
            {viewportOptions.doorsVisible ? "Hide" : "Show"} doors
          </span>
        </Button>

        {viewportOptions.doorsVisible && (
          <Button
            onClick={() => handleViewportToggle("doorsOpen")}
            icon={<PiDoorOpen className={STYLES.icon} />}
            iconPosition="left"
            active={viewportOptions.doorsOpen}
            toggleable
            aria-label={
              viewportOptions.doorsOpen ? "Close doors" : "Open doors"
            }
          >
            <span className="hidden lg:inline">
              {viewportOptions.doorsOpen ? "Close" : "Open"}
            </span>
          </Button>
        )}

        <Button
          onClick={() => handleViewportToggle("floorVisible")}
          icon={<PiGridFour className={STYLES.icon} />}
          iconPosition="left"
          active={viewportOptions.floorVisible}
          toggleable
          aria-label={
            viewportOptions.floorVisible ? "Hide floor" : "Show floor"
          }
        >
          <span className="hidden lg:inline">
            {viewportOptions.floorVisible ? "Hide" : "Show"} floor
          </span>
        </Button>
      </div>

      <div
        className={STYLES.configActions}
        role="region"
        aria-label="Configuration actions"
      >
        <div className={STYLES.priceContainer} aria-live="polite" aria-atomic="true">
          <p className={STYLES.priceLabel}>Total price</p>
          <p className={STYLES.price}>
            {price.toFixed(2)} <span className={STYLES.priceCurrency}>PLN</span>
          </p>
        </div>
        <div className="flex flex-col justify-end gap-3">
          <Button
            onClick={() => null}
            icon={<PiShoppingCart className={STYLES.icon} />}
            iconPosition="left"
            primary
            aria-label="Add wardrobe to cart"
          >
            <span className="hidden lg:inline">Add to cart</span>
          </Button>
          <Button
            onClick={() => null}
            icon={<PiFolder className={STYLES.icon} />}
            iconPosition="left"
            aria-label="Open saved configuration"
          >
            <span className="hidden lg:inline">Open configuration</span>
          </Button>
          <Button
            onClick={() => null}
            icon={<PiFloppyDisk className={STYLES.icon} />}
            iconPosition="left"
            aria-label="Save current configuration"
          >
            <span className="hidden lg:inline">Save configuration</span>
          </Button>
        </div>
      </div>
    </>
  );
};

const STYLES = {
  // cn function needed for prettier tailwind class sorting
  icon: cn("text-lg"),
  configActions: cn(
    "absolute top-3 right-3 z-999 flex flex-col items-end gap-3",
  ),
  priceContainer: cn(
    "z-999 flex flex-col rounded-md border-1 border-gray-300 bg-gray-50 p-3 pb-2 shadow-md shadow-brand-700/10",
  ),
  price: cn("text-xl leading-none font-semibold text-brand-500 md:text-4xl"),
  priceCurrency: cn("text-sm font-normal text-black-700 md:text-base"),
  priceLabel: cn("text-sm text-black-800"),
};

export default Viewport;
