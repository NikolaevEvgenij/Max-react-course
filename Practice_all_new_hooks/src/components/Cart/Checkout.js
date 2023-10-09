import { useContext, useEffect, useState } from "react";
import styles from "./Checkout.module.css";
import CartContext from "../../store/cart-context";
import useMeals from "../hooks/useMeals";
import useInput from "../hooks/useInput";

const Checkout = (props) => {
   const [formIsDisabled, setFormIsDisabled] =
      useState(true);

   const {
      enteredValue: name,
      enteredValueIsValid: nameIsValid,
      inputIsInvalid: nameIsInvalid,
      inputChangeHandler: nameChangeHandler,
      inputBlurHandler: nameBlurHandler,
      reset: resetName,
   } = useInput((name) => name !== "");

   const {
      enteredValue: number,
      enteredValueIsValid: numberIsValid,
      inputIsInvalid: numberIsInvalid,
      inputChangeHandler: numberChangeHandler,
      inputBlurHandler: numberBlurHandler,
      reset: resetNumber,
   } = useInput((number) => number !== "");

   const {
      enteredValue: city,
      enteredValueIsValid: cityIsValid,
      inputIsInvalid: cityIsInvalid,
      inputChangeHandler: cityChangeHandler,
      inputBlurHandler: cityBlurHandler,
      reset: resetCity,
   } = useInput((city) => city !== "");
   const {
      enteredValue: postalCode,
      enteredValueIsValid: postalCodeIsValid,
      inputIsInvalid: postalCodeIsInvalid,
      inputChangeHandler: postalCodeChangeHandler,
      inputBlurHandler: postalCodeBlurHandler,
      reset: resetPostalCode,
   } = useInput(
      (postalCode) =>
         postalCode !== "" && postalCode.trim().length === 6
   );

   const {
      enteredValue: street,
      enteredValueIsValid: streetIsValid,
      inputIsInvalid: streetIsInvalid,
      inputChangeHandler: streetChangeHandler,
      inputBlurHandler: streetBlurHandler,
      reset: resetStreet,
   } = useInput((street) => street !== "");

   const formIsValid =
      nameIsValid &&
      numberIsValid &&
      cityIsValid &&
      postalCodeIsValid &&
      streetIsValid;

   useEffect(() => {
      if (formIsValid) {
         setFormIsDisabled(false);
      }
   }, [formIsValid]);

   const cartContext = useContext(CartContext);

   const {
      sendRequest: submitOrder,
      isLoading,
      error,
   } = useMeals();

   const confirmHandler = (event) => {
      event.preventDefault();

      submitOrder({
         url: "https://meals-app-5ca89-default-rtdb.firebaseio.com/orders.json",
         method: "POST",
         Headers: {
            "Content-Type": "application/json",
         },
         body: {
            meals: cartContext.meals,
            totalAmount: cartContext.totalAmount,
            user: {
               name: name,
               number: number,
               city: city,
               postNumber: postalCode,
               street: street,
            },
         },
      });

      console.log(name, number);
      resetName();
      resetNumber();
      resetCity();
      resetPostalCode();
      resetStreet();
      setFormIsDisabled(true);

      // postCheck({
      //    url: "https://meals-app-5ca89-default-rtdb.firebaseio.com/checks.json",
      //    method: "POST",
      //    Headers: "application/json",
      //    body: {
      //       meals,
      //       totalAmount,
      //       user: {
      //          name: name,
      //          number:nunber,
      //          city: city,
      //          postNumber: postNumber,
      //          street: street,
      //       },
      //    },
      // });
   };

   return (
      <form
         className={styles.form}
         onSubmit={confirmHandler}
      >
         <div
            className={`${styles.control} ${
               nameIsInvalid ? styles.invalid : ""
            }`}
         >
            <label htmlFor='name'>Your name</label>
            <input
               type='text'
               id='name'
               onChange={nameChangeHandler}
               onBlur={nameBlurHandler}
               value={name}
            />
            {nameIsInvalid && <p>Enter valid name!</p>}
         </div>

         <div
            className={`${styles.control} ${
               numberIsInvalid ? styles.invalid : ""
            }`}
         >
            <label htmlFor='number'>Your number</label>
            <input
               type='text'
               id='number'
               onChange={numberChangeHandler}
               onBlur={numberBlurHandler}
               value={number}
            />
            {numberIsInvalid && <p>Enter valid number!</p>}
         </div>

         <div
            className={`${styles.control} ${
               cityIsInvalid ? styles.invalid : ""
            }`}
         >
            <label htmlFor='city'>Your city</label>
            <input
               type='text'
               id='city'
               onChange={cityChangeHandler}
               onBlur={cityBlurHandler}
               value={city}
            />
            {cityIsInvalid && <p>Enter valid city!</p>}
         </div>

         <div
            className={`${styles.control} ${
               postalCodeIsInvalid ? styles.invalid : ""
            }`}
         >
            <label htmlFor='code'>Your postal code</label>
            <input
               type='text'
               id='code'
               onChange={postalCodeChangeHandler}
               onBlur={postalCodeBlurHandler}
               value={postalCode}
            />
            {postalCodeIsInvalid && (
               <p>Enter valid postal code!</p>
            )}
         </div>

         <div
            className={`${styles.control} ${
               streetIsInvalid ? styles.invalid : ""
            }`}
         >
            <label htmlFor='street'>Your street</label>
            <input
               type='text'
               id='street'
               onChange={streetChangeHandler}
               onBlur={streetBlurHandler}
               value={street}
            />
            {streetIsInvalid && <p>Enter valid street!</p>}
         </div>

         <div className={styles.actions}>
            <button type='button' onClick={props.onCancel}>
               Cancel
            </button>
            <button
               className={styles.submit}
               disabled={formIsDisabled}
            >
               Confirm
            </button>
         </div>
      </form>
   );
};

export default Checkout;
