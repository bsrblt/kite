import React, { useContext } from "react";
import flagTR from "../assets/turkey-flag-round-circle-icon.svg";
import flagEN from "../assets/uk-flag-round-circle-icon.svg";
import flagFR from "../assets/france-flag-round-circle-icon.svg";
import classes from "./LangSelect.module.css";
import LangContext from "../store/LangContext";

const LangSelect = () => {
  const langCtx = useContext(LangContext);
  return (
    <div className={classes.flagsDiv}>
      <img
        src={flagTR}
        className={classes.flagTR}
        alt="Turkish"
        title="Turkish"
        onClick={langCtx.langTRchangeHandler}
      ></img>
      <img
        src={flagEN}
        className={classes.flagEN}
        alt="English"
        title="English"
        onClick={langCtx.langENchangeHandler}
      ></img>
      <img
        src={flagFR}
        className={classes.flagFR}
        alt="French"
        title="French"
        onClick={langCtx.langFRchangeHandler}
      ></img>
    </div>
  );
};
export default LangSelect;
