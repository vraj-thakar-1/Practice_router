import { useEffect } from "react";
import QuoteList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
const DUMMY_QUOTES = [
  { id: "q1", author: "vraj", text: "Learning React  is fun!" },
  { id: "q2", author: "kedar sir", text: "Learning React  is fun!" },
  { id: "q3", author: "Rakesh", text: "Learning React  is fun!" },
];

export default function AllQuotes() {
  const {
    sendRequest,
    status,
    data: loadingQuotes,
    error,
  } = useHttp(getAllQuotes, true);
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return <p className="centered focused">{error}</p>;
  }
  if (
    status === "completed" &&
    (!loadingQuotes || loadingQuotes.length === 0)
  ) {
    return <NoQuotesFound />;
  }
  return <QuoteList quotes={loadingQuotes} />;
}
