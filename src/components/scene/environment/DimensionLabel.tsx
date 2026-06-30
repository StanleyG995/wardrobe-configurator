"use client"

import { useRef, useCallback } from "react"
import { Html, Line } from "@react-three/drei"
import { DimensionProps } from "@/types/DimensionProps"

const LINE_COLOR = "black"
const LINE_WIDTH = 1
const CAP_SIZE = 0.05

const INPUT_BASE =
  "flex justify-start items-center border-1 border-black-800 text-[12px] py-2 px-3 gap-1 rounded-full cursor-pointer transition-all duration-200 backdrop-blur-sm outline-none";

const INPUT_STYLES = {
  inactive: `${INPUT_BASE} bg-gray-50/40 text-black-800 focus-within:bg-black-800 focus-within:text-gray-100`,
};

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
                    className={`${INPUT_STYLES.inactive}`}>
                    
                    {label}:{" "}
                    <input
                        ref={inputRef}
                        name={name}
                        type='number'
                        key={value}
                        defaultValue={value}
                        className='px-2 bg-transparent outline-none border-none text-center w-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none '
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