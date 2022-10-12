import React from "react";
import NavBar from "../NavBar/Navbar";
import s from "./About.module.css";

export default function About() {
  return (
    <div>
      <NavBar create={true} menu={true} underlineAbout={true} />
      <div className={s.aboutContainer}>
        <h1>About Me</h1>
      </div>
    </div>
  );
}
