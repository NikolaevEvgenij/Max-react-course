import classes from "./CartButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart";

const CartButton = (props) => {
   const totalAmount = useSelector((state) => state.totalAmount);
   const dispatch = useDispatch();

   const toggleCart = () => {
      dispatch(cartActions.showCart());
   };

   return (
      <button className={classes.button} onClick={toggleCart}>
         <span>My Cart</span>
         <span className={classes.badge}>{totalAmount}</span>
      </button>
   );
};

export default CartButton;
