import { FaRuler, FaUser, FaDoorClosed, FaBorderAll } from "react-icons/fa6"
import { IoMdMale, IoMdFemale } from "react-icons/io"

import type { ViewportButtonProps } from "@/types/RenderProps"

const ViewportControls = ({
	onToggleUpdate,
	onToggleGender,
	dimensions,
	humanScale,
	doorsOpen,
	floor,
	gender,
}: ViewportButtonProps) => {
	return (
		<div className='p-3 flex flex-col gap-3 w-[220px] absolute z-50'>
			<button
				onClick={() => onToggleUpdate("dimensions")}
				className={
					dimensions
						? "flex justify-start items-center border-[#dddddd] text-white text-[14px] py-2.5 px-4 gap-2 rounded-md cursor-pointer bg-blue-500 hover:bg-blue-400"
						: "flex justify-start items-center border-[#ddd/ddd] text-white text-[14px] py-2.5 px-4 gap-2 rounded-md cursor-pointer bg-black/70 hover:bg-black/50"
				}>
				<FaRuler className='text-[20px] mr-2' />
				{dimensions ? "Hide" : "Show"} Dimensions
			</button>

			<button
				onClick={() => onToggleUpdate("humanScale")}
				className={
					humanScale
						? "flex justify-start items-center border-[#dddddd] text-white text-[14px] py-2.5 px-4 gap-2 rounded-md cursor-pointer bg-blue-500 hover:bg-blue-400"
						: "flex justify-start items-center border-[#dddddd] text-white text-[14px] py-2.5 px-4 gap-2 rounded-md cursor-pointer bg-black/70 hover:bg-black/50"
				}>
				<FaUser className='text-[20px] mr-2' />
				{humanScale ? "Hide" : "Show"} human scale
			</button>

			{humanScale && (
				<button
					onClick={() => onToggleGender()}
					className='ml-10 flex justify-start items-center border-[#dddddd] text-white text-[14px] py-2.5 px-4 gap-2 rounded-md cursor-pointer bg-black/70 hover:bg-blue-400'>
					{gender === "male" ? (
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
				onClick={() => onToggleUpdate("doorsOpen")}
				className={
					doorsOpen
						? "flex justify-start items-center border-[#dddddd] text-white text-[14px] py-2.5 px-4 gap-2 rounded-md cursor-pointer bg-blue-500 hover:bg-blue-400"
						: "flex justify-start items-center border-[#dddddd] text-white text-[14px] py-2.5 px-4 gap-2 rounded-md cursor-pointer bg-black/70 hover:bg-black/50"
				}>
				<FaDoorClosed className='text-[20px] mr-2' />
				{doorsOpen ? "Close" : "Open"} Doors
			</button>
			<button
				onClick={() => onToggleUpdate("floor")}
				className={
					floor
						? "flex justify-start items-center border-[#dddddd] text-white text-[14px] py-2.5 px-4 gap-2 rounded-md cursor-pointer bg-blue-500 hover:bg-blue-400"
						: "flex justify-start items-center border-[#dddddd] text-white text-[14px] py-2.5 px-4 gap-2 rounded-md cursor-pointer bg-black/70 hover:bg-black/50"
				}>
				<FaBorderAll className='text-[20px] mr-2' />
				{floor ? "Hide" : "Show"} Floor
			</button>
		</div>
	)
}

export default ViewportControls
