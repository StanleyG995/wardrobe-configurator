import {
  FaRuler,
  FaUser,
  FaDoorClosed,
  FaBorderAll,
  FaDoorOpen,
} from "react-icons/fa6";
import { IoMdMale, IoMdFemale } from "react-icons/io";

import { useWardrobeStore } from "@/store/useWardrobeStore";

const BTN_BASE =
  "flex justify-start items-center border-1 border-black-800 text-[12px] py-2 px-3 gap-2 rounded-full cursor-pointer transition-colors duration-200 ";

const BTN_STYLES = {
  active: `${BTN_BASE} bg-black-800 text-gray-100`,
  inactive: `${BTN_BASE} bg-none text-black-800`,
};

const ViewportControls = () => {
  const viewportOptions = useWardrobeStore((state) => state.viewportOptions);
  const handleViewportToggle = useWardrobeStore(
    (state) => state.handleViewportToggle,
  );
  const handleViewportGenderToggle = useWardrobeStore(
    (state) => state.handleViewportGenderToggle,
  );

  return (
    <div className="absolute z-50 flex flex-row gap-3 p-3">
      <button
        onClick={() => handleViewportToggle("dimensionsVisible")}
        className={`${BTN_BASE} ${viewportOptions.dimensionsVisible ? BTN_STYLES.active : BTN_STYLES.inactive}`}
      >
        <FaRuler className="mr-2 text-[20px]" />
        {viewportOptions.dimensionsVisible ? "Hide" : "Show"} Dimensions
      </button>

      <button
        onClick={() => handleViewportToggle("humanScaleVisible")}
        className={`${BTN_BASE} ${viewportOptions.humanScaleVisible ? BTN_STYLES.active : BTN_STYLES.inactive}`}
      >
        <FaUser className="mr-2 text-[20px]" />
        {viewportOptions.humanScaleVisible ? "Hide" : "Show"} human scale
      </button>

      {viewportOptions.humanScaleVisible && (
        <button
          onClick={() => handleViewportGenderToggle()}
          className={`${BTN_BASE} ${viewportOptions.dimensionsVisible ? BTN_STYLES.active : BTN_STYLES.inactive}`}
        >
          {viewportOptions.humanScaleGender === "male" ? (
            <>
              <IoMdMale className="mr-2 text-[20px]" /> Male
            </>
          ) : (
            <>
              <IoMdFemale className="mr-2 text-[20px]" /> Female
            </>
          )}
        </button>
      )}

      <button
        onClick={() => handleViewportToggle("doorsVisible")}
        className={`${BTN_BASE} ${viewportOptions.doorsVisible ? BTN_STYLES.active : BTN_STYLES.inactive}`}
      >
        <FaDoorClosed className="mr-2 text-[20px]" />
        {viewportOptions.doorsVisible ? "Hide" : "Show"} doors
      </button>

      {viewportOptions.doorsVisible && (
        <button
          onClick={() => handleViewportToggle("doorsOpen")}
          className={`${BTN_BASE} ${viewportOptions.doorsOpen ? BTN_STYLES.active : BTN_STYLES.inactive}`}
        >
          <FaDoorOpen className="mr-2 text-[20px]" />
          {viewportOptions.doorsOpen ? "Close" : "Open"} Doors
        </button>
      )}

      <button
        onClick={() => handleViewportToggle("floorVisible")}
        className={`${BTN_BASE} ${viewportOptions.floorVisible ? BTN_STYLES.active : BTN_STYLES.inactive}`}
      >
        <FaBorderAll className="mr-2 text-[20px]" />
        {viewportOptions.floorVisible ? "Hide" : "Show"} Floor
      </button>
    </div>
  );
};

export default ViewportControls;
