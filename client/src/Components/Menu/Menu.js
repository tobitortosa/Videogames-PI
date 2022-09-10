import React from "react";
import NavBar from "../NavBar/Navbar";
import GamesBox from "../GamesBox/GamesBox";

export default function Menu() {
  return (
    <div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="maincontainer"
    >
      <NavBar searchBar={true} create={true} />
      <div className="boxcontainer">
        <GamesBox />
      </div>
    </div>
  );
}
