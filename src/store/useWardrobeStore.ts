import { create } from "zustand";
import { temporal } from "zundo";

export interface Wardrobe{
    dimension: {width: number;
    height: number;
    depth: number;}
    boardThickness: number;
    backBoardThickness: number;
    segments: {
        id: string;
        type: 'shelves' | 'hanger' | 'empty';
        shelves: string[];
        doorPosition: 'left' | 'right';
    }[];
    activeSegmentIdx: number | null;
    price: number;
    caseMaterial: string;
    doorMaterial: string;
    updateDimension: (key: keyof Wardrobe['dimension'], value: number) => void;
    setActiveSegmentIdx: (idx: number | null) => void
}


export interface ViewportOptionsProps{
    dimensionsVisible: boolean,
    humanScaleVisible: boolean,
    humanScaleGender: 'male' | 'female',
    doorsOpen: boolean,
    doorsVisible: boolean,
    floorVisible: boolean
}

export interface WardrobeState {
    wardrobe: Wardrobe;
    viewportOptions: ViewportOptionsProps;
}

export const useWardrobeStore = create<WardrobeState>()(
  temporal(
    (set) => ({
      wardrobe: {
        dimension: {
          width: 1000,
          height: 2000,
          depth: 600
        },
        boardThickness: 18,
        backBoardThickness: 5,
        segments: [
          { id: "1", type: "shelves", shelves: [], doorPosition: "left" },
          { id: "2", type: "hanger", shelves: [], doorPosition: "right" },
        ],
      },
      price: 0,
      activeSegmentIdx: null,

      viewportOptions: {
        dimensionsVisible: true,
        humanScaleVisible: true,
        humanScaleGender: "male",
        doorsOpen: true,
        doorsVisible: true,
        floorVisible: true,
      },

      updateDimension: (key: keyof Wardrobe['dimension'], value: number) =>
        set((state) => ({
          wardrobe: {
            ...state.wardrobe,
            dimension: {
              ...state.wardrobe.dimension,
              [key]: value
            }
          },
        })),

      setActiveSegmentIdx: (idx: number | null) =>
        set((state) => ({
          wardrobe: {
            ...state.wardrobe,
            activeSegmentIdx: idx
          }
        })),

        handleViewportToggle: (name: keyof ViewportOptionsProps) => {
    set((state) => ({
       
        ...state, 
       
        viewportOptions: {
            ...state.viewportOptions,
            [name]: !state.viewportOptions[name]
        }
    }))
},

        
        else {
            setViewportOptions(prev => ({
                ...prev,
                humanScaleGender: 'male'
            }))
        }
    }),
    {
      partialize: (state) => ({ wardrobe: state.wardrobe }),
    },
  ),
);
