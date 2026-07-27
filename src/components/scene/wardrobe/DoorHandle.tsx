"use client"

import { ThreeElements } from '@react-three/fiber'
import { useWardrobeStore } from '@/store/useWardrobeStore'
import { HANDLES } from '@/config/Handles'

const DoorHandle = (props: ThreeElements['group']) => {
  const handleType = useWardrobeStore((state) => state.wardrobe.handleType)

  const handleConfig = HANDLES[handleType]

  if (!handleConfig || !handleConfig.model) {
    return null
  }

  const SelectedHandle = handleConfig.model

  return (
    <SelectedHandle {...props} />
  )
}

export default DoorHandle