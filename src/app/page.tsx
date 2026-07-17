"use client";

import Sidebar from "@/components/ui/Sidebar";
import Render from "@/components/scene/Render";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useWardrobeHistory } from "@/hooks/useUndoRedo";
import { useWardrobeStore } from "@/store/useWardrobeStore";

export default function Home() {
  useWardrobeHistory();

  const isSidebarOpen = useWardrobeStore((state) => state.isSidebarOpen);
  const toggleSidebar = useWardrobeStore((state) => state.toggleSidebar);

  return (
    // Zmieniamy tło głównego kontenera z bg-[#182433] na bg-white,
    // dzięki czemu nawet przy minimalnych przesunięciach nic nie będzie prześwitywać.
    <main className="relative flex h-screen w-full overflow-hidden bg-white">
      {/* Kontener Canvasu */}
      <div
        className="relative h-full bg-white transition-all duration-300 ease-in-out"
        style={{
          width: isSidebarOpen ? "calc(100% - 450px)" : "100%",
        }}
      >
        <Render />
      </div>

      {/* Prawy Panel boczny */}
      <div
        className="absolute top-0 right-0 flex h-full w-[450px] flex-col border-l border-gray-400 bg-gradient-to-t from-gray-100 to-gray-200 text-white shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-in-out"
        style={{
          transform: isSidebarOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <div className="flex h-full w-[450px] flex-col">
          <Sidebar />
        </div>
      </div>

      {/* Przycisk strzałki */}
      <button
        onClick={toggleSidebar}
        style={{
          right: isSidebarOpen ? "450px" : "0px",
        }}
        className="fixed top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center border border-gray-800 bg-gray-100 text-gray-800 shadow-lg transition-all duration-300"
      >
        {isSidebarOpen ? <FaChevronRight className="translate-x-[1px] text-[14px]" /> : <FaChevronLeft className="-translate-x-[1px] text-[14px]" />}
      </button>
    </main>
  );
}
