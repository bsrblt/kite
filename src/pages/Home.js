import React, {
  useState,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import Like from "../Layout/Like";
import DataForm from "../DataForm";
import DataFetch from "../DataFetch";
import Button from "../Layout/Button";
import AdminPanel from "../AdminPanel";
import classes from "../App.module.css";
import Comment from "../Layout/Comment";
import { Link } from "react-router-dom";
import Loading from "../Layout/Loading";
import SessionData from "../SessionData";
import TitleBox from "../Layout/TitleBox";
import LangContext from "../store/LangContext";
import AuthContext from "../store/AuthContext";
import styles from "../SessionData.module.css";

const Home = () => {
  const authCtx = useContext(AuthContext);
  const langCtx = useContext(LangContext);
  const dark = authCtx.dark ? classes.dark : "";

  const [loading, setLoading] = useState(true);
  const [numSessions, setNumSessions] = useState(4);
  const [data, setData] = useState([]);

  const listFetchedData = useCallback(
    (data) => {
      setData(data);
      setTimeout(() => {
        setLoading(false);
      }, 600);
    },
    [setData, setLoading]
  );

  const loadMoreSessions = () => {
    setNumSessions((prevNumSessions) => prevNumSessions + 1);
  };

  const refreshListAfterDel = (deletedSessionId) => {
    setData((prevData) =>
      prevData.filter((session) => session.id !== deletedSessionId)
    );
  };

  const renderNewDataHandler = (newData) => {
    setData((prevData) => [...prevData, newData]);
    console.log(newData);
  };

  useEffect(() => {
    const scrollHandler = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;

      if (scrolledToBottom) {
        loadMoreSessions();
      }
    };

    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const memoizedListData = useMemo(() => {
    return [...data].reverse().map((entry, id) =>
      entry.name !== undefined ? (
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
      ) : null
    );
  }, [data]);

  return (
    <main className={`${classes.mainDiv} ${dark}`}>
      <DataForm onSaveFormData={renderNewDataHandler} />
      <TitleBox title={langCtx.generateText("latestSessionsText")} />
      {authCtx.nameInput === "admin" && <AdminPanel />}
      <DataFetch onDataFetched={listFetchedData} numSessions={numSessions} />
      {loading ? <Loading /> : memoizedListData}
      <Button onClick={loadMoreSessions}>
        {langCtx.generateText("loadMoreSessionsText")}
      </Button>
    </main>
  );
};

export default Home;
