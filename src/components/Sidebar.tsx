"use client"

import type { WardrobeProps } from "../types/WardrobeProps"

// Rozszerzamy tymczasowo interfejs propsów bezpośrednio w komponencie,
// dopóki nie zaktualizujesz globalnego pliku types/WardrobeProps
interface UpdatedWardrobeProps
	extends Omit<WardrobeProps, "onAddShelf" | "onRemoveShelf"> {
	onAddShelf: (segmentIndex: number) => void
	onRemoveShelf: (segmentIndex: number) => void
	onChangeSegmentType: (
		segmentIndex: number,
		type: "shelves" | "hanger" | "empty"
	) => void
}

const Sidebar = ({
	onUpdate,
	onAddShelf,
	onRemoveShelf,
	onChangeSegmentType,
	wardrobe,
}: UpdatedWardrobeProps) => {
	return (
		<div className='flex flex-col gap-4'>
			<div className='pb-2 flex flex-row align-center justify-start gap-4'>
				<label htmlFor='width' className='w-full'>
					Width: <strong>{wardrobe.width} mm</strong>
				</label>
				<input
					name='width'
					id='width'
					type='range'
					className='w-full rounded-lg cursor-pointer accent-blue-600'
					max='1800'
					min='500'
					value={wardrobe.width}
					onChange={e => onUpdate(e.target.name, parseFloat(e.target.value))}
				/>
			</div>

			<div className='pb-2 flex flex-row align-center justify-start gap-4'>
				<label htmlFor='height' className='w-full'>
					Height: <strong>{wardrobe.height} mm</strong>
				</label>
				<input
					name='height'
					id='height'
					type='range'
					className='w-full rounded-lg cursor-pointer accent-blue-600'
					max='2700'
					min='1800'
					value={wardrobe.height}
					onChange={e => onUpdate(e.target.name, parseFloat(e.target.value))}
				/>
			</div>

			<div className='pb-3 flex flex-row align-center justify-start gap-4'>
				<label htmlFor='depth' className='w-full'>
					Depth: <strong>{wardrobe.depth} mm</strong>
				</label>
				<input
					name='depth'
					id='depth'
					type='range'
					className='w-full rounded-lg cursor-pointer accent-blue-600'
					max='700'
					min='450'
					value={wardrobe.depth}
					onChange={e => onUpdate(e.target.name, parseFloat(e.target.value))}
				/>
			</div>

			<div className='pb-6 flex flex-row align-center justify-start gap-4'>
				<label htmlFor='boardThickness'>Thickness:</label>
				<select
					name='boardThickness'
					value={wardrobe.boardThickness}
					onChange={e => onUpdate(e.target.name, parseFloat(e.target.value))}
					className='border border-gray-300 rounded p-1 w-full bg-black/10 text-white'>
					<option className='bg-neutral-900 text-white' value={15}>
						15 mm
					</option>
					<option className='bg-neutral-900 text-white' value={18}>
						18 mm
					</option>
					<option className='bg-neutral-900 text-white' value={20}>
						20 mm
					</option>
				</select>
			</div>

			<hr className='border-gray-200 my-2' />

		
			<div className='flex flex-col gap-4'>
				<h3 className='font-semibold text-[#eeeeff] text-sm uppercase tracking-wider'>
					Internal Configuration
				</h3>

				{wardrobe.segments?.map((segment, idx) => (
					<div
						key={segment.id}
						className='p-4 border border-gray-200 bg-black/10  rounded-lg flex flex-col gap-3'>
						<div className='flex justify-between items-center'>
							<span className='font-semibold text-blue-500'>Bay {idx + 1}</span>
							<span className='text-xs text-white/70 bg-black/40 px-2 py-0.5 rounded'>
								{segment.type === "shelves"
									? `${segment.shelves.length} shelves`
									: segment.type}
							</span>
						</div>

					
						<div className='flex flex-col gap-1'>
							<label className='text-xs text-white font-medium'>
								Layout Type:
							</label>
							<select
								value={segment.type}
								onChange={e => onChangeSegmentType(idx, e.target.value as 'shelves' | 'hanger' | 'empty')}
								className='border border-gray-300 rounded p-1 w-full bg-black/10 text-white'>
								<option className='bg-neutral-900 text-white' value='shelves'>Shelves</option>
								<option className='bg-neutral-900 text-white' value='hanger'>Hanger Rod</option>
								<option className='bg-neutral-900 text-white' value='empty'>Empty Space</option>
							</select>
						</div>

						{segment.type === "shelves" && (
							<div className='flex flex-row gap-2 mt-1'>
								<button
									onClick={() => onRemoveShelf(idx)}
									className='w-full bg-[#E04646] hover:bg-red-600 text-white text-xs px-3 py-2 rounded-md cursor-pointer transition-colors'>
									- Remove
								</button>
								<button
									onClick={() => onAddShelf(idx)}
									className='w-full bg-[#2b7fff] hover:bg-blue-600 text-white text-xs px-3 py-2 rounded-md cursor-pointer transition-colors'>
									+ Add
								</button>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

export default Sidebar
