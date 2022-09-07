import React from "react";
import s from "./Error.module.css";
import { useDispatch } from "react-redux";
import { clearFilter } from "../../redux/actions";

export default function Error() {

    const dispatch = useDispatch()

    const handleClearFilter = () => {
        dispatch(clearFilter())
    }

  return (
    <div className={s.container}>
      <h1 className={s.title}>Sorry Game not Found</h1>
      <div className={s.txtContainer}>
        <p>
          You can <button id={s.clearBtn} onClick={handleClearFilter}>Clear Filters</button>
        </p>
        <h3>or</h3>
        <p>
          <a id={s.createBtn} href="/create">Create</a> your own Game!
        </p>
      </div>
      <h2 className={s.emoji}>🐉</h2>
    </div>
  );
}
