import React from "react";
import { Link } from "react-router-dom";
import s from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={s.container}>
        <div className={s.textcontainer}>
          <br></br>
          <br></br>
          <h1>
            FIND YOUR
            <br />
            FAVORITES GAMES!
          </h1>
          <Link to="/menu">
            <button>START</button>
          </Link>
        </div>
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
    </div>
  );
}
