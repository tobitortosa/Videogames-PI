import React from "react";
import NavBar from "../NavBar/Navbar";
import GamesBox from "../GamesBox/GamesBox";
import s from "./Menu.module.css";

export default function Menu() {
  return (
    <div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="maincontainer"
    >
      <NavBar searchBar={true} create={true} />
      <div className={s.boxcontainer}>
        <GamesBox />
      </div>
    </div>
  );
}
