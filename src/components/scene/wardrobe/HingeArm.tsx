import * as THREE from "three"
import React from "react"
import { useGLTF } from "@react-three/drei"
import { ThreeElements } from "@react-three/fiber"
import { toMeters } from '@/helpers/unitConverter'

function HingeCup(props: ThreeElements["group"]) {
   
    const { scene } = useGLTF("/models/hinge-arm.glb")

    return (
    
        <group {...props} dispose={null}>
            <primitive 
                object={scene.clone()} 
                scale={[1, 1, 1]} 
                rotation={[-Math.PI/2,Math.PI,0]}
                position={[toMeters(20),0,toMeters(-10)]}
            />
        </group>
    )
}

useGLTF.preload("/models/hinge-arm.glb")

export default HingeCup