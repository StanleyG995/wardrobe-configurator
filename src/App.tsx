import { useState } from 'react'

import "./App.css"
import Render from './components/Render'

function App() {

	const [wardrobeWidth, setWardrobeWidth] = useState(100)
	const [wardrobeHeight, setWardrobeHeight] = useState(200)
	const [wardrobeDepth, setWardrobeDepth] = useState(60)
	const [boardThickness, setBoardThickness] = useState(1.8)
	const [backBoardThickness] = useState(0.5)
	const [shelves, setShelves] = useState<string[]>([])

	const addShelf = () => {
		const minShelfGap = 45
		const usableHeight =
			wardrobeHeight - 2 * boardThickness - shelves.length * boardThickness
		const potentialGap = (usableHeight - boardThickness) / (shelves.length + 1)

		if (potentialGap > minShelfGap) {
			setShelves(prev => [...prev, crypto.randomUUID()])
		} else return
	}

	const removeShelf = () => {
		setShelves(prev => prev.slice(0, -1))
	}


	return (
		<div className='app-container'>
			<div className='ui-panel'>
				<div className='ui-panel-control'>
					<label htmlFor='width'>Width: {wardrobeWidth}</label>
					<input
						id='width'
						type='range'
						max='140'
						min='80'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setWardrobeWidth(parseFloat(e.target.value))
						}}></input>
				</div>
				<div className='ui-panel-control'>
					<label htmlFor='height'>Height: {wardrobeHeight}</label>
					<input
						id='height'
						type='range'
						max='250'
						min='150'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setWardrobeHeight(parseFloat(e.target.value))
						}}></input>
				</div>
				<div className='ui-panel-control'>
					<label htmlFor='depth'>Depth: {wardrobeDepth}</label>
					<input
						id='depth'
						type='range'
						max='80'
						min='40'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setWardrobeDepth(parseFloat(e.target.value))
						}}></input>
				</div>
				<div className='ui-panel-control'>
					<label htmlFor='depth'>Width: {wardrobeDepth}</label>
					<select
						onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
							setBoardThickness(parseFloat(e.target.value))
						}}>
						<option value={1.5}>15 mm</option>
						<option value={1.8}>18 mm</option>
						<option value={2}>20 mm</option>
					</select>
				</div>
				<div className='ui-panel-control'>
					<button onClick={addShelf}>Add shelf</button>
					<button onClick={removeShelf}>Remove shelf</button>
				</div>
			</div>

			<Render	
				wardrobeDepth={wardrobeDepth}
				wardrobeHeight={wardrobeHeight}
				wardrobeWidth={wardrobeWidth}
				boardThickness={boardThickness}
				backBoardThickness={backBoardThickness}
				shelves={shelves}
			/>
		</div>
	)
}

export default App
