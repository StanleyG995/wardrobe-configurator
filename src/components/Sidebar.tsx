import type { WardrobeProps } from "../types/WardrobeProps"

const Sidebar = ({ onUpdate, onAddShelf, onRemoveShelf }: WardrobeProps) => {
	return (
		<div className='ui-panel'>
			<div className='ui-panel-control'>
				<label htmlFor='width'>Width:</label>
				<input
					name='width'
					id='width'
					type='range'
					max='140'
					min='80'
					onChange={e =>
						onUpdate(e.target.name, parseFloat(e.target.value))
					}></input>
			</div>
			<div className='ui-panel-control'>
				<label htmlFor='height'>Height:</label>
				<input
					name='height'
					id='height'
					type='range'
					max='250'
					min='150'
					onChange={e =>
						onUpdate(e.target.name, parseFloat(e.target.value))
					}></input>
			</div>
			<div className='ui-panel-control'>
				<label htmlFor='depth'>Depth:</label>
				<input
					name='depth'
					id='depth'
					type='range'
					max='80'
					min='40'
					onChange={e =>
						onUpdate(e.target.name, parseFloat(e.target.value))
					}></input>
			</div>
			<div className='ui-panel-control'>
				<label htmlFor='depth'>Thickness:</label>
				<select
					name='boardThickness'
					onChange={e => onUpdate(e.target.name, parseFloat(e.target.value))}>
					<option value={1.5}>15 mm</option>
					<option value={1.8}>18 mm</option>
					<option value={2}>20 mm</option>
				</select>
			</div>
			<div className='ui-panel-control'>
				<button onClick={onAddShelf}>Add shelf</button>
				<button onClick={onRemoveShelf}>Remove shelf</button>
			</div>
		</div>
	)
}

export default Sidebar
