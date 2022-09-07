import React from "react";
import s from "./Pagination.module.css";

export default function Pagination({ gamesPerPage, totalGames, paginate }) {
  let pageNumbers = [];

  for (let i = 1; i <= Math.round(totalGames / gamesPerPage); i++) {
    pageNumbers.push(i);
  }

  return <nav className={s.pagination}>
    {pageNumbers.map(number => {
        return <button key={number} onClick={() => paginate(number)}>{number}</button>
    })}
  </nav>;
}
