import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  // upgrade index 0-5
  cost: [0, 0, 0, 0, 0, 0],
};

const upgradeSlice = createSlice({
  name: "upgrade",
  state: initialState,
  reducers: {
    setUpgrade(state, action) {
      state.value = action.payload;
    },
    incrementUpgrade(state, action) {
      state.value += action.payload;
    },
    setCost(state, action) {
      const { index, amount } = action.payload;
      state.cost[index] = amount;
    },
  },
});

export const {
  setUpgrade: setUpgrade,
  incrementUpgrade: incrementUpgrade,
  setCost: setCost,
} = upgradeSlice.actions;
export default upgradeSlice.reducer;
