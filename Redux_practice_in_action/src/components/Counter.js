import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "../store/counter";

import classes from "./Counter.module.css";

const Counter = () => {
   const counter = useSelector((state) => state.counter.counter);
   const showCounter = useSelector(
      (state) => state.counter.showCounter
   );

   const dispatch = useDispatch();

   const incrementHandler = () => {
      dispatch(counterActions.increase(1));
   };
   const incrementBy5Handler = () => {
      dispatch(counterActions.increase(5));
   };

   const decrementHandler = () => {
      dispatch(counterActions.decrement());
   };

   const toggleCounterHandler = () => {
      dispatch(counterActions.showCounter());
   };

   const counterContent = (
      <>
         <div className={classes.value}>{counter}</div>
         <div>
            <button onClick={incrementHandler}>Inc</button>
            <button onClick={incrementBy5Handler}>Inc by 5</button>
            <button onClick={decrementHandler}>Dec</button>
         </div>
      </>
   );

   return (
      <main className={classes.counter}>
         <h1>Redux Counter</h1>
         {showCounter && counterContent}
         <button onClick={toggleCounterHandler}>
            Toggle Counter
         </button>
      </main>
   );
};

export default Counter;
