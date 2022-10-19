import React from "react";
import NavBar from "../NavBar/Navbar";
import s from "./About.module.css";

export default function About() {
  return (
    <div>
      <NavBar create={true} menu={true} underlineAbout={true} />
      <div className={s.aboutContainer}>
        <h1>About Me</h1>
        <div className={s.container}>
          <div className={s.img}>
            <h1>Imagen</h1>
          </div>
          <div className={s.text}>
            <p>Hola mi nombre es Tobías Tortosa</p>
          </div>
        </div>
      </div>
    </div>
  );
}
