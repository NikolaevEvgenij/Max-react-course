import styles from "./Cart.module.css";

import Modal from "../UI/Modal";

const Cart = (props) => {
   const cartMeals = (
      <ul className={styles["cart-items"]}>
         {props.meals.map((meal) => {
            return <li>{meal.name}</li>;
         })}
      </ul>
   );
   return (
      <Modal closeCart={props.closeCart}>
         {cartMeals}
         <div className={styles.total}>
            <span>Total Amount</span>
            <span>69</span>
         </div>
         <div className={styles.actions}>
            <button
               onClick={props.closeCart}
               className={styles["button--alt"]}
            >
               Close
            </button>
            <button className={styles.button}>
               Submit
            </button>
         </div>
      </Modal>
   );
};

export default Cart;
