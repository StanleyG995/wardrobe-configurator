"use client"

import Sidebar from "@/components/ui/Sidebar"
import Render from "@/components/scene/Render"

export default function Home() {
    return (
        <main className="relative flex flex-col lg:flex-row h-screen w-full bg-[#182433] overflow-hidden"> 
            
            {/* Scena 3D / Render szafy */}
            {/* Na komórkach: absolute inset-0 (zajmuje całe tło) */}
            {/* Na komputerach (lg:): flex-1 relative (wskakuje po prawej stronie) */}
            <div className="absolute inset-0 lg:relative lg:flex-1 w-full bg-white/90">
                <Render />
            </div>

           
            <div className="z-10 fixed bottom-0 left-0 right-0 max-h-[45vh] lg:max-h-screen lg:relative lg:w-96 flex flex-col border-t lg:border-t-0 lg:border-r border-white/30 bg-gradient-to-b from-[#042554] to-[#0C1D36] backdrop-blur-xl p-6 lg:p-10 gap-4 text-white overflow-y-auto rounded-t-3xl lg:rounded-t-none shadow-2xl lg:shadow-none">
                <Sidebar />
            </div>

        </main>
    )
}