import { useState } from "react"

import "./App.css"
import Sidebar from "./components/Sidebar"
import Render from "./components/Render"

import { useWardrobe } from './hooks/useWardrobe'

function App() {
	
	const { wardrobe, handleUpdate, addShelf, removeShelf } = useWardrobe()

	return (
		<div className='app-container'>
			<Sidebar
				onUpdate={handleUpdate}
				onAddShelf={addShelf}
				onRemoveShelf={removeShelf}
			/>

			<Render
				wardrobe={wardrobe}
			/>
		</div>
	)
}
export default App
