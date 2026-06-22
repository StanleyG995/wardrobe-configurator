"use client"

import type { WardrobeProps } from "@/types/WardrobeProps"

const Sidebar = ({
	onUpdate,
	onAddShelf,
	onRemoveShelf,
	onChangeSegmentType,
	wardrobe,
	activeSegmentIdx,
	setActiveSegmentIdx,
	price,
	onToggleDoorPosition,
}: WardrobeProps) => {
	if (activeSegmentIdx !== null) {
		const activeSegment = wardrobe.segments?.[activeSegmentIdx]

		return (
			<div className='flex flex-col gap-4 text-white animate-fade-in'>
				<div className='pb-2 flex flex-col text-blue-400 text-[42px]'>
					<p>
						{price} <span className='text-blue-400/70 text-[16px]'>PLN</span>
					</p>
				</div>
				<div className='flex flex-col gap-1 pb-2'>
					<h2 className='text-[24px] font-bold text-blue-400'>
						Bay {activeSegmentIdx + 1} Configuration
					</h2>
					<p className='text-[14px] text-white/50'>
						Modyfying current section:
					</p>
				</div>

				<div className='flex flex-col gap-1'>
					<label className='text-[14px] text-white font-medium'>Layout Type:</label>
					<select
						value={activeSegment?.type || "shelves"}
						onChange={e =>
							onChangeSegmentType(
								activeSegmentIdx,
								e.target.value as "shelves" | "hanger" | "empty"
							)
						}
						className='border border-gray-300 rounded p-2 w-full bg-neutral-900 text-white outline-none'>
						<option value='shelves'>Shelves</option>
						<option value='hanger'>Hanger Rod</option>
						<option value='empty'>Empty Space</option>
					</select>
				</div>

				{activeSegment?.type === "shelves" && (
					<div className='flex flex-col gap-2 mt-1'>
						<label className='text-[14px] text-white/70'>
							Shelves in section:{" "}
							<strong>{activeSegment.shelves.length}</strong>
						</label>
						<div className='flex flex-row gap-2'>
							<button
								onClick={() => onRemoveShelf(activeSegmentIdx)}
								className='w-full bg-[#E04646] hover:bg-red-600 text-white text-[14px] px-3 py-2 rounded-md cursor-pointer transition-colors'>
								- Remove Shelf
							</button>
							<button
								onClick={() => onAddShelf(activeSegmentIdx)}
								className='w-full bg-[#2b7fff] hover:bg-blue-600 text-white text-[14px] px-3 py-2 rounded-md cursor-pointer transition-colors'>
								+ Add Shelf
							</button>
						</div>
					</div>
				)}
				<hr className='border-white/10 my-4' />
				<button onClick={() => onToggleDoorPosition(activeSegmentIdx)}
					className='w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[14px] py-2.5 rounded-md cursor-pointer transition-all'>Change door position: <strong>{activeSegment.doorPosition}</strong></button>
				<button
					onClick={() => setActiveSegmentIdx(null)}
					className='w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[14px] py-2.5 rounded-md cursor-pointer transition-all'>
					← Back to General Dimensions
				</button>
			</div>
		)
	}

	return (
		<div className='flex flex-col gap-4 text-white'>
			<div className='pb-2 flex flex-col text-blue-400 text-[42px]'>
				<p>
					{price} <span className='text-blue-400/70 text-[16px]'>PLN</span>
				</p>
			</div>
			<div className='pb-2 flex flex-row align-center justify-start gap-4'>
				<label htmlFor='width' className='w-full'>
					Width: <strong>{wardrobe.width} mm</strong>
				</label>
				<input
					name='width'
					id='width'
					type='range'
					className='w-full rounded-lg cursor-pointer accent-blue-600'
					max='2400'
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
				<span>Thickness: <strong>{wardrobe.boardThickness} mm</strong></span>
			</div>

			<hr className='border-white/10 my-2' />

			<div className='flex flex-col gap-4'>
				<h3 className='font-semibold text-[#eeeeff] text-sm uppercase tracking-wider'>
					Internal Configuration
				</h3>

				{wardrobe.segments?.map((segment, idx) => (
					<div
						key={segment.id}
						onClick={() => setActiveSegmentIdx(idx)}
						className='p-4 border border-gray-200 bg-black/10 hover:bg-white/5 rounded-lg flex justify-between items-center cursor-pointer transition-all'>
						<div className='flex flex-col'>
							<span className='font-semibold text-blue-500'>Bay {idx + 1}</span>
							<span className='text-[14px] text-white/40'>
								Click to configure
							</span>
						</div>
						<span className='text-[14px] text-white/70 bg-black/50 px-2 py-0.5 rounded'>
							{segment.type === "shelves"
								? `${segment.shelves.length} shelves`
								: segment.type}
						</span>
					</div>
				))}
			</div>
		</div>
	)
}

export default Sidebar
