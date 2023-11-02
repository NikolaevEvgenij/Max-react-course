import { useContext } from "react";

import "./App.css";
import NewTodo from "./components/NewTodo";
import Todos from "./components/Todos";
import { TodosContext } from "./store/todo-context";

function App() {
   const context = useContext(TodosContext);
   return (
      <>
         <NewTodo />
         <Todos />
      </>
   );
}

export default App;
