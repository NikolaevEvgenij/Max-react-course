import {
   Route,
   useParams,
} from "react-router-dom/cjs/react-router-dom";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import Comments from "../components/comments/Comments";

const qoutesList = [
   { id: "q1", author: "Evgenij", text: "Реакт - кайф!!" },
   { id: "q2", author: "Evgenij", text: "Реакт - смысл жизни!" },
];

const QuoteDitails = () => {
   const qouteParams = useParams();

   const currectQoute = qoutesList.find(
      (quote) => qouteParams.quoteId === quote.id
   );

   if (!currectQoute) {
      return <p>No quote found!!</p>;
   }

   return (
      <>
         <HighlightedQuote
            text={currectQoute.text}
            author={currectQoute.author}
         />
         <Route path={`/all-quotes/${qouteParams.quoteId}/comments`}>
            <Comments />
         </Route>
      </>
   );
};

export default QuoteDitails;
