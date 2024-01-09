import React, { useContext } from "react";
import classes from "./Comment.module.css";
import commentbuttonimg from "../assets/speech-bubble-line-icon.svg";
import commentbuttonimgblack from "../assets/speech-bubble-black-icon.svg";
import AuthContext from "../store/AuthContext";

const Comment = () => {
  const authCtx = useContext(AuthContext);
  return (
    <>
      <img
        className={classes.commentbutton}
        src={`${authCtx.dark ? commentbuttonimgblack : commentbuttonimg}`}
        alt="like button"
      ></img>
    </>
  );
};
export default Comment;
