import QouteList from "../components/quotes/QuoteList";

const qoutesList = [
   { id: "q1", author: "Evgenij", text: "Реакт - кайф!!" },
   { id: "q2", author: "Evgenij", text: "Реакт - смысл жизни!" },
];

const AllQuotes = () => {
   return <QouteList quotes={qoutesList} />;
};

export default AllQuotes;
