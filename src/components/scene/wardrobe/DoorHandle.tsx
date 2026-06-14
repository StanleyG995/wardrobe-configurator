import { ThreeElements } from '@react-three/fiber'

import HandleStraight from '@/components/scene/wardrobe/handles/HandleStraight'

const DoorHandle = (props: ThreeElements['group']) => {
    return (
        <HandleStraight {...props}/>
    )
}

export default DoorHandle