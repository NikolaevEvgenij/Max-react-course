import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
   if (action.type === "NEW_EMAIL_VALUE") {
      return { value: action.value, isValid: action.value.includes("@") };
   }
   if (action.type === "VALIDATE_EMAIL_BLUR") {
      return { value: state.value, isValid: state.value.includes("@") };
   }
   return { value: "", isValid: true };
};

const passwordReducer = (state, action) => {
   if (action.type === "NEW_PASSWORD_VALUE") {
      return { value: action.value, isValid: action.value.trim().length > 6 };
   }
   if (action.type === "VALIDATE_PASS_BLUR") {
      return { value: state.value, isValid: state.value.trim().length > 6 };
   }
   return { value: "", isValid: "" };
};

// const validationReducer = (state, action) => {
//    if ((action.type = "EMAIL_OR_PASSWORD_VALUE")) {
//       return {
//          emailValue: !state.emailValue ? action.emailValue : state.emailValue,
//          passwordValue: !state.passwordValue
//             ? action.passwordValue
//             : state.passwordValue,
//          emailIsValid: !state.emailValue || state.emailValue.includes("@"),
//          passwordIsValid:
//             !state.passwordValue || state.passwordValue.trim().length > 6,
//       };
//    }

//    if ((action.type = "IS_VALID")) {
//       return {
//          emailIsValid: state.emailValue && state.emailValue.includes("@"),
//          passwordIsValid:
//             !state.passwordValue && state.passwordValue.trim().length > 6,
//          formIsValid: !(state.emailIsValid && state.passwordIsValid)
//             ? action.emailIsValid && action.passwordIsValid
//             : state.emailIsValid && state.passwordIsValid,
//          // emailState.isValid && passwordState.value.trim().length > 6
//       };
//    }

//    return {
//       emailValue: "",
//       passwordValue: "",
//       emailIsValid: "",
//       passwordIsValid: "",
//       formIsValid: "",
//    };
// };

const Login = (props) => {
   // const [enteredEmail, setEnteredEmail] = useState("");
   // const [emailIsValid, setEmailIsValid] = useState();
   // const [enteredPassword, setEnteredPassword] = useState("");
   // const [passwordIsValid, setPasswordIsValid] = useState();
   const [formIsValid, setFormIsValid] = useState(false);

   const [emailState, dispatchEmail] = useReducer(emailReducer, {
      value: "",
      isValid: null,
   });

   const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
      value: "",
      isValid: null,
   });

   // const [validationState, dispatchValidation] = useReducer(validationReducer, {
   //    emailValue: "",
   //    passwordValue: "",
   //    emailIsValid: "",
   //    passwordIsValid: "",
   //    formIsValid: "",
   // });

   useEffect(() => {
      const timer = setTimeout(() => {
         setFormIsValid(
            emailState.isValid && passwordState.value.trim().length > 6
         );
      }, 500);
      return () => {
         clearTimeout(timer);
      };
   }, [emailState.isValid, passwordState.value]);

   const emailChangeHandler = (event) => {
      dispatchEmail({
         type: "NEW_EMAIL_VALUE",
         value: event.target.value,
      });
   };

   const passwordChangeHandler = (event) => {
      dispatchPassword({
         type: "NEW_PASSWORD_VALUE",
         value: event.target.value,
      });
   };

   const validateEmailHandler = () => {
      dispatchEmail({ type: "VALIDATE_EMAIL_BLUR" });
   };

   const validatePasswordHandler = () => {
      dispatchPassword({ type: "VALIDATE_PASS_BLUR" });
   };

   const submitHandler = (event) => {
      event.preventDefault();
      props.onLogin(emailState.value, passwordState.value);
   };

   return (
      <Card className={classes.login}>
         <form onSubmit={submitHandler}>
            <div
               className={`${classes.control} ${
                  emailState.isValid === false ? classes.invalid : ""
               }`}
            >
               <label htmlFor='email'>E-Mail</label>
               <input
                  type='email'
                  id='email'
                  value={emailState.value}
                  onChange={emailChangeHandler}
                  onBlur={validateEmailHandler}
               />
            </div>
            <div
               className={`${classes.control} ${
                  passwordState.isValid === false ? classes.invalid : ""
               }`}
            >
               <label htmlFor='password'>Password</label>
               <input
                  type='password'
                  id='password'
                  value={passwordState.value}
                  onChange={passwordChangeHandler}
                  onBlur={validatePasswordHandler}
               />
            </div>
            <div className={classes.actions}>
               <Button
                  type='submit'
                  className={classes.btn}
                  disabled={!formIsValid}
               >
                  Login
               </Button>
            </div>
         </form>
      </Card>
   );
};

export default Login;
