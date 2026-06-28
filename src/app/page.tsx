"use client"

import Sidebar from "@/components/ui/Sidebar"
import Render from "@/components/scene/Render"


export default function Home() {

    return (
        <main className="flex flex-col lg:flex-row h-screen w-full bg-[#182433] overflow-hidden"> 
            
            <div className="z-10 w-full lg:w-96 flex flex-col border-b lg:border-r border-white/50 bg-gradient-to-b from-[#042554] to-[#0C1D36] backdrop-blur-xl p-10 gap-4 text-white overflow-y-auto">
                <Sidebar/>
            </div>

            <div className="flex-1 w-full relative bg-white/90">
                <Render />
            </div>
        </main>
    )
}