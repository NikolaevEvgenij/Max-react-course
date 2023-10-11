import { createStore } from "redux";
import {
   createSlice,
   configureStore,
} from "@reduxjs/toolkit";

const initialState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
   name: "counter",
   initialState,
   reducers: {
      increase(state, action) {
         state.counter = state.counter + action.payload;
      },
      decrement(state) {
         state.counter--;
      },
      showCounter(state) {
         state.showCounter = !state.showCounter;
      },
   },
});

const store = configureStore({
   reducer: counterSlice.reducer,
});

export const counterActions = counterSlice.actions;
export default store;
