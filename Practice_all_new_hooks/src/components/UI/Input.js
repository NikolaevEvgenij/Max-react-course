import styles from "./Input.module.css";

const Input = (props) => {
   return (
      <div className={styles.input}>
         <label htmlFor={props.input.id} className='label'>
            {props.label}
         </label>
         <input {...props.input} type='text' />
      </div>
   );
};

export default Input;