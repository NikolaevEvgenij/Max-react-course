import { Route } from "react-router-dom/cjs/react-router-dom";

const Products = () => {
   return (
      <section>
         <h1>Welcome page!</h1>
         <Route path='/welcome/new-user'>
            <p>Welcome new user!</p>
         </Route>
      </section>
   );
};

export default Products;
