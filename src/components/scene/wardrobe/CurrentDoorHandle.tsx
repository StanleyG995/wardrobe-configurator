import { ThreeElements } from '@react-three/fiber'

import HandleLong from '@/components/scene/wardrobe/handles/HandleLong'

const CurrentDoorHandle = (props: ThreeElements['group']) => {
    return (
        <HandleLong {...props}/>
    )
}

export default CurrentDoorHandle