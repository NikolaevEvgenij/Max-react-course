import { useReducer } from "react";

import CartContext from "./cart-context";

const defalutCartState = {
   meals: [0],
   totalAmount: 0,
};

const cartReducer = (state, action) => {
   if (action.type === "ADD_MEAL") {
      const updatedMeals = state.item.concat(action.meal);
      const updatedTotalAmount =
         state.totalAmount +
         action.meal.amount * action.meal.price;
      return {
         meals: updatedMeals,
         totalAmount: updatedTotalAmount,
      };
   }

   return defalutCartState;
};

const CartProvider = (props) => {
   const [cartState, dispatchCartAction] = useReducer(
      cartReducer,
      defalutCartState
   );

   const addMealToCart = (meal) => {
      dispatchCartAction({ type: "ADD_MEAL", meal: meal });
   };
   const removeMealFromCart = (id) => {
      dispatchCartAction({ type: "REMOVE_MEAL", id: id });
   };

   const cartContext = {
      meals: cartState.meals,
      totalAmount: cartState.totalAmount,
      addMeal: addMealToCart,
      removeMeal: removeMealFromCart,
   };

   return (
      <CartContext.Provider
         value={cartContext}
         addMeal={addMealToCart}
         removeMeal={removeMealFromCart}
      >
         {props.children}
      </CartContext.Provider>
   );
};

export default CartProvider;
