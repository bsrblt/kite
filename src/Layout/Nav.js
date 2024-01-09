import React, { useState, useContext } from "react";
import classes from "./Nav.module.css";
import burger from "../assets/burger.svg";
import burgerdarktheme from "../assets/burgerdarktheme.png";
import { NavLink } from "react-router-dom";
import LangContext from "../store/LangContext";
import AuthContext from "../store/AuthContext";

const Nav = () => {
  const [burgerMenu, setBurgerMenu] = useState(false);

  const langCtx = useContext(LangContext);
  const authCtx = useContext(AuthContext);
  const dark = authCtx.dark ? classes.dark : "";

  const spotsText = langCtx.generateText("spotsText");
  const ridersText = langCtx.generateText("ridersText");
  const recordsText = langCtx.generateText("recordsText");
  const homeText = langCtx.generateText("homeText");

  const linkStyle = { textDecoration: "none" };
  const linkClasses = ({ isActive }) =>
    isActive ? classes.navLinkActive : null;

  const headerNavLinks = (
    <>
      <NavLink to="/Spots" style={linkStyle} className={linkClasses}>
        <div className={`${classes.nav_element} ${dark}`}>{spotsText}</div>
      </NavLink>
      <NavLink to="/Riders" style={linkStyle} className={linkClasses}>
        <div className={`${classes.nav_element} ${dark}`}>{ridersText}</div>
      </NavLink>
      <NavLink to="/Records" style={linkStyle} className={linkClasses}>
        <div className={`${classes.nav_element} ${dark}`}>{recordsText}</div>
      </NavLink>
      <NavLink to="/" style={linkStyle} className={linkClasses} end>
        <div className={`${classes.nav_element} ${dark}`}>{homeText}</div>
      </NavLink>
    </>
  );

  const burgerMenuIcon = (
    <img
      className={classes.burger_icon}
      src={authCtx.dark ? burgerdarktheme : burger}
      alt="burgermenuicon"
      onClick={() => setBurgerMenu((s) => !s)}
    ></img>
  );

  return (
    <>
      <div className={classes.nav_menu}>{headerNavLinks}</div>
      <div className={classes.nav_burger}>
        {burgerMenuIcon}
        {burgerMenu && (
          <div className={`${classes.nav_burger_dropmenu} ${dark}`}>
            {headerNavLinks}
          </div>
        )}
      </div>
    </>
  );
};
export default Nav;
