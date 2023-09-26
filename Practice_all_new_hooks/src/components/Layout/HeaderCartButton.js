import styles from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";

const HeaderCartButton = (props) => {
   return (
      <div className={styles.button}>
         <span className={styles.icon}>
            <CartIcon />
         </span>
         <span>YourCart</span>
         <span className={styles.badge}>3</span>
      </div>
   );
};

export default HeaderCartButton;
