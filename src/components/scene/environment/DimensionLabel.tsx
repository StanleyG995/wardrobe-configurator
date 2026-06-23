"use client"

import { useRef, useCallback } from "react"
import { Html, Line } from "@react-three/drei"
import { DimensionProps } from "@/types/DimensionProps"

const LINE_COLOR = "black"
const LINE_WIDTH = 1
const CAP_SIZE = 0.05

function DimensionLabel({
	name,
	position,
	value,
	label,
	linePositionStart,
	linePositionEnd,
	axis,
	onUpdate,
	min,
	max,
}: DimensionProps) {
	const [sX, sY, sZ] = linePositionStart
	const [eX, eY, eZ] = linePositionEnd

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

	const getCapPoints = useCallback(
		(
			x: number,
			y: number,
			z: number
		): [[number, number, number], [number, number, number]] => {
			if (axis === "x")
				return [
					[x + CAP_SIZE, y, z],
					[x - CAP_SIZE, y, z],
				]
			if (axis === "y")
				return [
					[x, y + CAP_SIZE, z],
					[x, y - CAP_SIZE, z],
				]
			return [
				[x, y, z + CAP_SIZE],
				[x, y, z - CAP_SIZE],
			]
		},
		[axis]
	)

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
					className='bg-black/60 backdrop-blur-md text-white px-2 flex flex-row justify-center py-1 rounded border border-white/20 text-[10px] text-[clamp(10px,1vw,14px)] max-w-[200px] focus-within:border-blue-600 focus-within:border-2 hover:border-blue-600 hover:border-2'>
					{label}:{" "}
					<input
						ref={inputRef}
						name={name}
						type='number'
						key={value}
						defaultValue={value}
						className='w-12 bg-transparent outline-none border-none p-0 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
						onBlur={handleValidateAndSubmit}
						onKeyDown={e => {
							if (e.key === "Enter") {
								e.currentTarget.blur()
							}
							if (e.key === "Escape") {
								if (inputRef.current) {
									inputRef.current.value = value.toString()
								}
								e.currentTarget.blur()
							}
						}}
					/>{" "}
					mm
				</div>
			</Html>

			<Line
				lineWidth={LINE_WIDTH}
				color={LINE_COLOR}
				points={[linePositionStart, linePositionEnd]}
			/>
			<Line
				lineWidth={LINE_WIDTH}
				color={LINE_COLOR}
				points={getCapPoints(sX, sY, sZ)}
			/>
			<Line
				lineWidth={LINE_WIDTH}
				color={LINE_COLOR}
				points={getCapPoints(eX, eY, eZ)}
			/>
		</group>
	)
}

export default DimensionLabel
