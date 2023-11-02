import React, { useContext } from "react";
import TodoItem from "./TodoItem";
import styles from "./Todos.module.css";
import { TodosContext } from "../store/todo-context";

const Todos: React.FC = () => {
   const todosCxt = useContext(TodosContext);

   return (
      <ul className={styles.todos}>
         {todosCxt.todos.map((item) => {
            return (
               <TodoItem
                  key={item.id}
                  text={item.text}
                  onDeleteTodo={todosCxt.deleteTodo.bind(
                     null,
                     item.id
                  )}
               />
            );
         })}
      </ul>
   );
};

export default Todos;
