import { useHistory } from "react-router-dom/cjs/react-router-dom";
import QuoteForm from "../components/quotes/QuoteForm";

const AddQuote = () => {
   const history = useHistory();

   const addQuoteHandler = (quote) => {
      console.log(quote);

      history.push("/all-quotes");
   };

   return (
      <>
         <QuoteForm onAddQuote={addQuoteHandler} />;
      </>
   );
};

export default AddQuote;
