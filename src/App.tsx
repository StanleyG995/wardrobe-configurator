import { useState } from 'react'

import "./App.css"
import Sidebar from './components/Sidebar'
import Render from './components/Render'

function App() {

	const [wardrobe, setWardrobe] = useState({
		width: 100,
		height: 200,
		depth: 60,
		boardThickness: 1.8,
		backBoardThickness: 0.5,
		shelves: []
	  });

	const handleUpdate = (name: string, value: number) => {
		setWardrobe(prev => ({
		  ...prev,
		  [name]: value // Dynamicznie aktualizuje pole o danej nazwie
		}));
	  };

	// const addShelf = () => {
	// 	const minShelfGap = 45
	// 	const usableHeight =
	// 		wardrobe.height - 2 * wardrobe.boardThickness - wardrobe.shelves.length * wardrobe.boardThickness
	// 	const potentialGap = (usableHeight - wardrobe.boardThickness) / (wardrobe.shelves.length + 1)

	// 	if (potentialGap > minShelfGap) {
	// 		setWardrobe(prev => [...prev, crypto.randomUUID()])
	// 	} else return
	// }

	// const removeShelf = () => {
	// 	setShelves(prev => prev.slice(0, -1))
	// }


	return (
		<div className='app-container'>
			
			<Sidebar onUpdate={handleUpdate} />

			<Render	
				wardrobeDepth={wardrobe.depth}
				wardrobeHeight={wardrobe.height}
				wardrobeWidth={wardrobe.width}
				boardThickness={wardrobe.boardThickness}
				backBoardThickness={wardrobe.backBoardThickness}
				shelves={wardrobe.shelves}
			/>
		</div>
	)
}

export default App
