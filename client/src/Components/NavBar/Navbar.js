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
          <Link to="/">
            <button id={s.bhome} className={s.underline}>
              Home
            </button>
          </Link>
          <Link to="/about">
            <button id={s.babout} className={s.underline}>
              About
            </button>
          </Link>
          {props.create ? (
            <Link to="/create">
              <button id={s.bcreate} className={s.underline}>Create Game</button>
            </Link>
          ) : null}

          {props.menu ? (
            <Link to="/menu">
              <button id={s.bcreate} className={s.underline}>
                Menu
              </button>
            </Link>
          ) : null}
        </div>
        {props.searchBar ? <SearchBar /> : null}
        <div className={s.contactme}>
          <h2>CONTACT ME :</h2>
          <div className="img">
            <img
              id={s.github}
              alt="github"
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            ></img>
            <img
              alt="linkedin"
              src="https://cdn-icons-png.flaticon.com/512/61/61109.png"
            ></img>
          </div>
        </div>
      </div>
    </nav>
  );
}
