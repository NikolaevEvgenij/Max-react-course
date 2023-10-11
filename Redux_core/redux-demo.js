const redux = require("redux");

const counterReducer = (state = { counter: 0 }, action) => {
   // if (action.type === "increment") {
   //    return {
   //       counter: state.counter + 1,
   //    };
   // }
   // if (action.type === "decrement") {
   //    return {
   //       counter: state.counter - 1,
   //    };
   // }
   // return state

   switch (action.type) {
      case "increment":
         return { counter: state.counter + 1 };
      case "decrement":
         return { counter: state.counter - 1 };
      default:
         state;
   }
};

const store = redux.createStore(counterReducer);

const counterSubsctiber = () => {
   const latestState = store.getState();
   console.log(latestState);
};

store.subscribe(counterSubsctiber);

store.dispatch({ type: "increment" });
store.dispatch({ type: "decrement" });
