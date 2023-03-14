import React from "react";
import classes from "./MainNavigation.module.css";
import { Link } from "react-router-dom";
export default function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Great Quotes</div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <Link to="/quotes" activeClassName={classes.active}>
              All Quotes
            </Link>
          </li>
          <li>
            <Link to="/new-quote" activeClassName={classes.active}>
              Add a Quote
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
