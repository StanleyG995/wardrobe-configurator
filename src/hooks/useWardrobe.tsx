import { useState } from "react"

export const useWardrobe = () => {
    const [wardrobe, setWardrobe] = useState({
        width: 1000,
        height: 2000,
        depth: 600,
        boardThickness: 18,
        backBoardThickness: 5,
        shelves: [],
    })

    const handleUpdate = (name: string, value: number) => {
        setWardrobe(prev => ({
            ...prev,
            [name]: value,
        }))
    }
    
    const addShelf = () => {
        const minShelfGap = 450
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

