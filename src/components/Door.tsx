import Board from '@/components/Board'
import { WardrobeProps } from '@/types/WardrobeProps'
import { toMeters } from '@/helpers/unitConverter'

const Door = ({wardrobe}:WardrobeProps) => {

    return (
        <group position={[toMeters(-wardrobe.width/2), 0, toMeters(wardrobe.depth/2+wardrobe.boardThickness/2)]} rotation = {[0,-Math.PI/1.5,0]}>
            <Board name='door' w={wardrobe.width} h={wardrobe.height} d={wardrobe.boardThickness} x={wardrobe.width/2} y={wardrobe.height/2} z={0} rotation = {[0,0,0]}/>
        </group>
        
    )
}

export default Door