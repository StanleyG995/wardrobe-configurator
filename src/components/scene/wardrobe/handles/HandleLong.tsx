import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { ThreeElements } from '@react-three/fiber'

function HandleLong(props: ThreeElements['group']) {

  const { nodes } = useGLTF('/models/handle-long.glb')

  const handleMesh = nodes.Cube as THREE.Mesh

  if (!handleMesh) return null

  return (
    <group {...props} dispose={null}>
      <mesh geometry={handleMesh.geometry} material={handleMesh.material} />
    </group>
  )
}

useGLTF.preload('/models/handle-long.glb')

export default HandleLong