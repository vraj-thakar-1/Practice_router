import { Fragment } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";
const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();

  const isSortingAsecending = searchParams.get("sort") === "ascending";
  const sorted_Quotes = sortQuotes(props.quotes, isSortingAsecending);
  const changeSortingHandler = () => {
    navigate(
      `${pathname}?sort=${isSortingAsecending ? "descending" : "ascending"}`
    );
    console.log(searchParams.get("sort"));
  };
  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortingAsecending ? "Descending" : "ascending"}
        </button>
      </div>
      <ul className={classes.list}>
        {sorted_Quotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
