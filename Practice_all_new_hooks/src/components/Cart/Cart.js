import styles from "./Cart.module.css";

import { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartMeal from "./CartMeal";
import Checkout from "./Checkout";

const Cart = (props) => {
   const [showForm, setShowForm] = useState(false);

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

   const showFormHandler = () => {
      setShowForm(true);
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

   const modalActions = (
      <div className={styles.actions}>
         <button
            onClick={props.closeCart}
            className={styles["button--alt"]}
         >
            Close
         </button>
         {hasItems && (
            <button
               className={styles.button}
               onClick={showFormHandler}
            >
               Submit
            </button>
         )}
      </div>
   );
   return (
      <Modal closeCart={props.closeCart}>
         {cartMeals}
         <div className={styles.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
         </div>

         {showForm && (
            <Checkout onCancel={props.closeCart} />
         )}
         {!showForm && modalActions}
      </Modal>
   );
};

export default Cart;
