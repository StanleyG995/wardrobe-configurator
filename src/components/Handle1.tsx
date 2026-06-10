import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { ThreeElements } from '@react-three/fiber'

function Handle1(props: ThreeElements['group']) {

  const { nodes } = useGLTF('/models/handle-1.glb')

  const handleMesh = nodes.Cube as THREE.Mesh

  if (!handleMesh) return null

  return (
    <group {...props} dispose={null}>
      <mesh geometry={handleMesh.geometry} material={handleMesh.material} />
    </group>
  )
}

useGLTF.preload('/models/handle-1.glb')

export default Handle1