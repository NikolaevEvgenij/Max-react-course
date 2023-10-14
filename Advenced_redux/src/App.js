import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { cartActions } from "./store/cart";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
   const showCart = useSelector((state) => state.showCart);
   const cartData = useSelector((state) => state.productsArray);
   const dispatch = useDispatch();
   const notification = useSelector((state) => state.notification);

   useEffect(() => {
      const sendCartData = async () => {
         dispatch(
            cartActions.showNotification({
               status: "pending",
               title: "Sending...",
               message: "Sending cart data!",
            })
         );
         const response = await fetch(
            "https://redux-products-app-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
            { method: "PUT", body: JSON.stringify(cartData) }
         );

         if (!response.ok) {
            throw new Error("Oops, an error! Sending data failed!");
         }

         dispatch(
            cartActions.showNotification({
               status: "success",
               title: "Success!",
               message: "The data had send!",
            })
         );
      };

      if (isInitial) {
         isInitial = false;
         return;
      }

      sendCartData().catch((error) => {
         dispatch(
            cartActions.showNotification({
               status: "error",
               title: "Error!",
               message: error.message,
            })
         );
      });
   }, [cartData, dispatch]);

   return (
      <>
         {notification && (
            <Notification
               status={notification.status}
               title={notification.title}
               message={notification.message}
            />
         )}
         <Layout>
            {showCart && <Cart />}
            <Products />
         </Layout>
      </>
   );
}

export default App;
