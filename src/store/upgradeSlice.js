import { createSlice } from "@reduxjs/toolkit";

// const getInitailCost = () => {
//   const length = 6;
//   var cost = new Array(length);

//   for (var i = 0; i < length; ++i) {
//     cost[i] = 0;
//   }

//   return cost;
// }

// const initialCost = getInitailCost();

const initialState = {
  value: 0,
  // upgrade index 0-5
  cost: [0, 0, 0, 0, 0, 0],
};

const upgradeSlice = createSlice({
  name: "upgrade",
  initialState,
  reducers: {
    setUpgrade(state, action) {
      state.value = action.payload;
    },
    incrementUpgrade(state, action) {
      state.value += action.payload;
    },
    setCost(state, action) {
      const { index, amount } = action.payload;
      const updatedCost = [...state.cost]; // Create a copy of the original array
      updatedCost[index] = amount; // Update value
      state.cost = updatedCost;

      // let newCost = state.cost;
      // newCost[index] = amount;

      // return {
      //   ...state,
      //   cost: newCost
      // }
    },
  },
});

export const { setUpgrade, incrementUpgrade, setCost } = upgradeSlice.actions;
export default upgradeSlice.reducer;
