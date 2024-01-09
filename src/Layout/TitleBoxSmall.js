import React, { useContext } from "react";
import classes from "./TitleBoxSmall.module.css";
import AuthContext from "../store/AuthContext";

const TitleBoxSmall = (props) => {
  const authCtx = useContext(AuthContext);
  const dark = authCtx.dark ? classes.dark : "";

  return (
    <div className={`${classes.titleBoxSmall} ${dark}`}>{props.title}</div>
  );
};

export default TitleBoxSmall;
