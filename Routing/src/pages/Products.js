import { Link } from "react-router-dom/cjs/react-router-dom";

const Welcome = () => {
   return (
      <>
         <h1>Products!</h1>
         <section>
            <ul>
               <li>
                  <Link to='/products/p1'>A book</Link>
               </li>
               <li>
                  <Link to='/products/p2'>A car</Link>
               </li>
               <li>
                  <Link to='/products/p3'>An alien</Link>
               </li>
            </ul>
         </section>
      </>
   );
};

export default Welcome;
