import React, { useState, useCallback, useContext, useEffect } from "react";
import styles from "../App.module.css";
import classes from "./Pages.module.css";
import TitleBox from "../Layout/TitleBox";
import TitleBoxSmall from "../Layout/TitleBoxSmall";
import SessionData from "../SessionData";
import DataFetch from "../DataFetch";
import LangContext from "../store/LangContext";
import AuthContext from "../store/AuthContext";
import Button from "../Layout/Button";
import Like from "../Layout/Like";
import Loading from "../Layout/Loading";

const SessionDetail = ({ sessionId }) => {
  const authCtx = useContext(AuthContext);
  const langCtx = useContext(LangContext);
  const dark = authCtx.dark ? classes.dark : "";

  const [comments, setComments] = useState(null);
  const [hasComments, setHasComments] = useState(false);
  const [enteredComment, setEnteredComment] = useState("");
  const [commentDeleted, setCommentDeleted] = useState(false);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(false);

  const url = `https://kite-session-tracker-default-rtdb.europe-west1.firebasedatabase.app/Sessions.json`;

  const listFetchedData = useCallback(
    (data) => {
      setData(data);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    },
    [setData, setLoading]
  );

  const texts = {
    noSuchSessionText: langCtx.generateText("noSuchSessionText"),
    deleteSuccessText: langCtx.generateText("deleteSuccessText"),
    noSuchSessionExplText: langCtx.generateText("noSuchSessionExplText"),
    submitButtonText: langCtx.generateText("submitButtonText"),
    loadingText: langCtx.generateText("loadingText"),
    commentsTitleText: langCtx.generateText("commentsTitleText"),
    noCommentText: langCtx.generateText("noCommentText"),
    commentPlchldrTExt: langCtx.generateText("commentPlchldrTExt"),
    sessionDetailsTitleText: langCtx.generateText("sessionDetailsTitleText"),
  };

  const refreshListAfterDel = (deletedSessionId) => {
    setData((prevData) =>
      prevData.filter((session) => session.id !== deletedSessionId)
    );
    setDeleted(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (enteredComment.length > 0) addCommentHandler(sessionId);
  };

  const addCommentHandler = async (sessionId) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const sessionData = await response.json();
      const existingComments = (sessionData && sessionData.comments) || {};
      const commentId = Date.now().toString();
      const updatedComments = {
        ...existingComments,
        [commentId]: {
          id: window.location.pathname,
          author: authCtx.nameInput,
          text: enteredComment,
        },
      };

      const updatedSessionData = {
        ...sessionData,
        comments: updatedComments,
      };

      await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSessionData),
      });
      setComments(updatedComments);
      setHasComments(true);
      setEnteredComment("");

      console.log(
        `Comment ${enteredComment} for ${window.location.pathname} added successfully.`
      );
    } catch (error) {
      console.error(`Error adding comment for ${sessionId}:`, error.message);
    }
  };

  const commentForm = (
    <form className={`${classes.commentform} ${dark}`} onSubmit={submitHandler}>
      <textarea
        className={classes.commenttextarea}
        placeholder={texts.commentPlchldrTExt}
        maxLength={100}
        minLength={1}
        value={enteredComment}
        onChange={(e) => setEnteredComment(e.target.value)}
      ></textarea>
      <div className={classes.submitcommentbutton}>
        <Button>{texts.submitButtonText}</Button>
      </div>
    </form>
  );

  const delCommentHandler = async (commentId) => {
    try {
      const delResponse = await fetch(
        `https://kite-session-tracker-default-rtdb.europe-west1.firebasedatabase.app/Sessions/comments/${commentId}.json`,
        { method: "DELETE" }
      );
      if (delResponse.ok) {
        console.log("Comment deleted successfully.");
        console.log("Response status:", delResponse.status);
        setCommentDeleted(true);
        setComments((prevComments) => {
          const updatedComments = { ...prevComments };
          delete updatedComments[commentId];
          return updatedComments;
        });
      }
    } catch (error) {
      console.log("Error deleting comment:", error.message);
      console.error("Error details:", error);
    }
  };

  const sessionComments = hasComments && (
    <div key={sessionId}>
      {Object.keys(comments)
        .reverse()
        .map((commentNumber) => {
          const comment = comments[commentNumber];

          return (
            comment.id === window.location.pathname && (
              <div
                className={`${classes.comments} ${dark}`}
                key={commentNumber}
              >
                <section className={classes.comment}>
                  <div
                    className={classes.commentAuthor}
                  >{`-${comment.author}: `}</div>
                  <article>
                    <i>{`"${comment.text}"`}</i>
                  </article>
                </section>
                {comment.author === authCtx.nameInput && (
                  <button
                    className={classes.delcommentbutton}
                    onClick={() => delCommentHandler(commentNumber)}
                  >
                    Delete
                  </button>
                )}
              </div>
            )
          );
        })}
    </div>
  );

  const deletedSession = (
    <div className={styles.mainDiv}>
      <div>
        <div className={classes.container}>{texts.deleteSuccessText}</div>
      </div>
      <TitleBox title={texts.noSuchSessionExplText} />
    </div>
  );

  const noSuchSession = (
    <div className={styles.mainDiv}>
      <div>
        <div className={classes.errorPageMsg}>{texts.noSuchSessionText}</div>
      </div>
      <TitleBox title={texts.noSuchSessionExplText} />
    </div>
  );

  let matchFound = false;

  const listData = data.map((entry) => {
    if (window.location.pathname === `/Sessions/${entry.id}`) {
      matchFound = true;
      return (
        <div key={entry.id} className={styles.mainDiv}>
          <section className={classes.likeandcommentSD}>
            <Like sessionId={entry.id} />
          </section>
          <SessionData {...entry} onDeleteSession={refreshListAfterDel} />
          {commentForm}
          <TitleBoxSmall
            title={hasComments ? texts.commentsTitleText : texts.noCommentText}
          />
          {sessionComments}
        </div>
      );
    }
    return null;
  });

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const sessionData = await response.json();
        const existingComments = (sessionData && sessionData.comments) || {};

        setComments(existingComments);

        const sessionComments = Object.values(existingComments).filter(
          (comment) => {
            return comment.id === window.location.pathname;
          }
        );
        console.log(sessionComments);

        if (sessionComments.length === 0) {
          setHasComments(false);
        } else {
          setHasComments(true);
        }
      } catch (error) {
        setLoading(false);
        console.error(error.message);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };

    if (commentDeleted) {
      fetchComments();
      setCommentDeleted(false);
    }

    fetchComments();
  }, [sessionId, url, commentDeleted]);

  return (
    <main className={styles.mainDiv}>
      <TitleBox title={texts.sessionDetailsTitleText}></TitleBox>
      <DataFetch onDataFetched={listFetchedData} />
      {loading ? (
        <Loading />
      ) : deleted ? (
        deletedSession
      ) : !matchFound ? (
        noSuchSession
      ) : (
        listData
      )}
    </main>
  );
};

export default SessionDetail;
