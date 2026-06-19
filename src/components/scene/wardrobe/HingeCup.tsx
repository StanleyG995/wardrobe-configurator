import * as THREE from "three"
import React from "react"
import { useGLTF } from "@react-three/drei"
import { ThreeElements } from "@react-three/fiber"

function HingeCup(props: ThreeElements["group"]) {
   
    const { scene } = useGLTF("/models/hinge-cup.glb")

    return (
    
        <group {...props} dispose={null}>
            <primitive 
                object={scene.clone()} 
                scale={[1, 1, 1]} 
                rotation={[0,0,0]}
            />
        </group>
    )
}

useGLTF.preload("/models/hinge-cup.glb")

export default HingeCup