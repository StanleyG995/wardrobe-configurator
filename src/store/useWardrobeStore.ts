import { create } from 'zustand';
import { temporal } from 'zundo';
import { WardrobeData, WardrobeDimensions } from '../types/WardrobeProps';

export interface WardrobeState {
    wardrobe: WardrobeData;
    price: number;
    activeSegmentIdx: number | null; // <-- Stan już tu był
    updateDimension: (key: keyof WardrobeDimensions, value: number) => void;
    // DODAJEMY AKCJĘ DO INTERFEJSU:
    setActiveSegmentIdx: (idx: number | null) => void; 
}

export const useWardrobeStore = create<WardrobeState>()(
    temporal((set) => ({
        wardrobe: {
            width: 1000,
            height: 2000,
            depth: 600,
            boardThickness: 18,
            backBoardThickness: 5,
            segments: [
                { id: '1', type: 'shelves', shelves: [], doorPosition: 'left' },
                { id: '2', type: 'hanger', shelves: [], doorPosition: 'right' }
            ]
        },
        price: 0,
        activeSegmentIdx: null,

        updateDimension: (key: keyof WardrobeDimensions, value: number) => 
            set((state) => ({
                wardrobe: {
                    ...state.wardrobe,
                    [key]: value
                }
            })),

       
        setActiveSegmentIdx: (idx: number | null) => 
            set(() => ({ 
                activeSegmentIdx: idx 
            }))
    }))
);