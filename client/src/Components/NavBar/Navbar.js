import React from "react";
import s from "./NavBar.module.css";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

export default function NavBar(props) {
  return (
    <nav
      className={s.maincontainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={s.container}>
        <div className={s.buttonsContainer}>
          <Link to="/menu">
            <button
              id={s.bcreate}
              className={props.underlineMenu ? s.underlineMenu : s.underline}
            >
              Menu
            </button>
          </Link>
          <Link to="/create">
            <button
              id={s.bcreate}
              className={
                props.underlineCreateGame ? s.underlineCreateGame : s.underline
              }
            >
              Create Game
            </button>
          </Link>
        </div>
        {props.searchBar ? <SearchBar /> : null}
        <div className={s.contactme}>
          <h2>CONTACT ME :</h2>
          <div className="img">
            <a
              href="https://github.com/tobitortosa"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                id={s.github}
                alt="github"
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              ></img>
            </a>
            <a
              href="https://www.linkedin.com/in/tobiastortosa/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                alt="linkedin"
                src="https://cdn-icons-png.flaticon.com/512/61/61109.png"
              ></img>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
