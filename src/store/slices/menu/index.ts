import { createSlice } from "@reduxjs/toolkit";

import type { MenuState } from "./types";

const initialState: MenuState = {
  isOpen: false,
  wasOpened: false,
};

const { actions, reducer } = createSlice({
  name: "menu",
  initialState,
  reducers: {
    closeMenu: (state) => ({
      ...state,
      isOpen: false,
    }),
    openMenu: (state) => ({
      ...state,
      isOpen: true,
      wasOpened: true,
    }),
    switchMenuState: (state) => ({
      ...state,
      isOpen: !state.isOpen,
      wasOpened: true,
    }),
  },
});

export const { closeMenu, openMenu, switchMenuState } = actions;

export default reducer;
