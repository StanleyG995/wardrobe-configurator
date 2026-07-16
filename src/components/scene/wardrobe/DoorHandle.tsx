"use client"

import { ThreeElements } from '@react-three/fiber'
import { useWardrobeStore } from '@/store/useWardrobeStore'

import HandleStraight from '@/components/scene/wardrobe/handles/HandleStraight'
import HandleKnob from '@/components/scene/wardrobe/handles/HandleKnob'

const HANDLE_COMPONENTS = {
  straight: HandleStraight,
  knob: HandleKnob,
  none: null,
} as const;

const DoorHandle = (props: ThreeElements['group']) => {
  const handleType = useWardrobeStore((state) => state.wardrobe.handleType)

  if (handleType === "none" || !HANDLE_COMPONENTS[handleType]) {
    return null
  }

  const SelectedHandle = HANDLE_COMPONENTS[handleType]

  return (
    <SelectedHandle {...props} />
  )
}

export default DoorHandle