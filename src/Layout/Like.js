import React, { useContext, useState, useEffect } from "react";
import classes from "./Like.module.css";
import likebuttonimg from "../assets/thumbs-up-line-icon.svg";
import likebuttonimgblack from "../assets/thumbs-up-black-icon.svg";
import turqlike from "../assets/turqlike.png";
import turqlikedark from "../assets/turqlikedark.png";
import AuthContext from "../store/AuthContext";
import LangContext from "../store/LangContext";

const Like = ({ sessionId }) => {
  const authCtx = useContext(AuthContext);
  const langCtx = useContext(LangContext);
  const [likesAmount, setLikesAmount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const url = `https://kite-session-tracker-default-rtdb.europe-west1.firebasedatabase.app/Sessions/${sessionId}.json`;
  const likedSessionKey = `${sessionId}-${authCtx.nameInput}`;
  const likedSession = localStorage.getItem(likedSessionKey);

  const likeHandler = async (sessionId) => {
    if (loading) return;
    try {
      setLoading(true);
      const response = await fetch(url);
      const sessionData = await response.json();
      console.log(sessionId);
      if (authCtx.nameInput === sessionData.name) {
        alert(`${langCtx.generateText("cantLikeSelfText")}`);
        return;
      }

      let updatedLikes;
      if (authCtx.nameInput !== sessionData.name && !liked && !likedSession) {
        updatedLikes = sessionData.likes + 1;
        setLiked(true);
        localStorage.setItem(likedSessionKey, "liked");
      } else if (
        authCtx.nameInput !== sessionData.name &&
        liked &&
        likedSession
      ) {
        updatedLikes = sessionData.likes - 1;
        setLiked(false);
        localStorage.removeItem(likedSessionKey);
      } else {
        updatedLikes = sessionData.likes;
      }

      await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likes: updatedLikes,
        }),
      });
      setLikesAmount(updatedLikes);
      console.log("liked");
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
    return;
  };

  useEffect(() => {
    const fetchSessionLikes = async () => {
      try {
        const response = await fetch(url);
        const sessionData = await response.json();
        if (likedSession) {
          setLiked(true);
          setLikesAmount(sessionData.likes);
        } else {
          setLiked(false);
          setLikesAmount(sessionData.likes);
        }
      } catch (error) {
        console.error(
          `Error fetching session data for ${sessionId}:`,
          error.message
        );
      }
    };
    fetchSessionLikes();
  }, [sessionId, url, likedSession]);

  return (
    <>
      <img
        className={classes.likebutton}
        src={`${
          authCtx.dark && !likedSession
            ? likebuttonimgblack
            : !authCtx.dark && !likedSession
            ? likebuttonimg
            : authCtx.dark && likedSession
            ? turqlikedark
            : turqlike
        }`}
        alt="like button"
        onClick={() => likeHandler(sessionId)}
      ></img>
      <p className={classes.likecount}>{likesAmount}</p>
    </>
  );
};
export default Like;
