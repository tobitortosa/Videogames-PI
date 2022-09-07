import React from "react";
import s from "./GameCard.module.css";

export default function GameCard(props) {
  return (
      <div className={s.cardcontainer}>
        <img src={props.image} alt={props.name} />
        <div className={s.gameDetails}>
          <h1>{props.name}</h1>
          {props.genres.map((p) => {
            return (
              <ul key={p.id}>
                <li>{p.name}</li>
              </ul>
            );
          })}
        </div>
      </div>
  );
}
