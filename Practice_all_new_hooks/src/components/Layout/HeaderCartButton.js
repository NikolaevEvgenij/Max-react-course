import styles from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import { useContext } from "react";

const HeaderCartButton = (props) => {
   const cartContext = useContext(CartContext);

   const nuberOfCartMeals = cartContext.meals.reduce(
      (curNumber, meal) => {
         return (curNumber = curNumber + meal.amount);
      }
   );

   return (
      <button
         className={styles.button}
         onClick={props.openCart}
      >
         <span className={styles.icon}>
            <CartIcon />
         </span>
         <span>YourCart</span>
         <span className={styles.badge}>
            {nuberOfCartMeals}
         </span>
      </button>
   );
};

export default HeaderCartButton;
