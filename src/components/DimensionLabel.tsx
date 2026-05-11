import { Html } from "@react-three/drei"
import { DimensionProps } from '@/types/DimensionProps'

function DimensionLabel({ position, value, label }: DimensionProps) {
  return (
    <Html position={position} center >
      <div className="bg-black/60 backdrop-blur-md text-white px-2 py-1 rounded border border-white/20 text-[10px] whitespace-nowrap pointer-events-none select-none text-[clamp(10px,2vw,16px)] 
        max-w-[200px]">
        {label}: {value}mm
      </div>
    </Html>
  )
}

export default DimensionLabel