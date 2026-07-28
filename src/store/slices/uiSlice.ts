import { create } from "zustand";
import { calculateWardrobePrice } from "@/helpers/priceCalculator";
import { MATERIALS } from "@/config/Materials";
import { HANDLES } from '@/config/Handles';
import type { WardrobeState, Wardrobe } from "@/types/WardrobeProps";