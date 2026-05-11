"use client"

import Sidebar from "@/components/Sidebar"
import Render from "@/components/Render"
import { useWardrobe } from '@/hooks/useWardrobe'

export default function Home() {
    const { wardrobe, handleUpdate, addShelf, removeShelf } = useWardrobe()

    return (
       
        <main className="flex flex-col lg:flex-row h-screen w-full bg-[#1a1a1a] overflow-hidden"> 
            
            
            <div className="z-10 w-full lg:w-96 flex-none border-b lg:border-r border-white/10 bg-black/40 backdrop-blur-xl">
                <Sidebar
                    wardrobe={wardrobe}
                    onUpdate={handleUpdate}
                    onAddShelf={addShelf}
                    onRemoveShelf={removeShelf}
                />
            </div>

          
            <div className="flex-1 w-full relative">
                <Render wardrobe={wardrobe} />
            </div>
        </main>
    )
}