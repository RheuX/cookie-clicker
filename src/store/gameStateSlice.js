import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active: true,
};

const gameStateSlice = createSlice({
  name: "gameState",
  state: initialState,
  reducers: {
    togglePause(state) {
      state.active = !state.active;
    },
  },
});

export const { togglePause: togglePause } = gameStateSlice.actions;
export default gameStateSlice.reducer;
