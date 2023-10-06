import useInput from "../hooks/use-input";

const BasicForm = (props) => {
   const {
      enteredValue: enteredName,
      enteredValueIsValid: enteredNameIsValid,
      inputIsInvalid: nameInputIsInvalid,
      inputChangeHandler: nameChangeHandler,
      formValueClasses: nameClasses,
      inputBlurHandler: nameBlurHandler,
      reset: resetNameHandler,
   } = useInput((enteredName) => enteredName !== "");

   const {
      enteredValue: enteredLastName,
      enteredValueIsValid: enteredLastNameIsValid,
      inputIsInvalid: lastNameInputIsInvalid,
      inputChangeHandler: lastNameChangeHandler,
      formValueClasses: lastNameClasses,
      inputBlurHandler: lastNameBlurHandler,
      reset: resetLastNameHandler,
   } = useInput((enteredName) => enteredName !== "");
   const {
      enteredValue: enteredEmailValue,
      enteredValueIsValid: enteredEmailIsValid,
      inputIsInvalid: emailInputIsInvalid,
      inputChangeHandler: emailChangeHandler,
      formValueClasses: emailClasses,
      inputBlurHandler: emailBlurHandler,
      reset: resetEmailHandler,
   } = useInput((enteredName) => enteredName.includes("@"));

   const formSubmitionHandler = (event) => {
      event.preventDefault();

      if (!formIsValid) {
         return;
      }

      console.log(
         enteredName,
         enteredLastName,
         enteredEmailValue
      );

      resetNameHandler();
      resetLastNameHandler();
      resetEmailHandler();
   };

   let formIsValid = false;

   formIsValid =
      enteredNameIsValid &&
      enteredLastNameIsValid &&
      enteredEmailIsValid;

   return (
      <form onSubmit={formSubmitionHandler}>
         <div className='control-group'>
            <div className={nameClasses}>
               <label htmlFor='name'>First Name</label>
               <input
                  type='text'
                  id='name'
                  onChange={nameChangeHandler}
                  onBlur={nameBlurHandler}
                  value={enteredName}
               />
               {nameInputIsInvalid && (
                  <p>Name is invalid!</p>
               )}
            </div>
            <div className={lastNameClasses}>
               <label htmlFor='lastName'>Last Name</label>
               <input
                  type='text'
                  id='lastName'
                  onChange={lastNameChangeHandler}
                  onBlur={lastNameBlurHandler}
                  value={enteredLastName}
               />
               {lastNameInputIsInvalid && (
                  <p>Last name is invalid!</p>
               )}
            </div>
         </div>
         <div className={emailClasses}>
            <label htmlFor='email'>E-Mail Address</label>
            <input
               type='email'
               id='email'
               onChange={emailChangeHandler}
               onBlur={emailBlurHandler}
               value={enteredEmailValue}
            />
            {emailInputIsInvalid && (
               <p>Email is invalid!</p>
            )}
         </div>
         <div className='form-actions'>
            <button disabled={!formIsValid}>Submit</button>
         </div>
      </form>
   );
};

export default BasicForm;
