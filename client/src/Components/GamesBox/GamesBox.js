import React from "react";
import GameCard from "../GameCard/GameCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from "../../redux/actions";
import s from "./GamesBox.module.css";
import Pagination from "../Pagination/Pagination";
import Loading from "../Loading/Loading";
import FilterBox from "../FilterBox/FilterBox";
import Error from "../Error/Error";

export default function GamesBox() {
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(15);

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const queryGames = useSelector((state) => state.queryGames);
  const allGames = useSelector((state) => state.allGames);

  useEffect(() => {
    let getGames = async () => {
      await dispatch(getAllGames());
      setLoading(false);
    };
    getGames();
  }, [dispatch]);

  // Get current Game
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = allGames
    ? allGames.slice(indexOfFirstGame, indexOfLastGame)
    : [];

  console.log(queryGames, "querygames");
  console.log(allGames, "allgames");
  console.log(currentGames, "currentGames");

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  console.log(loading, "loading");

  return (
    <div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={s.gamesboxContainer}
    >
      {(allGames.length === 0 && !loading) || allGames.length ? (
        <FilterBox setCurrentPage={setCurrentPage}/>
      ) : null}

      <div className={s.gamescontainer}>
        {allGames.length === 0 && loading ? (
          <Loading />
        ) : allGames.length === 0 && !loading ? (
          <Error/>
        ) : (
          currentGames.map((g) => {
            return (
              <Link key={g.id} to={"/game/" + g.id} id={s.link}>
                <GameCard
                  key={g.id}
                  name={g.name}
                  image={g.image}
                  genres={g.genres}
                />
              </Link>
            );
          })
        )}
      </div>

      {queryGames.length ? (
        <Pagination
          gamesPerPage={gamesPerPage}
          totalGames={15}
          paginate={paginate}
        />
      ) : (
        <Pagination
          gamesPerPage={gamesPerPage}
          totalGames={allGames.length ? allGames.length : null}
          paginate={paginate}
        />
      )}
    </div>
  );
}
