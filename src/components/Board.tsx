import type { BoardProps } from '../types/BoardProps'

const Board = ({ name, scale, rotation, position, color }: BoardProps) => {
	return (
		<mesh name={name} scale={scale} rotation={rotation} position={position}>
			<boxGeometry />
			<meshStandardMaterial color={color} />
		</mesh>
	)
}

export default Board