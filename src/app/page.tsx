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
        className="absolute top-0 right-0 h-full w-[450px] flex flex-col bg-gradient-to-t from-gray-100 to-gray-200 text-white shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-in-out border-l border-gray-400"
        style={{
          transform: isSidebarOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <div className="w-[450px] h-full flex flex-col">
          <Sidebar />
        </div>
      </div>

      {/* Przycisk strzałki */}
      <button 
        onClick={toggleSidebar}
        style={{
          right: isSidebarOpen ? "470px" : "20px",
        }}
        className="fixed top-1/2 -translate-y-1/2 z-50 h-10 w-10 cursor-pointer rounded-full border border-gray-300 bg-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-50 active:scale-95 text-gray-700 flex items-center justify-center"
      >
        {isSidebarOpen ? (
          <FaChevronRight className="text-[14px] translate-x-[1px]" />
        ) : (
          <FaChevronLeft className="text-[14px] -translate-x-[1px]" />
        )}
      </button>
    </main>
  );
}