import { WardrobeData } from '@/types/WardrobeProps'

export interface RenderProps {
	wardrobe: WardrobeData,
	activeSegmentIdx: number | null,
    setActiveSegmentIdx: (idx: number | null) => void,
}

