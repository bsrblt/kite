import { useContext, useState } from "react";
import AuthContext from "../store/AuthContext";
import LangContext from "../store/LangContext";
import classes from "./UserMenu.module.css";
import LangSelect from "./LangSelect";
import { Link, useNavigate } from "react-router-dom";

const UserMenu = () => {
  const authCtx = useContext(AuthContext);
  const langCtx = useContext(LangContext);

  const [selectingLang, setSelectingLang] = useState(false);
  const dark = authCtx.dark ? classes.dark : "";
  const navi = useNavigate();

  const profileText = langCtx.generateText("profileText");
  const langText = langCtx.generateText("langText");
  const drktmText = langCtx.generateText("drktmText");
  const lightThemeText = langCtx.generateText("lightThemeText");
  const logoutText = langCtx.generateText("logoutText");
  const mySsText = langCtx.generateText("mySsText");

  return (
    <div className={classes.usermenuContainer}>
      <div className={`${classes.usermenuMainDiv} ${dark}`}>
        <div className={`${classes.usermenuName} ${dark}`}>
          {authCtx.nameInput}
        </div>
        <div className={classes.usermenulink}>
          <Link to="/MyProfile" style={{ textDecoration: "none" }}>
            <div className={`${classes.menuitem} ${dark}`}>{profileText}</div>
          </Link>
        </div>
        <div className={classes.usermenulink}>
          <Link to="/MySessions" style={{ textDecoration: "none" }}>
            <div className={`${classes.menuitem} ${dark}`}>{mySsText}</div>
          </Link>
        </div>
        <div
          className={classes.langSelectText}
          onMouseEnter={() => setSelectingLang(true)}
          onMouseLeave={() => setSelectingLang(false)}
        >
          <div className={`${classes.menuitem} ${dark}`}>{langText}</div>{" "}
          {selectingLang ? (
            <div className={classes.langSelection}>
              <LangSelect />
            </div>
          ) : null}
        </div>
        <div>
          <div
            className={`${classes.menuitem} ${dark}`}
            onClick={authCtx.themeToggler}
          >
            {!authCtx.dark ? drktmText : lightThemeText}
          </div>
        </div>
        <div className={classes.usermenulink}>
          <div
            onClick={() => {
              authCtx.logout();
              navi("/");
            }}
            className={`${classes.menuitem} ${dark}`}
          >
            {logoutText}
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserMenu;
