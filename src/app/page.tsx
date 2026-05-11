"use client" // Kluczowe w Next.js dla komponentów interaktywnych

import Sidebar from "@/components/Sidebar"
import Render from "@/components/Render"
import { useWardrobe } from '@/hooks/useWardrobe'

export default function Home() {
    const { wardrobe, handleUpdate, addShelf, removeShelf } = useWardrobe()

    
    return (
        <main className="flex min-h-screen"> 
            {/* Używamy Tailwind CSS zamiast app-container z CSS */}
            <Sidebar
                wardrobe = {wardrobe}
                onUpdate={handleUpdate}
                onAddShelf={addShelf}
                onRemoveShelf={removeShelf}
            />

            <div className="flex-1 relative">
                <Render wardrobe={wardrobe} />
            </div>
        </main>
    )
}