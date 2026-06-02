"use client"

import type { HumanScaleProps } from "@/types/RenderProps"

import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { Image as DreiImage, Line, Html } from "@react-three/drei"
import { toMeters, toMilimeters } from "../helpers/unitConverter"
import * as THREE from "three"

const HumanScale = ({ gender, dimensions }: HumanScaleProps) => {
	const groupRef = useRef<THREE.Group>(null)

	const humanHeight = gender === "male" ? toMeters(1800) : toMeters(1650)

	const [loadedUrl, setLoadedUrl] = useState<string | null>(null)
	const [humanWidth, setHumanWidth] = useState(0)

	const imgUrl = gender === "male" ? "/silhouette-01.svg" : "/silhouette-02.svg"
	const isReady = loadedUrl === imgUrl

	useEffect(() => {
		let isCurrent = true

		fetch(imgUrl)
			.then(res => res.text())
			.then(svgText => {
				if (!isCurrent) return

				const parser = new DOMParser()

				const svgDoc = parser.parseFromString(svgText, "image/svg+xml")
				const svgElement = svgDoc.querySelector("svg")

				if (svgElement) {
					let width = parseFloat(svgElement.getAttribute("width") || "0")
					let height = parseFloat(svgElement.getAttribute("height") || "0")

					if (!width || !height) {
						const viewBox = svgElement.getAttribute("viewBox")
						if (viewBox) {
							const [, , vbWidth, vbHeight] = viewBox.split(" ").map(Number)
							width = vbWidth
							height = vbHeight
						}
					}
					const aspectRatio = width && height ? width / height : 0.268
					setHumanWidth(humanHeight * aspectRatio)
					setLoadedUrl(imgUrl)
				}
			})
			.catch(err => {
				console.error("Błąd podczas pobierania wymiarów SVG:", err)
				if (isCurrent) {
					setHumanWidth(humanHeight * 0.268)
					setLoadedUrl(imgUrl)
				}
			})

		return () => {
			isCurrent = false
		}
	}, [imgUrl, humanHeight])

	useFrame(({ camera }) => {
		if (groupRef.current && isReady) {
			const camPos = camera.position
			groupRef.current.rotation.y = Math.atan2(
				camPos.x - groupRef.current.position.x,
				camPos.z - groupRef.current.position.z
			)
		}
	})

	if (!isReady || humanWidth === 0) return null

	return (
		<group ref={groupRef} position={[0, 0, 1.4]}>
			<DreiImage
				castShadow
				receiveShadow
				url={imgUrl}
				scale={[humanWidth, humanHeight]}
				position={[0, humanHeight / 2, 0]}
				transparent
				opacity={0.8}
			/>

			{ dimensions && <group>
				<Html position={[0.4, humanHeight / 2, 0]} center>
					<div className='bg-black/60 whitespace-nowrap backdrop-blur-md text-white px-2 flex flex-row justify-center py-1 rounded border border-white/20 text-[10px] text-[clamp(10px,1vw,14px)] max-w-[200px]'>
						<span>{Math.round(toMilimeters(humanHeight))} mm</span>
					</div>
				</Html>
				<Line
					color='black'
					points={[
						[0.4, 0, 0],
						[0.4, humanHeight, 0],
					]}
					lineWidth={1}
				/>
				<Line
					color='black'
					points={[
						[0, 0, 0],
						[0.4, 0, 0],
					]}
					lineWidth={1}
				/>
				<Line
					color='black'
					points={[
						[0, humanHeight, 0],
						[0.4, humanHeight, 0],
					]}
					lineWidth={1}
				/>
			</group>
            }
		</group>
	)
}

export default HumanScale
