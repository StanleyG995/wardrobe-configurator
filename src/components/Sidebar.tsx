'use client';

import type { WardrobeProps } from "../types/WardrobeProps"

const Sidebar = ({ onUpdate, onAddShelf, onRemoveShelf }: WardrobeProps) => {
	return (
		<div>
			<div className='pb-2 flex flex-row align-center justify-start gap-4'>
				<label htmlFor='width'>Width:</label>
				<input
					name='width'
					id='width'
					type='range'
					className="w-full rounded-lg cursor-pointer accent-blue-600"
					max='1400'
					min='800'
					onChange={e =>
						onUpdate(e.target.name, parseFloat(e.target.value))
					}></input>
			</div>
			<div className='pb-2 flex flex-row align-center justify-start gap-4'>
				<label htmlFor='height'>Height:</label>
				<input
					name='height'
					id='height'
					type='range'
					className="w-full rounded-lg cursor-pointer accent-blue-600"
					max='2500'
					min='1500'
					onChange={e =>
						onUpdate(e.target.name, parseFloat(e.target.value))
					}></input>
			</div>
			<div className='pb-3 flex flex-row align-center justify-start gap-4'>
				<label htmlFor='depth'>Depth:</label>
				<input
					name='depth'
					id='depth'
					type='range'
					className="w-full rounded-lg cursor-pointer accent-blue-600"
					max='800'
					min='400'
					onChange={e =>
						onUpdate(e.target.name, parseFloat(e.target.value))
					}></input>
			</div>
			<div className='pb-6 flex flex-row align-center justify-start gap-4'>
				<label htmlFor='boardThickness'>Thickness:</label>
				<select
					name='boardThickness'
					onChange={e => onUpdate(e.target.name, parseFloat(e.target.value))}
					className='border-1 w-full'>
					<option value={15}>15 mm</option>
					<option value={18}>18 mm</option>
					<option value={20}>20 mm</option>
				</select>
			</div>
			<div className='pb-2 flex flex-row align-center justify-start gap-4'>
				<button onClick={onAddShelf} className='w-full bg-[#2b7fff] text-white px-4 py-2 rounded-md cursor-pointer'>Add shelf</button>
				<button onClick={onRemoveShelf} className='w-full bg-[#E04646] text-white px-4 py-2 rounded-md cursor-pointer'>Remove shelf</button>
			</div>
		</div>
	)
}

export default Sidebar
