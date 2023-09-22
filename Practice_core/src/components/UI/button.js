import styles from "./button.module.css";

const Button = (props) => {
   return (
      <button className={styles} type={props.type} onClick={props.onClick}>
         {props.children}
      </button>
   );
};

export default Button;
