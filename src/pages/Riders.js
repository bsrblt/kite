import React, { useContext, useState, useCallback } from "react";
import TitleBox from "../Layout/TitleBox";
import styles from "../App.module.css";
import LangContext from "../store/LangContext";
import DataFetch from "../DataFetch";
import SessionData from "../SessionData";

const Riders = () => {
  const langCtx = useContext(LangContext);
  const ridersText = langCtx.generateText("ridersText");

  const [data, setData] = useState([]);
  const [highestJumps, setHighestJumps] = useState({});
  const [totalSessions, setTotalSessions] = useState({});

  const listFetchedData = useCallback(
    (sessions, uniqueNames) => {
      setData(sessions);

      if (typeof uniqueNames === "object" && !Array.isArray(uniqueNames)) {
        const newHighestJumps = {};
        const newTotalSessions = {};

        Object.keys(uniqueNames).forEach((name) => {
          const highestJumpForName = sessions
            .filter((session) => session.name === name)
            .reduce(
              (max, session) => Math.max(max, parseFloat(session.height)),
              0
            );

          newHighestJumps[name] = highestJumpForName;
          newTotalSessions[name] = uniqueNames[name].sessions;
        });

        setHighestJumps(newHighestJumps);
        setTotalSessions(newTotalSessions);
      } else {
        console.error(
          "Unexpected data type for uniqueNames:",
          typeof uniqueNames
        );
      }
    },
    [setData, setHighestJumps, setTotalSessions]
  );

  const renderedNames = new Set();

  return (
    <div className={styles.mainDiv}>
      <TitleBox title={`${ridersText}`} />
      <DataFetch onDataFetched={listFetchedData} />
      {data.map((entry, id) =>
        entry.name && !renderedNames.has(entry.name)
          ? (renderedNames.add(entry.name),
            (
              <SessionData
                key={id}
                name={entry.name}
                highestJump={highestJumps[entry.name]}
                totalSessions={totalSessions[entry.name]}
              />
            ))
          : null
      )}
    </div>
  );
};

export default Riders;
