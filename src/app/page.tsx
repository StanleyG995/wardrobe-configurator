"use client"

import Sidebar from "@/components/Sidebar"
import Render from "@/components/Render"
import { useWardrobe } from '@/hooks/useWardrobe'

export default function Home() {
    const { 
        wardrobe, 
        handleUpdate, 
        addShelfToSegment, 
        removeShelfFromSegment, 
        changeSegmentType,
        activeSegmentIdx,
        setActiveSegmentIdx,
        wardrobePrice, 
    } = useWardrobe()

   

    return (
        <main className="flex flex-col lg:flex-row h-screen w-full bg-[#182433] overflow-hidden"> 
            
            {/* PANEL BOCZNY (KONTROLER) */}
            <div className="z-10 w-full lg:w-96 flex flex-col border-b lg:border-r border-white/50 bg-gradient-to-b from-[#042554] to-[#0C1D36] backdrop-blur-xl p-10 gap-4 text-white overflow-y-auto">
                <Sidebar
                    wardrobe={wardrobe}
                    onUpdate={handleUpdate}
                    onAddShelf={addShelfToSegment}    
                    onRemoveShelf={removeShelfFromSegment}
                    onChangeSegmentType={changeSegmentType}
                    activeSegmentIdx={activeSegmentIdx}
                    setActiveSegmentIdx={setActiveSegmentIdx}
                    price={wardrobePrice}
                />
            </div>

            
            <div className="flex-1 w-full relative bg-white/90">
                <Render 
                    wardrobe={wardrobe}
                    activeSegmentIdx={activeSegmentIdx}
                    setActiveSegmentIdx={setActiveSegmentIdx}     />
            </div>
        </main>
    )
}