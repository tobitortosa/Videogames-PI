import React from "react";
import s from "./FilterBox.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllGenres,
  filterByGenre,
  getAllPlatforms,
  clearFilter,
  filterByPlatform,
  orderByName,
  orderbyOrigin,
  orderByRating,
} from "../../redux/actions";

export default function FilterBox({ setCurrentPage }) {
  const dispatch = useDispatch();
  const allGenres = useSelector((state) => state.allGenres);
  const allPlatforms = useSelector((state) => state.allPlatforms);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllGenres());
    dispatch(getAllPlatforms());
  }, [dispatch]);

  const filterGenres = (e) => {
    if (e.target.value === "All") {
      dispatch(clearFilter());
    } else {
      dispatch(filterByGenre(e.target.value));
    }
  };

  const filterPlatform = (e) => {
    if (e.target.value === "All") {
      dispatch(clearFilter());
    } else {
      dispatch(filterByPlatform(e.target.value));
    }
  };

  const changeOrder = (e) => {
    if (e.target.value === "All") {
      dispatch(clearFilter());
    }

    if (e.target.value === "asc") {
      dispatch(orderByName("asc"));
    }
    if (e.target.value === "des") {
      dispatch(orderByName("des"));
    }
  };

  const changeOrigin = (e) => {
    if (e.target.value === "All") {
      dispatch(clearFilter());
    }
    if (e.target.value === "api") {
      dispatch(orderbyOrigin("api"));
    }
    if (e.target.value === "db") {
      dispatch(orderbyOrigin("db"));
    }
  };

  const changeRating = (e) => {
    if (e.target.value === "All") {
      dispatch(clearFilter());
    }
    if (e.target.value === "hr") {
      dispatch(orderByRating("hr"));
    }
    if (e.target.value === "lr") {
      dispatch(orderByRating("lr"));
    }
  };

  const handleClick = () => {
    setCurrentPage(1);
    navigate(0);
  };

  return (
    <div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={s.MAINContainer}
    >
      <button onClick={handleClick} id={s.clearBtn}>
        Clear Filters
      </button>

      {/*  ORDER BY NAME  */}

      <div>
        <select
          defaultValue="default"
          onChange={changeOrder}
          className={s.filtersContainer}
        >
          <option value="default" disabled>
            Order by Name...
          </option>
          <option value="All">All Games</option>
          <option value="asc">A -- Z</option>
          <option value="des">Z -- A</option>
        </select>
      </div>

      {/*  ORDER BY RATING  */}

      <div>
        <select
          defaultValue="default"
          onChange={changeRating}
          className={s.filtersContainer}
        >
          <option value="default" disabled>
            Order by Rating...
          </option>
          <option value="All">All Games</option>
          <option value="hr">High Rating</option>
          <option value="lr">Low Rating</option>
        </select>
      </div>

      {/*  FILTER BY ORIGIN  */}

      <div>
        <select
          defaultValue="default"
          onChange={changeOrigin}
          className={s.filtersContainer}
        >
          <option value="default" disabled>
            Filter by Origin...
          </option>
          <option value="All">All Games</option>
          <option value="api">Games from API</option>
          <option value="db">Games from DB</option>
        </select>
      </div>

      {/*  FILTER BY GENRE  */}

      <div>
        <select
          defaultValue="default"
          onChange={filterGenres}
          className={s.filtersContainer}
        >
          <option value="default" disabled>
            Filter by Genre...
          </option>
          <option value="All">All Games</option>
          {allGenres?.map((g) => {
            return (
              <option key={g.id} value={g.name}>
                {g.name}
              </option>
            );
          })}
        </select>
      </div>

      {/*  FILTER BY PLATFORM  */}

      <div>
        <select
          defaultValue="default"
          onChange={filterPlatform}
          className={s.filtersContainer}
        >
          <option value="default" disabled>
            Filter by Platform...
          </option>
          <option value="All">All Platforms</option>
          {allPlatforms?.map((p, index) => {
            return (
              <option key={index} value={p.name}>
                {p.name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
