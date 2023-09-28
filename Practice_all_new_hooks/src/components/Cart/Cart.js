import styles from "./Cart.module.css";

import { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartMeal from "./CartMeal";

const Cart = (props) => {
   const cartContext = useContext(CartContext);

   const totalAmount = `$${cartContext.totalAmount.toFixed(
      2
   )}`;

   const hasItems = cartContext.meals.length > 0;

   const cartItemRemove = (id) => {
      cartContext.removeMeal(id);
   };

   const cartItemAdd = (meal) => {
      cartContext.addMeal({ ...meal, amount: 1 });
   };

   const cartMeals = (
      <ul className={styles["cart-items"]}>
         {cartContext.meals.map((meal) => {
            return (
               <CartMeal
                  meal={meal}
                  onRemove={cartItemRemove.bind(
                     null,
                     meal.id
                  )}
                  onAdd={cartItemAdd.bind(null, meal)}
               />
            );
         })}
      </ul>
   );
   return (
      <Modal closeCart={props.closeCart}>
         {cartMeals}
         <div className={styles.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
         </div>
         <div className={styles.actions}>
            <button
               onClick={props.closeCart}
               className={styles["button--alt"]}
            >
               Close
            </button>
            {hasItems && (
               <button className={styles.button}>
                  Submit
               </button>
            )}
         </div>
      </Modal>
   );
};

export default Cart;
