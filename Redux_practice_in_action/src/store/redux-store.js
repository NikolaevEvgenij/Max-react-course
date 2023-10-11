import { createStore } from "redux";
import { createSlice } from "@reduxjs/toolkit";

const initialState = { counter: 0, showCounter: true };

createSlice({
   name: "counter",
   initialState,
   reducers: {
      increase(state, action) {
         state.counter = state.counter + action.value;
      },
      decrement(state) {
         state.counter--;
      },
      showCounter(state) {
         state.showCounter = !state.showCounter;
      },
   },
});

const counterReducer = (state = initialState, action) => {
   switch (action.type) {
      case "increase":
         return {
            counter: state.counter + action.value,
            showCounter: state.showCounter,
         };
      case "decrement":
         return {
            counter: state.counter - 1,
            showCounter: state.showCounter,
         };
      case "showCounter":
         return {
            showCounter: !state.showCounter,
            counter: state.counter,
         };
      default:
         return state;
   }
};

const store = createStore(counterReducer);

export default store;
