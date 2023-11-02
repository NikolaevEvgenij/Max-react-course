import styles from "./TodoItem.module.css";

const TodoItem: React.FC<{
   text: string;
   onDeleteTodo: () => void;
}> = (props) => {
   return (
      <li className={styles.item} onClick={props.onDeleteTodo}>
         {props.text}
      </li>
   );
};

export default TodoItem;
