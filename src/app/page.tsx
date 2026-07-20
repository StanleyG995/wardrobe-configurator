"use client";

import Sidebar from "@/components/ui/controls/Sidebar";
import Render from "@/components/scene/Render";
import { PiArrowLeft, PiArrowRight } from "react-icons/pi";
import { useWardrobeHistory } from "@/hooks/useUndoRedo";
import { useWardrobeStore } from "@/store/useWardrobeStore";
import { cn } from "@/helpers/cn";

// Stała szerokość bocznego panelu
const SIDEBAR_WIDTH_PX = 420;

export default function Home() {
  useWardrobeHistory();

  const isSidebarOpen = useWardrobeStore((state) => state.isSidebarOpen);
  const toggleSidebar = useWardrobeStore((state) => state.toggleSidebar);

  return (
    <main className={cn(STYLES.main, isSidebarOpen ? "md:pr-[420px]" : "md:pr-0")}>
      <div className={STYLES.renderContainer}>
        <Render />
      </div>
      <div className={cn(STYLES.sidebarContainer, isSidebarOpen ? "translate-y-0 md:translate-x-0" : "translate-y-0 md:translate-x-full")}>
        <div className="flex h-full w-full flex-col overflow-hidden">
          <Sidebar />
        </div>
      </div>

      <button onClick={toggleSidebar} className={cn(STYLES.toggleBtn, isSidebarOpen ? "md:-translate-x-[420px]" : "md:translate-x-0")}>
        {isSidebarOpen ? <PiArrowRight className="translate-x-[1px] text-[12px]" /> : <PiArrowLeft className="-translate-x-[1px] text-[12px]" />}
      </button>
    </main>
  );
}

const STYLES = {
  main: cn("relative flex h-dvh w-full flex-col overflow-hidden bg-white transition-all duration-300 ease-in-out md:flex-row"),
  renderContainer: cn("relative h-[45vh] w-full touch-none bg-white md:h-full md:w-full"),
  sidebarContainer: cn(
    "absolute right-0 bottom-0 z-40 flex h-[55vh] w-full flex-col overflow-hidden border-t border-gray-200 bg-white shadow-2xl transition-transform duration-300 ease-in-out",
    "md:top-0 md:h-full md:w-[420px] md:border-t-0 md:border-l",
  ),
  toggleBtn: cn(
    "fixed top-1/2 right-0 z-50 hidden h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-l-md border border-r-0 border-gray-200 bg-white text-gray-700 shadow-md transition-transform duration-300 ease-in-out md:flex",
    "hover:bg-gray-50 hover:text-gray-900",
  ),
};
