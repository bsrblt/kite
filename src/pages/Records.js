import React, { useContext, useState, useCallback } from "react";
import TitleBox from "../Layout/TitleBox";
import styles from "../App.module.css";
import classes from "./Pages.module.css";
// import AuthContext from "../store/AuthContext";
import LangContext from "../store/LangContext";
import DataFetch from "../DataFetch";
import Like from "../Layout/Like";
import Comment from "../Layout/Comment";
import SessionData from "../SessionData";
import { Link } from "react-router-dom";

const Records = () => {
  // const authCtx = useContext(AuthContext);
  const langCtx = useContext(LangContext);
  // const dark = authCtx.dark ? classes.dark : "";

  const [data, setData] = useState([]);
  const listWinners = useCallback(
    (data) => {
      const top3Data = data.sort((a, b) => b.height - a.height).slice(0, 3);
      setData(top3Data);
    },
    [setData]
  );

  const recordsText = langCtx.generateText("recordsText");

  const top3Records = data.map(
    (entry, id) =>
      entry.name !== undefined && (
        <div key={id}>
          <section className={classes.likeandcomment}>
            <Like sessionId={entry.id} />
            <Link to={`/Sessions/${entry.id}`}>
              <Comment />
            </Link>
          </section>
          <SessionData key={id} {...entry} />
        </div>
      )
  );

  return (
    <div className={styles.mainDiv}>
      <TitleBox title={recordsText} />
      <DataFetch onDataFetched={listWinners} />
      {top3Records}
    </div>
  );
};
export default Records;
