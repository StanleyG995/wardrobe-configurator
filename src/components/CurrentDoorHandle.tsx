import { ThreeElements } from '@react-three/fiber'

import HandleLong from '@/components/HandleLong'

const CurrentDoorHandle = (props: ThreeElements['group']) => {
    return (
        <HandleLong {...props}/>
    )
}

export default CurrentDoorHandle