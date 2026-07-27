
import { HandleType, HandleConfig } from "@/types/WardrobeProps";
import HandleStraight from '@/components/scene/wardrobe/handles/HandleStraight'
import HandleKnob from '@/components/scene/wardrobe/handles/HandleKnob'


export const HANDLES: Record<HandleType['handleType'], HandleConfig> = {
  straight: {
    model: HandleStraight,
    price: 50,
  },
  knob: {
    model: HandleKnob,
    price: 60,
  },
  none: {
    model: null,
    price: 70,
  },
} as const;
