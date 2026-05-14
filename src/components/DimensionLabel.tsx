import { Html, Line } from "@react-three/drei"
import { DimensionProps } from '@/types/DimensionProps'

interface ExtendedDimensionProps extends DimensionProps {
  axis?: 'x' | 'y' | 'z';
}

function DimensionLabel({ 
  position, 
  value, 
  label, 
  linePositionStart, 
  linePositionEnd, 
  axis = 'z' 
}: ExtendedDimensionProps) {
  
  const [sX, sY, sZ] = linePositionStart;
  const [eX, eY, eZ] = linePositionEnd;
  const size = 0.05;

  const getCapPoints = (x: number, y: number, z: number): [[number, number, number], [number, number, number]] => {
    if (axis === 'x') return [[x + size, y, z], [x - size, y, z]];
    if (axis === 'y') return [[x, y + size, z], [x, y - size, z]];
    return [[x, y, z + size], [x, y, z - size]];
  };

  return (
    <group>
      <Html position={position} center>
        <div className="bg-black/60 backdrop-blur-md text-white px-2 py-1 rounded border border-white/20 text-[10px] whitespace-nowrap pointer-events-none select-none text-[clamp(10px,1vw,14px)] max-w-[200px]">
          {label}: {value}mm
        </div>
      </Html>
      
      <Line color='black' points={[linePositionStart, linePositionEnd]} lineWidth={1} />
      <Line color='black' points={getCapPoints(sX, sY, sZ)} lineWidth={1} />
      <Line color='black' points={getCapPoints(eX, eY, eZ)} lineWidth={1} />
    </group>
  );
}

export default DimensionLabel