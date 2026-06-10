'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MathUtils, Group } from 'three'
import Board from '@/components/Board'
import { DoorProps } from '@/types/WardrobeProps'
import { toMeters } from '@/helpers/unitConverter'
import Handle1 from '@/components/Handle1'
import Handle2 from '@/components/Handle2'
import Handle3 from '@/components/Handle3'

const Door = ({width, height, depth, boardThickness, doorRotation, isOpen}: DoorProps) => {

    const hingeRef = useRef<Group>(null)

    const targetRotation = isOpen ? -Math.PI / 2 : 0

    useFrame((state, delta) => {
    if (hingeRef.current) {
      hingeRef.current.rotation.y = MathUtils.lerp(
        hingeRef.current.rotation.y,
        targetRotation,
        0.1
      )
    }
  })

    return (
        <group ref={hingeRef} position={[toMeters(-width/2), 0, toMeters(depth/2+boardThickness/2)]}>
           <Handle1 position={[toMeters(width-100),toMeters(height/2), toMeters(-20+boardThickness*3)]} rotation={[0,-Math.PI/2,0]} scale={[0.7,0.6,0.7]}/>
           {false && <Handle2 position={[toMeters(width-100),toMeters(height/2), toMeters(-20+boardThickness*3)]} rotation={[0,-Math.PI/2,0]} scale={[0.7,0.6,0.7]}/>}
           {false && <Handle3 position={[toMeters(width-100),toMeters(height/2), toMeters(-20+boardThickness*3)]} rotation={[0,-Math.PI/2,0]} scale={[0.7,0.6,0.7]}/>}
            <Board name='door' w={width} h={height} d={boardThickness} x={width/2} y={height/2} z={0} rotation = {[0,0,0]}/>
        </group>
        
    )
}

export default Door