import { useState } from "react"

export const useWardrobe = () => {
    const [wardrobe, setWardrobe] = useState({
        width: 100,
        height: 200,
        depth: 60,
        boardThickness: 1.8,
        backBoardThickness: 0.5,
        shelves: [],
    })
    
    const handleUpdate = (name: string, value: number) => {
        setWardrobe(prev => ({
            ...prev,
            [name]: value,
        }))
    }
    
    const addShelf = () => {
        const minShelfGap = 45
        const usableHeight =
            wardrobe.height -
            2 * wardrobe.boardThickness -
            wardrobe.shelves.length * wardrobe.boardThickness
        const potentialGap =
            (usableHeight - wardrobe.boardThickness) / (wardrobe.shelves.length + 1)
    
        if (potentialGap > minShelfGap) {
            setWardrobe(prev => ({
                ...prev,
                shelves: [...prev.shelves, crypto.randomUUID()],
            }))
        } else return
    }
    
    const removeShelf = () => {
        setWardrobe(prev => {
            const newShelves = prev.shelves.slice(0, -1)
    
            return {
                ...prev,
                shelves: newShelves,
            }
        })
    }

    return { wardrobe, handleUpdate, addShelf, removeShelf}
}

