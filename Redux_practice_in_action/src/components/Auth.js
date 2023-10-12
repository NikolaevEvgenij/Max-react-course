import { useDispatch } from "react-redux";
import classes from "./Auth.module.css";
import { authActions } from "../store/auth";

const Auth = () => {
   const dispatch = useDispatch();

   const toLogin = (event) => {
      event.preventDefault();
      dispatch(authActions.login());
   };

   const content = (
      <main className={classes.auth}>
         <section>
            <form onSubmit={toLogin}>
               <div className={classes.control}>
                  <label htmlFor='email'>Email</label>
                  <input type='email' id='email' />
               </div>
               <div className={classes.control}>
                  <label htmlFor='password'>Password</label>
                  <input type='password' id='password' />
               </div>
               <button>Login</button>
            </form>
         </section>
      </main>
   );

   return content;
};

export default Auth;
