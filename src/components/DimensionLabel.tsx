"use client"

import { useRef } from "react"
import { Html, Line } from "@react-three/drei"
import { DimensionProps } from "@/types/DimensionProps"

interface ExtendedDimensionProps extends DimensionProps {
	axis?: "x" | "y" | "z"
}

function DimensionLabel({
	name,
	position,
	value,
	label,
	linePositionStart,
	linePositionEnd,
	axis = "z",
	onUpdate,
	min,
	max,
}: ExtendedDimensionProps) {
	const [sX, sY, sZ] = linePositionStart
	const [eX, eY, eZ] = linePositionEnd
	const size = 0.05

	const inputRef = useRef<HTMLInputElement>(null)

	const handleValidateAndSubmit = () => {
		const inputEl = inputRef.current
		if (!inputEl) return

		const parsed = parseFloat(inputEl.value)

		if (!isNaN(parsed)) {
			const clampedValue = Math.max(min, Math.min(max, parsed))
			onUpdate(name, clampedValue)
			inputEl.value = clampedValue.toString()
		} else {
			inputEl.value = value.toString()
		}
	}

	const getCapPoints = (
		x: number,
		y: number,
		z: number
	): [[number, number, number], [number, number, number]] => {
		if (axis === "x")
			return [
				[x + size, y, z],
				[x - size, y, z],
			]
		if (axis === "y")
			return [
				[x, y + size, z],
				[x, y - size, z],
			]
		return [
			[x, y, z + size],
			[x, y, z - size],
		]
	}

	const stopPropagation = (e: React.MouseEvent | React.PointerEvent) => {
		e.stopPropagation()
	}

	return (
		<group>
			<Html position={position} center>
				<div
					onPointerDown={stopPropagation}
					onMouseDown={stopPropagation}
					onPointerUp={stopPropagation}
					className='bg-black/60 backdrop-blur-md text-white px-2 flex flex-row justify-center py-1 rounded border border-white/20 text-[10px] text-[clamp(10px,1vw,14px)] max-w-[200px]'>
					{label}:{" "}
					<input
						ref={inputRef}
						name={name}
						type='number'
						key={value}
						defaultValue={value}
						className='w-12 bg-transparent  outline-none border-none p-0 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
						onBlur={handleValidateAndSubmit}
						onKeyDown={e => {
							if (e.key === "Enter") e.currentTarget.blur()
						}}
					/>{" "}
					mm
				</div>
			</Html>

			<Line
				color='black'
				points={[linePositionStart, linePositionEnd]}
				lineWidth={1}
			/>
			<Line color='black' points={getCapPoints(sX, sY, sZ)} lineWidth={1} />
			<Line color='black' points={getCapPoints(eX, eY, eZ)} lineWidth={1} />
		</group>
	)
}

export default DimensionLabel
