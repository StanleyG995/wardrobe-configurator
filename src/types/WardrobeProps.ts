import { ComponentType } from 'react';
import { ThreeElements } from '@react-three/fiber';
import type { HistorySlice } from "@/store/slices/historySlice.types";
import type { WardrobeSlice } from "@/store/slices/wardrobeSlice.types";
import type { SegmentsSlice } from "@/store/slices/segmentsSlice.types";
import type { UISlice } from "@/store/slices/uiSlice.types";

export interface HandleType {
    handleType: 'straight' | 'knob' | 'none'; 
}

export interface HandleConfig {
  model: ComponentType<ThreeElements['group']> | null;
  price: number;
}

export interface Material {
    material: string;
}

export interface MaterialConfig {
    textureUrl?: string;
    color?: string;
    metalness: number;
    roughness: number;
    price: number,
}

export interface Wardrobe {
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  boardThickness: number;
  backBoardThickness: number;
  segments: {
    id: string;
    type: "shelves" | "hanger" | "empty";
    shelves: string[];
    doorPosition: "left" | "right";
    mirror: boolean,
  }[];
  caseMaterial: Material["material"];
  doorMaterial: Material["material"];
  handleType: HandleType["handleType"];
}

// Główny typ stanu łączący wszystkie mniejsze slice'y
export type WardrobeState = 
  & HistorySlice 
  & WardrobeSlice 
  & SegmentsSlice 
  & UISlice;