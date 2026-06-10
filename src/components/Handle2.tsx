import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { ThreeElements } from '@react-three/fiber'

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh
  }
  materials: {}
}

function Handle2(props: ThreeElements['group']) {
  const { nodes, materials } = useGLTF('/models/handle-2.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Cube.geometry} material={nodes.Cube.material} />
    </group>
  )
}

useGLTF.preload('/models/handle-2.glb')

export default Handle2