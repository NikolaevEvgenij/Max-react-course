import React, { PropsWithChildren, useState } from "react";
import Todo from "../models/todo";

type TodosTypeObj = {
   todos: Todo[];
   addTodo: (newTodoText: string) => void;
   deleteTodo: (id: string) => void;
};

export const TodosContext = React.createContext<TodosTypeObj>({
   todos: [],
   addTodo: () => {},
   deleteTodo: (id: string) => {},
});

const TodosContextProvider: React.FC<PropsWithChildren> = (props) => {
   const [todos, setTodos] = useState<Todo[]>([]);

   const addTodoHandler = (newTodoText: string) => {
      const newTodo = new Todo(newTodoText);
      setTodos((prev) => [...prev, newTodo]);
   };

   const deleteTodoHandler = (id: string) => {
      setTodos((prevTodos) => {
         return prevTodos.filter((todo) => {
            return todo.id !== id;
         });
      });
   };

   const contextValue: TodosTypeObj = {
      todos: todos,
      addTodo: addTodoHandler,
      deleteTodo: deleteTodoHandler,
   };

   return (
      <TodosContext.Provider value={contextValue}>
         {props.children}
      </TodosContext.Provider>
   );
};

export default TodosContextProvider;
