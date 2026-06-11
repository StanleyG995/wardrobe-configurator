import { ThreeElements } from '@react-three/fiber'
import HandleStraight from '@/components/HandleStraight'
import HandleModern from '@/components/HandleModern'
import HandleLong from '@/components/HandleLong'

const CurrentDoorHandle = (props: ThreeElements['group']) => {
    return (
        <HandleLong {...props}/>
    )
}

export default CurrentDoorHandle