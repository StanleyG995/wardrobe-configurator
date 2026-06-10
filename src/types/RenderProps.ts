import { WardrobeData } from '@/types/WardrobeProps'

export interface RenderProps {
	wardrobe: WardrobeData,
	activeSegmentIdx: number | null,
    setActiveSegmentIdx: (idx: number | null) => void,
	onUpdate: (name: string, value:number ) => void,
	onToggleUpdate: (name: keyof ViewportOptionsProps ) => void,
}

export interface HumanScaleProps {
    gender: 'male' | 'female',
	dimensions: boolean,
  }

export interface ViewportOptionsProps extends HumanScaleProps{
	dimensions: boolean,
	humanScale: boolean,
	doorsOpen: boolean,
	doorRotation: [number, number, number]
	floor: boolean
}

export interface ViewportButtonProps extends ViewportOptionsProps {
	onToggleUpdate: (name: keyof ViewportOptionsProps ) => void,
	onToggleGender: () => void,
	onToggleDoors: () =>  void,
}