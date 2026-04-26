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
					max='1400'
					min='800'
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
					max='2500'
					min='1500'
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
					max='800'
					min='400'
					onChange={e =>
						onUpdate(e.target.name, parseFloat(e.target.value))
					}></input>
			</div>
			<div className='ui-panel-control'>
				<label htmlFor='depth'>Thickness:</label>
				<select
					name='boardThickness'
					onChange={e => onUpdate(e.target.name, parseFloat(e.target.value))}>
					<option value={15}>15 mm</option>
					<option value={18}>18 mm</option>
					<option value={20}>20 mm</option>
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
