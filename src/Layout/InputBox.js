import React, { useContext } from "react";
import classes from "./InputBox.module.css";
import AuthContext from "../store/AuthContext";

const InputBox = (props) => {
  const authCtx = useContext(AuthContext);
  const dark = authCtx.dark ? classes.dark : "";

  return (
    <label>
      <input
        className={`${classes.regular} ${dark} ${
          !props.isTouched || props.isValid ? "" : classes.invalid
        }`}
        placeholder={props.placeholder}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        id={props.id}
        min={props.min}
        max={props.max}
        step={props.step}
      />
      {props.children}
    </label>
  );
};

export default InputBox;
