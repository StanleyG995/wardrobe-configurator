import { WardrobeData } from '@/types/WardrobeProps'

export interface RenderProps {
	wardrobe: WardrobeData,
	activeSegmentIdx: number | null,
    setActiveSegmentIdx: (idx: number | null) => void,
	onUpdate: (name: string, value:number ) => void,
	onToggleUpdate: (name: keyof ViewportOptionsProps ) => void,
}

export interface ViewportOptionsProps {
	dimensions: boolean,
	humanScale: boolean,
	doorsOpen: boolean,
	floor: boolean
}

export interface ViewportButtonProps extends ViewportOptionsProps {
	onToggleUpdate: (name: keyof ViewportOptionsProps ) => void,
}