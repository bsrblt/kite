import React, { useState, useContext, useRef, useEffect } from "react";
import classes from "./SessionData.module.css";
import AuthContext from "./store/AuthContext";
import LangContext from "./store/LangContext";
import DeletionOverlay from "./DeletionOverlay";

const SessionData = (props) => {
  const authCtx = useContext(AuthContext);
  const langCtx = useContext(LangContext);
  const dark = authCtx.dark ? classes.dark : "";

  const [del, setDel] = useState(false);
  const delHandler = () => setDel(true);
  const cancelHandler = () => setDel(false);

  const delRef = useRef();
  const closeWarningHandler = (e) => {
    if (delRef.current && !delRef.current.contains(e.target)) {
      setDel(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeWarningHandler);

    return () => {
      document.removeEventListener("mousedown", closeWarningHandler);
    };
  }, []);

  const confirmDeleteHandler = async () => {
    try {
      const delResponse = await fetch(
        `https://kite-session-tracker-default-rtdb.europe-west1.firebasedatabase.app/Sessions/${props.id}.json`,
        { method: "DELETE" }
      );
      if (delResponse.ok) {
        console.log("Session deleted successfully.");
        setDel(false);
        props.onDeleteSession(props.id);
      }
    } catch (error) {
      console.log("Error deleting session:", error.message);
      console.error("Error details:", error);
    }
  };
  // if (!props.height || !props.spot || !props.size) return null;

  const SessionDataClasses = !del
    ? `${classes.dataList_maindiv} ${dark}`
    : classes.dataList_maindiv_deleteAttempt;

  const delBUttonClasses = !authCtx.dark
    ? classes.delButton
    : classes.delButtonDark;

  const heightText = langCtx.generateText("heightText");
  const nameText = langCtx.generateText("nameText");
  const spotText = langCtx.generateText("spotText");
  const sizeText = langCtx.generateText("sizeText");
  const delButtonText = langCtx.generateText("delButtonText");
  const userSessionCountText = langCtx.generateText("userSessionCountText");
  const warnText = langCtx.generateText("warnText");
  const pbText = langCtx.generateText("pbText");
  const path = window.location.pathname;

  const dataFrame = (
    <div className={classes.dataFrameMain}>
      <div className={classes.dataFrame}>
        <div>
          {path === "/MySessions" ? null : path === "/Riders" ? (
            props.name
          ) : (
            <div
              className={classes.details}
            >{`${nameText}: ${props.name}`}</div>
          )}
          {path !== "/Riders" ? (
            <>
              <div className={classes.details}>
                {`${heightText}: ${props.height}m`}
              </div>
              <div className={classes.details}>
                {`${spotText}: ${props.spot}`}
              </div>
              <div className={classes.details}>
                {`${sizeText}: ${props.size}m²`}
              </div>
              <div className={classes.details}>
                {path !== "/MySessions" ? null : ` `}
              </div>
            </>
          ) : (
            <>
              <div
                className={classes.details}
              >{`${pbText}: ${props.highestJump}m`}</div>
              <div
                className={classes.details}
              >{`${userSessionCountText}: ${props.totalSessions}`}</div>
            </>
          )}
        </div>
      </div>
      {path !== "/Riders" && authCtx.nameInput === props.name ? (
        !del ? (
          <button className={delBUttonClasses} onClick={delHandler}>
            {delButtonText}
          </button>
        ) : (
          <button className={classes.delButtonWarnText}>{warnText}</button>
        )
      ) : null}
    </div>
  );

  return (
    <main className={SessionDataClasses} ref={delRef}>
      {del && (
        <DeletionOverlay
          onConfirm={confirmDeleteHandler}
          onCancel={cancelHandler}
        />
      )}
      {dataFrame}
    </main>
  );
};

export default SessionData;
