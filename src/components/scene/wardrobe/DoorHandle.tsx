"use client"

import { ThreeElements } from '@react-three/fiber'
import { useWardrobeStore } from '@/store/useWardrobeStore'

import HandleStraight from '@/components/scene/wardrobe/handles/HandleStraight'
import HandleLong from '@/components/scene/wardrobe/handles/HandleLong'
import HandleModern from '@/components/scene/wardrobe/handles/HandleModern'

const HANDLE_COMPONENTS = {
  straight: HandleStraight,
  long: HandleLong,
  modern: HandleModern,
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