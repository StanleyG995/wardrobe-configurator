import Board from '@/components/Board'
import { WardrobeDimensions } from '@/types/WardrobeProps'
import { toMeters } from '@/helpers/unitConverter'

const Door = ({width, height, depth, boardThickness}:Omit<WardrobeDimensions,'backBoardThickness'>) => {

    return (
        <group position={[toMeters(-width/2), 0, toMeters(depth/2+boardThickness/2)]} rotation = {[0,-Math.PI/1.5,0]}>
            <Board name='door' w={width} h={height} d={boardThickness} x={width/2} y={height/2} z={0} rotation = {[0,0,0]}/>
        </group>
        
    )
}

export default Door