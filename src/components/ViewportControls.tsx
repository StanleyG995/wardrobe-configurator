import { FaRuler, FaUser, FaDoorClosed, FaBorderAll } from 'react-icons/fa6'
import type { ViewportButtonProps } from '@/types/RenderProps'

const ViewportControls = ({onToggleUpdate, dimensions, humanScale, doorsOpen, floor}: ViewportButtonProps) => {
    return (
        <div className='p-3 flex flex-col gap-3 w-[180px] absolute z-50'>
            <button onClick={() => onToggleUpdate('dimensions')} className={dimensions ? 'flex justify-start items-center border-[#dddddd] text-white text-[14px] py-2.5 px-4 gap-2 rounded-md cursor-pointer bg-blue-500 hover:bg-blue-400' : 'flex justify-start items-center border-[#dddddd] text-white text-[14px] py-2.5 px-4 gap-2 rounded-md cursor-pointer bg-black/70 hover:bg-black/50' }><FaRuler className='text-[20px] mr-2'/> Dimensions</button>
            <button onClick={() => onToggleUpdate('humanScale')} className={humanScale ? 'flex justify-start items-center border-[#dddddd] text-white text-[14px] py-2.5 px-4 gap-2 rounded-md cursor-pointer bg-blue-500 hover:bg-blue-400' : 'flex justify-start items-center border-[#dddddd] text-white text-[14px] py-2.5 px-4 gap-2 rounded-md cursor-pointer bg-black/70 hover:bg-black/50' }><FaUser className='text-[20px] mr-2'/> Human scale</button>
            <button onClick={() => onToggleUpdate('doorsOpen')} className={doorsOpen ? 'flex justify-start items-center border-[#dddddd] text-white text-[14px] py-2.5 px-4 gap-2 rounded-md cursor-pointer bg-blue-500 hover:bg-blue-400' : 'flex justify-start items-center border-[#dddddd] text-white text-[14px] py-2.5 px-4 gap-2 rounded-md cursor-pointer bg-black/70 hover:bg-black/50' }><FaDoorClosed className='text-[20px] mr-2'/> Doors</button>
            <button onClick={() => onToggleUpdate('floor')} className={floor ? 'flex justify-start items-center border-[#dddddd] text-white text-[14px] py-2.5 px-4 gap-2 rounded-md cursor-pointer bg-blue-500 hover:bg-blue-400' : 'flex justify-start items-center border-[#dddddd] text-white text-[14px] py-2.5 px-4 gap-2 rounded-md cursor-pointer bg-black/70 hover:bg-black/50' }><FaBorderAll className='text-[20px] mr-2'/> Floor</button>
            
        </div>
    )
}

export default ViewportControls