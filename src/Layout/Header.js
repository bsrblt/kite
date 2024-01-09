import React, { useContext, useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import usericon from "../assets/user-profile-icon.svg";
import usericondarktheme from "../assets/usericondarktheme.png";
import kitelogo from "../assets/kitelogo.png";
import kitelogodarkcyan from "../assets/kitelogodarkcyan.png";
import classes from "./Header.module.css";
import AuthContext from "../store/AuthContext";
import UserMenu from "./UserMenu";
import LangContext from "../store/LangContext";
import Nav from "./Nav";

const Header = () => {
  const authCtx = useContext(AuthContext);
  const langCtx = useContext(LangContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [userIconImg, setUserIconImg] = useState(usericondarktheme);
  const usermenuToggler = () => setMenuOpen((s) => !s);

  const menuRef = useRef();

  useEffect(() => {
    if (menuOpen) {
      const closeMenuHandler = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
          e.stopPropagation();
          setMenuOpen(false);
        }
      };
      document.addEventListener("mousedown", closeMenuHandler);

      return () => {
        document.removeEventListener("mousedown", closeMenuHandler);
      };
    }
  }, [menuOpen]);

  const mainTitleText = langCtx.generateText("mainTitleText");
  const dark = authCtx.dark ? classes.dark : "";
  return (
    <div className={`${classes.headermain} ${dark}`}>
      <div className={classes.header_inner_left}>
        <NavLink to="/">
          <img
            className={`${classes.kitelogo} ${dark}`}
            alt="kitelogo"
            src={!authCtx.dark ? kitelogo : kitelogodarkcyan}
          ></img>
        </NavLink>
        <div>
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <h1 className={`${classes.mainTitle} ${dark}`} alt="Home">
              {mainTitleText}
            </h1>
          </NavLink>
        </div>
      </div>
      <div className={classes.header_inner_right}>
        <Nav />
        {authCtx.isLoggedIn && (
          <img
            className={classes.usericon}
            src={authCtx.dark ? userIconImg : usericon}
            alt="user"
            onClick={usermenuToggler}
            ref={menuRef}
            onMouseEnter={() => setUserIconImg(usericon)}
            onMouseLeave={() => setUserIconImg(usericondarktheme)}
          ></img>
        )}
        {menuOpen && (
          <div ref={menuRef}>
            <UserMenu />
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
