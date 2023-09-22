import React, { useState, useRef } from "react";

import Card from "../UI/Card";
import Button from "../UI/button";
import ErrorModal from "../UI/ErrorModal";

import styles from "./AddUser.module.css";

const AddUser = (props) => {
   const [error, setError] = useState();

   const enteredName = useRef();
   const enteredUserAge = useRef();

   const addUserHandler = (event) => {
      event.preventDefault();
      const name = enteredName.current.value;
      const age = enteredUserAge.current.value;

      if (name.trim().length === 0 || age === 0) {
         setError({
            title: "Error!",
            message: "You did not fill in all the inputs!",
         });
         return;
      }
      if (+age < 0) {
         setError({
            title: "Error!",
            message: "Your age cant be lesser than 0!",
         });
         return;
      }
      props.addUser(name, age);
      enteredName.current.value = "";
      enteredUserAge.current.value = "";
   };

   const closeModal = () => {
      setError(undefined);
   };

   return (
      <>
         <Card className={styles.input}>
            <form onSubmit={addUserHandler}>
               <label htmlFor='username'>User name</label>
               <input id='username' type='text' ref={enteredName} />
               <label htmlFor='age'>Age (years)</label>
               <input id='age' type='number' ref={enteredUserAge} />
               <Button type='submit'>Add user</Button>
            </form>
         </Card>
         {error && (
            <ErrorModal
               title={error.title}
               message={error.message}
               onClick={closeModal}
            />
         )}
      </>
   );
};

export default AddUser;
