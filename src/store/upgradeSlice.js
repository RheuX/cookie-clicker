import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // upgrade index 0-5
  value: 0,
  cost: [0,0,0,0,0,0],
};

const upgradeSlice = createSlice({
  name: "upgrade",
  state: initialState,
  reducers: {
    setUpgrade(state, action) {
      const { index, amount } = action.payload;
      state.value = amount;
    },
    setCost(state, action) {
      const { index, amount } = action.payload;
      state.cost[index] = amount;
    },
  },
});

export const { setUpgrade: setUpgrade, setCost: setCost } = upgradeSlice.actions;
export default upgradeSlice.reducer;
