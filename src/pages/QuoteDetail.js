import { React, useEffect } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { Fragment } from "react";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import Comments from "../components/comments/Comments";
import { Route, Routes } from "react-router-dom";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
export default function QuoteDetail(props) {
  const params = useParams();
  const { quoteId } = params;
  const { pathname } = useLocation();
  console.log("pathname:", pathname);
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getSingleQuote, true);
  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);
  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return <p className="centered">{error}</p>;
  }

  // const navigate = useNavigate();
  if (!loadedQuotes.text) {
    return <p>No Quote Found</p>;
  }
  // console.log("render details", params);
  // navigate("/quotes/:quoteId");
  return (
    <Fragment>
      <HighlightedQuote text={loadedQuotes.text} author={loadedQuotes.author} />

      <div className="centered">
        <Link className="btn--flat" to={`${pathname}/comment`}>
          Load Comments
        </Link>
      </div>

      <Routes>
        <Route path={`/comment`} element={<Comments />} />
      </Routes>
    </Fragment>
  );
}
