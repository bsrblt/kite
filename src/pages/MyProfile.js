import React, { useContext } from "react";
import { Link } from "react-router-dom";
import TitleBox from "../Layout/TitleBox";
import AuthContext from "../store/AuthContext";
import LangContext from "../store/LangContext";
import styles from "../App.module.css";
import classes from "./Pages.module.css";
import DataFetch from "../DataFetch";

const MyProfile = () => {
  const authCtx = useContext(AuthContext);
  const langCtx = useContext(LangContext);
  const dark = authCtx.dark ? classes.dark : "";

  const listFetchedData = () => {};

  const userProfile = (
    <div className={styles.mainDiv}>
      <TitleBox title={authCtx.nameInput} />
      <DataFetch onDataFetched={listFetchedData} />{" "}
      <Link to="/MySessions" style={{ textDecoration: "none" }}>
        <div className={`${classes.container} ${dark}`}>
          <div className={classes.userdetails}>
            <h5>
              {langCtx.generateText("totalJumpsText")}
              {": "}
              {authCtx.totalJumps}
            </h5>
            <h5>
              {langCtx.generateText("highestJumpText")}
              {": "}
              {authCtx.highestJump}
              {"m"}
            </h5>
            <h5>
              {langCtx.generateText("mostVisitedSpotText")}
              {": "}
              {authCtx.mostVisitedSpot}
            </h5>
          </div>
        </div>
      </Link>
    </div>
  );
  return userProfile;
};
export default MyProfile;
