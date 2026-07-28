import { StateCreator } from "zustand";
import type { WardrobeState } from "@/types/WardrobeProps";
import type { UISlice } from "./uiSlice.types";

export const createUISlice: StateCreator<
  WardrobeState,
  [],
  [],
  UISlice
> = (set) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),

  viewportOptions: {
    dimensionsVisible: true,
    humanScaleVisible: false,
    humanScaleGender: "male",
    doorsOpen: false,
    doorsVisible: true,
    floorVisible: true,
  },

  handleViewportToggle: (name) =>
    set((state) => ({
      viewportOptions: {
        ...state.viewportOptions,
        [name]: !state.viewportOptions[name],
      },
    })),

  handleViewportGenderToggle: () =>
    set((state) => ({
      viewportOptions: {
        ...state.viewportOptions,
        humanScaleGender: state.viewportOptions.humanScaleGender === "male" ? "female" : "male",
      },
    })),

  toggleOpenDoors: () =>
    set((state) => {
      const nextDoorsOpen = !state.viewportOptions.doorsOpen;
      return {
        viewportOptions: {
          ...state.viewportOptions,
          doorsOpen: nextDoorsOpen,
        },
      };
    }),
});