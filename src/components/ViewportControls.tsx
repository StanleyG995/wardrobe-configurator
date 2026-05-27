import { FaRuler, FaUser, FaDoorClosed } from 'react-icons/fa6'
import type { ViewportButtonProps } from '@/types/RenderProps'

const ViewportControls = ({onToggleUpdate}: ViewportButtonProps) => {
    return (
        <div className='p-3 flex flex-col gap-3 w-[180px]'>
            <button onClick={() => onToggleUpdate('dimensions')} className='flex justify-center items-center border-[#dddddd] text-white text-[14px] py-2.5 px-4 gap-2 rounded-md cursor-pointer bg-black/70 hover:bg-black/50'><FaRuler/> Dimensions</button>
            <button className='flex justify-center items-center border-[#dddddd] text-white text-[14px] py-2.5 px-4 gap-2 rounded-md cursor-pointer bg-black/70 hover:bg-black/50'><FaUser/> Human Scale</button>
            <button className='flex justify-center items-center border-[#dddddd] text-white text-[14px] py-2.5 px-4 gap-2 rounded-md cursor-pointer bg-black/70 hover:bg-black/50'><FaDoorClosed/> Open doors</button>
        </div>
    )
}

export default ViewportControls