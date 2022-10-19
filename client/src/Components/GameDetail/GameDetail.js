import React from "react";
import s from "./GameDetail.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGamesById, clearGame } from "../../redux/actions";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import NavBar from "../NavBar/Navbar";

export default function GameDetail() {
  const game = useSelector((state) => state.gameById[0]);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(clearGame());
    dispatch(getGamesById(id));
  }, [dispatch, id]);

  const cleanText = game?.description.replace(/<\/?[^>]+(>|$)/g, "");
  return (
    <div className={s.mainContainer}>
      {game ? <NavBar menu={true} create={true}/> : null}
      {game ? (
        <div className={s.allContainer}>
              <h1 id={s.title}>{game.name}</h1>
          <div className={s.container}>
            <img id={s.img} src={game.image} alt={game.name} />
            <div>
              <div className={s.starsContainer}>
                <div className={s.txtLeft}>
                  <h2>Genres :</h2>
                  <div className={s.items} >
                    {game.genres.map((g) => {
                      return <p key={g.id}>● {g.name}</p>;
                    })}
                  </div>
                  <h2>Platforms :</h2>
                  <div className={s.items} > 
                    {game.platforms.map((p) => {
                      return <p key={p.id}>● {p.name}</p>;
                    })}
                  </div>
                </div>
                <div className={s.txtRight}>
                  <h2>Rating :</h2>
                  <p className={s.ratingAndReleased}>★ {game.rating}</p>
                  <h2>Released :</h2>
                  <p className={s.ratingAndReleased}>{game.released}</p>
                </div>
              </div>
            </div>
          </div>
          <h2 id={s.descriptionTitle}>★ Description :</h2>
          <p id={s.description}>{cleanText}</p>
        </div>
      ) : (
        <div className={s.loader}>
          <Loading />
        </div>
      )}
    </div>
  );
}
