import React, { useContext } from "react";
import classes from "./TitleBox.module.css";
import AuthContext from "../store/AuthContext";

const TitleBox = (props) => {
  const authCtx = useContext(AuthContext);
  const dark = authCtx.dark ? classes.dark : "";

  return <div className={`${classes.titleBox} ${dark}`}>{props.title}</div>;
};

export default TitleBox;
