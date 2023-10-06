import { useState } from "react";

const useInput = (validateValue) => {
   const [enteredValue, setEnteredValue] = useState("");
   const [enteredValueIsTuched, setEnteredValueIsTuched] =
      useState(false);

   const enteredValueIsValid = validateValue(enteredValue);
   const inputIsInvalid =
      !enteredValueIsValid && enteredValueIsTuched;

   const inputChangeHandler = (event) => {
      setEnteredValue(event.target.value);
   };

   const inputBlurHandler = () => {
      setEnteredValueIsTuched(true);
   };
   const formValueClasses = inputIsInvalid
      ? "form-control invalid"
      : "form-control ";

   const reset = () => {
      setEnteredValue("");
      setEnteredValueIsTuched("");
   };

   return {
      enteredValue,
      enteredValueIsValid,
      inputIsInvalid,
      inputChangeHandler,
      inputBlurHandler,
      formValueClasses,
      reset,
   };
};

export default useInput;
