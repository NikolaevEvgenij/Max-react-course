import React, { useRef, useImperativeHandle } from "react";

import classes from "./input.module.css";

const Input = React.forwardRef((props, ref) => {
   const inputRef = useRef();

   const activate = () => {
      inputRef.current.focus();
   };

   useImperativeHandle(ref, () => {
      return {
         focus: activate,
      };
   });

   return (
      <div
         className={`${classes.control} ${
            props.inputState.isValid === false ? classes.invalid : ""
         }`}
      >
         <label htmlFor={props.id}>{props.id}</label>
         <input
            ref={inputRef}
            type={props.id}
            id={props.id}
            value={props.inputState.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
         />
      </div>
   );
});

export default Input;
