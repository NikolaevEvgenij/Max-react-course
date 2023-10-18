import {
   Redirect,
   Route,
   Switch,
} from "react-router-dom/cjs/react-router-dom";
import AllQuotes from "./pages/AllQuotes";
import QuoteDitails from "./pages/QuoteDetails";
import AddQuotes from "./pages/AddQuotes";
import MainNavigation from "./components/layout/MainNavigation";
import Layout from "./components/layout/Layout";
import NotFound from "./pages/NotFound";

function App() {
   return (
      <>
         <MainNavigation />
         <Layout>
            <Switch>
               <Route path='/' exact>
                  <Redirect to='/all-quotes' />
               </Route>
               <Route path='/all-quotes' exact>
                  <AllQuotes />
               </Route>
               <Route path='/all-quotes/:quoteId'>
                  <QuoteDitails />
               </Route>
               <Route path='/add-quote'>
                  <AddQuotes />
               </Route>

               <Route path='*'>
                  <NotFound />
               </Route>
            </Switch>
         </Layout>
      </>
   );
}

export default App;
