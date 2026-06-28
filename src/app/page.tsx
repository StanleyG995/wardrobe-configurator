"use client"

import Sidebar from "@/components/ui/Sidebar"
import Render from "@/components/scene/Render"

import { useWardrobeHistory } from "@/hooks/useUndoRedo"

export default function Home() {

    useWardrobeHistory();

    return (
        <main className="relative flex flex-col lg:flex-row h-screen w-full bg-[#182433] overflow-hidden"> 
            
            <div className="absolute inset-0 lg:relative lg:flex-1 w-full bg-white/90">
                <Render />
            </div>
           
            <div className="z-10 fixed bottom-0 left-0 right-0 max-h-[45vh] lg:max-h-screen lg:relative lg:w-[500px] flex flex-col border-t lg:border-t-0 lg:border-r border-white/30 bg-gradient-to-t from-[#1C1E30] to-[#000F2B] backdrop-blur-xl p-10 lg:p-10 gap-2 text-white overflow-y-auto rounded-t-3xl lg:rounded-t-none shadow-2xl lg:shadow-none">
                <Sidebar />
            </div>

        </main>
    )
}