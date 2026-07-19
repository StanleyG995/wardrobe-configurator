"use client";

import Sidebar from "@/components/ui/controls/Sidebar";
import Render from "@/components/scene/Render";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useWardrobeHistory } from "@/hooks/useUndoRedo";
import { useWardrobeStore } from "@/store/useWardrobeStore";
import { cn } from "@/helpers/cn";

export default function Home() {
  useWardrobeHistory();

  const isSidebarOpen = useWardrobeStore((state) => state.isSidebarOpen);
  const toggleSidebar = useWardrobeStore((state) => state.toggleSidebar);
  const SIDEBAR_WIDTH = 420;

  return (
    <main className={STYLES.main}>
      <div
        className={STYLES.renderContainer}
        style={{
          width: isSidebarOpen ? `calc(100% - ${SIDEBAR_WIDTH}px)` : "100%",
        }}
      >
        <Render />
      </div>

      <div
        className={cn(STYLES.sidebarContainer, `w-[${SIDEBAR_WIDTH}px]`)}

        style={{
          width: `${SIDEBAR_WIDTH}px`,
          transform: isSidebarOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <div className={cn(`flex h-full w-[${SIDEBAR_WIDTH}px] flex-col`)}>
          <Sidebar />
        </div>
      </div>

      <button
        onClick={toggleSidebar}
        style={{
          right: isSidebarOpen ? `${SIDEBAR_WIDTH}px` : "0px",
        }}
        className="fixed top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-l-md border border-r-0 border-gray-400 bg-gray-50 text-black-800 shadow-md shadow-brand-700/10 transition-all duration-300"
      >
        {isSidebarOpen ? <FaChevronRight className="translate-x-[1px] text-[14px]" /> : <FaChevronLeft className="-translate-x-[1px] text-[14px]" />}
      </button>
    </main>
  );
}

const STYLES = {
  main: cn("relative flex h-screen w-full overflow-hidden bg-white"),
  renderContainer: cn("relative h-full bg-white transition-all duration-300 ease-in-out"),
  sidebarContainer: cn(
    "absolute top-0 right-0 flex h-full flex-col border-l border-gray-400 bg-gradient-to-t from-gray-100 to-gray-200 text-white shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-in-out",
  ),
  heading: cn("font-semibold text-black-900"),
};
