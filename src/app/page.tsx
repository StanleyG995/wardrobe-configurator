"use client"

import Sidebar from "@/components/Sidebar"
import Render from "@/components/Render"
import { useWardrobe } from '@/hooks/useWardrobe'

export default function Home() {
    const { wardrobe, handleUpdate, addShelf, removeShelf } = useWardrobe()

    return (
  
        <main className="flex flex-col lg:flex-row min-h-screen bg-neutral-900 overflow-hidden"> 
            
        
            <div className="z-10 w-full lg:w-96 lg:min-h-screen border-b lg:border-r border-white/10 bg-black/20 backdrop-blur-md">
                <Sidebar
                    wardrobe={wardrobe}
                    onUpdate={handleUpdate}
                    onAddShelf={addShelf}
                    onRemoveShelf={removeShelf}
                />
            </div>

            <div className="flex-1 relative h-[60vh] lg:h-screen">
                <Render wardrobe={wardrobe} />
            </div>
        </main>
    )
}