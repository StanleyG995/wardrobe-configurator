export interface HitboxProps {
	wardrobe: {
		width: number
		height: number
		depth: number
		boardThickness: number
		segments?: Array<{
			id: string
			type: "shelves" | "hanger" | "empty"
			shelves: string[]
		}>
	}
	activeSegmentIdx: number | null
	setActiveSegmentIdx: (idx: number | null) => void
}