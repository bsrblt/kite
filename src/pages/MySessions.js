import React, { useState, useCallback, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import SessionData from "../SessionData";
import classes from "../App.module.css";
import styles from "../pages/Pages.module.css";
import DataFetch from "../DataFetch";
import LangContext from "../store/LangContext";
import AuthContext from "../store/AuthContext";
import TitleBox from "../Layout/TitleBox";
import Like from "../Layout/Like";
import Comment from "../Layout/Comment";
import Loading from "../Layout/Loading";

const MySessions = () => {
  const authCtx = useContext(AuthContext);
  const langCtx = useContext(LangContext);
  const dark = authCtx.dark ? styles.dark : "";

  const [data, setData] = useState([]);
  const listFetchedData = useCallback((data) => setData(data), [setData]);
  const [loading, setLoading] = useState(true);
  const url = `https://kite-session-tracker-default-rtdb.europe-west1.firebasedatabase.app/Sessions.json`;

  const refreshListAfterDel = (deletedSessionId) => {
    setData((prevData) =>
      prevData.filter((session) => session.id !== deletedSessionId)
    );
  };

  let matchFound = false;
  useEffect(() => {
    const fetchUsersSessions = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const userSessionData = await response.json();

        setTimeout(() => {
          if (userSessionData.name === authCtx.nameInput) {
          }
          setLoading(false);
        }, 250);
      } catch (error) {
        console.error(error.message);
        setLoading(false);
      }
    };
    fetchUsersSessions();
  }, [authCtx.nameInput, url]);

  return (
    <main className={classes.mainDiv}>
      <TitleBox title={langCtx.generateText("mySessionsText")} />
      <DataFetch onDataFetched={listFetchedData} />
      {!matchFound && loading && <Loading />}
      {!loading &&
        data.map((entry, id) => {
          if (entry.name === authCtx.nameInput) {
            matchFound = true;
            return (
              <div key={entry.id}>
                <section className={styles.likeandcomment}>
                  <Like sessionId={entry.id} />
                  <Link to={`/Sessions/${entry.id}`}>
                    <Comment />
                  </Link>
                </section>
                <SessionData
                  key={id}
                  {...entry}
                  onDeleteSession={refreshListAfterDel}
                />
              </div>
            );
          }
          return null;
        })}
      {!loading && !matchFound && (
        <div className={`${styles.container} ${dark}`}>
          <h5>{langCtx.generateText("noSessionsFoundText")}</h5>
        </div>
      )}
    </main>
  );
};

export default MySessions;
