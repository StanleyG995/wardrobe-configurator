import { FaRuler, FaUser, FaDoorClosed, FaBorderAll } from "react-icons/fa6"
import { IoMdMale, IoMdFemale } from "react-icons/io"

import { useWardrobeStore } from "@/store/useWardrobeStore"

const ViewportControls = () => {

	const viewportOptions = useWardrobeStore((state) => state.viewportOptions);
	const handleViewportToggle = useWardrobeStore((state) => state.handleViewportToggle)
	const handleViewportGenderToggle = useWardrobeStore((state) => state.handleViewportGenderToggle)

	return (
		<div className='p-3 flex flex-col gap-3 w-[220px] absolute z-50'>
			<button
				onClick={() => handleViewportToggle("dimensionsVisible")}
				className={
					viewportOptions.dimensionsVisible
						? "flex justify-start items-center border-[#dddddd] text-white text-[14px] py-2.5 px-4 gap-2 rounded-md cursor-pointer bg-blue-500 hover:bg-blue-400"
						: "flex justify-start items-center border-[#ddd/ddd] text-white text-[14px] py-2.5 px-4 gap-2 rounded-md cursor-pointer bg-black/70 hover:bg-black/50"
				}>
				<FaRuler className='text-[20px] mr-2' />
				{viewportOptions.dimensionsVisible ? "Hide" : "Show"} Dimensions
			</button>

			<button
				onClick={() => handleViewportToggle("humanScaleVisible")}
				className={
					viewportOptions.humanScaleVisible
						? "flex justify-start items-center border-[#dddddd] text-white text-[14px] py-2.5 px-4 gap-2 rounded-md cursor-pointer bg-blue-500 hover:bg-blue-400"
						: "flex justify-start items-center border-[#dddddd] text-white text-[14px] py-2.5 px-4 gap-2 rounded-md cursor-pointer bg-black/70 hover:bg-black/50"
				}>
				<FaUser className='text-[20px] mr-2' />
				{viewportOptions.humanScaleVisible ? "Hide" : "Show"} human scale
			</button>

			{viewportOptions.humanScaleVisible && (
				<button
					onClick={() => handleViewportGenderToggle()}
					className='ml-10 flex justify-start items-center border-[#dddddd] text-white text-[14px] py-2.5 px-4 gap-2 rounded-md cursor-pointer bg-black/70 hover:bg-blue-400'>
					{viewportOptions.humanScaleGender === "male" ? (
						<>
							<IoMdMale className='text-[20px] mr-2' /> Male
						</>
					) : (
						<>
							<IoMdFemale className='text-[20px] mr-2' /> Female
						</>
					)}
				</button>
			)}
			<button
				onClick={() => handleViewportToggle("doorsOpen")}
				className={
					viewportOptions.doorsOpen
						? "flex justify-start items-center border-[#dddddd] text-white text-[14px] py-2.5 px-4 gap-2 rounded-md cursor-pointer bg-blue-500 hover:bg-blue-400"
						: "flex justify-start items-center border-[#dddddd] text-white text-[14px] py-2.5 px-4 gap-2 rounded-md cursor-pointer bg-black/70 hover:bg-black/50"
				}>
				<FaDoorClosed className='text-[20px] mr-2' />
				{viewportOptions.doorsOpen ? "Close" : "Open"} Doors
			</button>
			<button
				onClick={() => handleViewportToggle("floorVisible")}
				className={
					viewportOptions.floorVisible
						? "flex justify-start items-center border-[#dddddd] text-white text-[14px] py-2.5 px-4 gap-2 rounded-md cursor-pointer bg-blue-500 hover:bg-blue-400"
						: "flex justify-start items-center border-[#dddddd] text-white text-[14px] py-2.5 px-4 gap-2 rounded-md cursor-pointer bg-black/70 hover:bg-black/50"
				}>
				<FaBorderAll className='text-[20px] mr-2' />
				{viewportOptions.floorVisible ? "Hide" : "Show"} Floor
			</button>
		</div>
	)
}

export default ViewportControls
