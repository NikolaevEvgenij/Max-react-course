import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
   const {
      enteredValue: enteredName,
      enteredValueIsValid: enteredNameIsValid,
      inputIsInvalid: nameInputIsInvalid,
      inputChangeHandler: nameInputChangeHandler,
      formValueClasses: formNameClasses,
      inputBlurHandler: nameInputBlurHandler,
      reset: resetNameHandler,
   } = useInput((enteredName) => enteredName !== "");

   const {
      enteredValue: enteredEmail,
      enteredValueIsValid: enteredEmailIsValid,
      inputIsInvalid: emailInputIsInvalid,
      inputChangeHandler: emailInputChangeHandler,
      formValueClasses: formEmailClasses,
      inputBlurHandler: emailInputBlurHandler,
      reset: resetEmailHandler,
   } = useInput((enteredName) => enteredName.includes("@"));

   const formSubmitionHandler = (event) => {
      event.preventDefault();

      if (!enteredNameIsValid) {
         return;
      }

      console.log(enteredName);
      resetNameHandler();
      resetEmailHandler();
   };

   let formIsValid = false;

   if (enteredNameIsValid && enteredEmailIsValid) {
      formIsValid = true;
   }
   return (
      <form onSubmit={formSubmitionHandler}>
         <div className={formNameClasses}>
            <label htmlFor='name'>Your Name</label>
            <input
               onChange={nameInputChangeHandler}
               onBlur={nameInputBlurHandler}
               type='text'
               id='name'
               value={enteredName}
            />
            {nameInputIsInvalid && (
               <p className='error-text'>Invalid name</p>
            )}
            <label htmlFor='email'>Your E-mail</label>
         </div>
         <div className={formEmailClasses}>
            <input
               type='email'
               onChange={emailInputChangeHandler}
               onBlur={emailInputBlurHandler}
               id='email'
               value={enteredEmail}
            />
            {emailInputIsInvalid && (
               <p className='error-text'>Invalid email</p>
            )}
         </div>
         <div className='form-actions'>
            <button disabled={!formIsValid}>Submit</button>
         </div>
      </form>
   );
};

export default SimpleInput;
