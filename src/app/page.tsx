"use client";

import Sidebar from "@/components/ui/Sidebar";
import Render from "@/components/scene/Render";

import { useWardrobeHistory } from "@/hooks/useUndoRedo";

export default function Home() {
  useWardrobeHistory();

  return (
    <main className="relative flex h-screen w-full flex-col overflow-hidden bg-[#182433] lg:flex-row">
      <div className="absolute inset-0 w-full bg-white/90 lg:relative lg:flex-1">
        <Render />
      </div>

      <div className="fixed right-0 bottom-0 left-0 z-10 flex max-h-[45vh] flex-col gap-2 overflow-y-auto rounded-t-3xl  bg-gradient-to-t from-gray-100 to-gray-200 border-l-1 border-gray-400 p-10 text-white shadow-2xl backdrop-blur-xl lg:relative lg:max-h-screen lg:w-[500px] lg:rounded-t-none lg:border-t-0 lg:border-r lg:p-10 lg:shadow-none">
        <Sidebar />
      </div>
    </main>
  );
}
