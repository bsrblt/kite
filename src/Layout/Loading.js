import React, { useContext } from "react";
import LangContext from "../store/LangContext";
import AuthContext from "../store/AuthContext";
import styles from "../pages/Pages.module.css";

const Loading = () => {
  const authCtx = useContext(AuthContext);
  const langCtx = useContext(LangContext);
  const dark = authCtx.dark ? styles.dark : "";

  return (
    <div className={`${styles.loading} ${dark}`}>
      <h5>{langCtx.generateText("loadingText")}</h5>
    </div>
  );
};

export default Loading;
