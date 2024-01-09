import classes from "./Button.module.css";
import AuthContext from "../store/AuthContext";
import { useContext } from "react";
const Button = (props) => {
  const authCtx = useContext(AuthContext);
  return (
    <button
      className={classes.fancybutton}
      disabled={(!authCtx.validUserAuth || !authCtx.mailValid) && props.disable}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
export default Button;
