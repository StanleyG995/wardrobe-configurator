import { FaRuler, FaUser, FaDoorClosed, FaBorderAll, FaDoorOpen } from "react-icons/fa6";
import { IoMdMale, IoMdFemale } from "react-icons/io";
import { cn } from "@/helpers/cn";
import { useWardrobeStore } from "@/store/useWardrobeStore";

const ViewportControls = () => {
  const viewportOptions = useWardrobeStore((state) => state.viewportOptions);
  const handleViewportToggle = useWardrobeStore((state) => state.handleViewportToggle);
  const handleViewportGenderToggle = useWardrobeStore((state) => state.handleViewportGenderToggle);
  const price = useWardrobeStore((state) => state.price);

  return (
    <>
      <div className="absolute z-50 flex flex-row gap-3 p-3">
        <button
          onClick={() => handleViewportToggle("dimensionsVisible")}
          className={`${STYLES.button} ${viewportOptions.dimensionsVisible ? STYLES.buttonActive : STYLES.buttonInactive}`}
        >
          <FaRuler className={STYLES.icon} />
          {viewportOptions.dimensionsVisible ? "Hide" : "Show"} Dimensions
        </button>

        <button
          onClick={() => handleViewportToggle("humanScaleVisible")}
          className={`${STYLES.button} ${viewportOptions.humanScaleVisible ? STYLES.buttonActive : STYLES.buttonInactive}`}
        >
          <FaUser className={STYLES.icon} />
          {viewportOptions.humanScaleVisible ? "Hide" : "Show"} human scale
        </button>

        {viewportOptions.humanScaleVisible && (
          <button onClick={() => handleViewportGenderToggle()} className={`${STYLES.button} ${STYLES.buttonActive}`}>
            {viewportOptions.humanScaleGender === "male" ? (
              <>
                <IoMdMale className={STYLES.icon} /> Male
              </>
            ) : (
              <>
                <IoMdFemale className={STYLES.icon} /> Female
              </>
            )}
          </button>
        )}

        <button
          onClick={() => handleViewportToggle("doorsVisible")}
          className={`${STYLES.button} ${viewportOptions.doorsVisible ? STYLES.buttonActive : STYLES.buttonInactive}`}
        >
          <FaDoorClosed className={STYLES.icon} />
          {viewportOptions.doorsVisible ? "Hide" : "Show"} doors
        </button>

        {viewportOptions.doorsVisible && (
          <button
            onClick={() => handleViewportToggle("doorsOpen")}
            className={`${STYLES.button} ${viewportOptions.doorsOpen ? STYLES.buttonActive : STYLES.buttonInactive}`}
          >
            <FaDoorOpen className={STYLES.icon} />
            {viewportOptions.doorsOpen ? "Close" : "Open"} Doors
          </button>
        )}

        <button
          onClick={() => handleViewportToggle("floorVisible")}
          className={`${STYLES.button} ${viewportOptions.floorVisible ? STYLES.buttonActive : STYLES.buttonInactive}`}
        >
          <FaBorderAll className={STYLES.icon} />
          {viewportOptions.floorVisible ? "Hide" : "Show"} Floor
        </button>
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
  priceContainer: cn("absolute top-3 right-3 z-999 flex flex-col border-1 border-black-800 bg-gray-100 p-3 pb-2 text-black-800"),
  priceCurrency: cn("text-lg"),
  priceLabel: cn('text-black-500'),
  price: cn("text-[46px] leading-none font-semibold"),
  button: cn("bg-blur-2 flex cursor-pointer items-center justify-start gap-2 border-1 border-black-800 px-3 py-2 text-[12px] transition-colors duration-200"),
  buttonActive: cn("bg-black-800 text-gray-100"),
  buttonInactive: cn("bg-gray-100 text-black-800"),
};

export default ViewportControls;
