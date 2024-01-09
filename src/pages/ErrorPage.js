import React, { useContext } from "react";
import TitleBox from "../Layout/TitleBox";
import styles from "../App.module.css";
import classes from "./Pages.module.css";
import LangContext from "../store/LangContext";
import Header from "../Layout/Header";

const ErrorPage = () => {
  const langCtx = useContext(LangContext);

  return (
    <>
      <Header />
      <div className={styles.mainDiv}>
        <div>
          <div className={classes.errorPageMsg}>
            {langCtx.generateText("errorPageTitleText")}
          </div>
        </div>
        <TitleBox title={`404: ${langCtx.generateText("errorPageMsg")}`} />
      </div>
    </>
  );
};
export default ErrorPage;
