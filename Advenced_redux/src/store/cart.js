import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   showCart: false,
   totalAmount: 0,
   productsArray: [],
};

const cartSlice = createSlice({
   name: "cart",
   initialState,
   reducers: {
      showCart(state) {
         state.showCart = !state.showCart;
      },
      addToCart(state, action) {
         state.totalAmount++;

         const currentProductIndex = state.productsArray.findIndex(
            (product) => {
               return product.id === action.payload.id;
            }
         );
         const currentProduct =
            state.productsArray[currentProductIndex];
         if (currentProduct) {
            currentProduct.quantity++;
         } else {
            state.productsArray.push(action.payload);
         }
      },
      removeFromCart(state, action) {
         state.totalAmount--;

         const currentProductIndex = state.productsArray.findIndex(
            (product) => {
               return product.id === action.payload.id;
            }
         );
         const currentProduct =
            state.productsArray[currentProductIndex];

         if (currentProduct.quantity !== 1) {
            currentProduct.quantity--;
         } else {
            state.productsArray.splice(currentProductIndex, 1);
         }
      },
   },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
