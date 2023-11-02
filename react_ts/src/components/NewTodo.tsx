import React, { useContext, useRef } from "react";
import styles from "./NewTodo.module.css";
import { TodosContext } from "../store/todo-context";

const NewTodo: React.FC = () => {
   const todosCxt = useContext(TodosContext);

   const textInputRef = useRef<HTMLInputElement>(null);

   const submitHandler = (event: React.FormEvent) => {
      event.preventDefault();

      const enteredText = textInputRef.current!.value;

      if (enteredText.trim().length === 0) {
         return;
      }

      todosCxt.addTodo(enteredText);
   };

   return (
      <form className={styles.form} onSubmit={submitHandler}>
         <label htmlFor='text'>Todo Text</label>
         <input type='text' id='text' ref={textInputRef} />
         <button>Add Todo.</button>
      </form>
   );
};

export default NewTodo;
