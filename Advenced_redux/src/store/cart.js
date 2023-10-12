import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   showCart: false,
   productCount: 0,
   totalCount: 0,
   product: {},
};

const cartState = createSlice({
   name: "cart",
   initialState,
   reducers: {
      showCart(state) {
         return !state.showCart;
      },
   },
});
