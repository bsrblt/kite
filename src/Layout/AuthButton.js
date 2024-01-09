import classes from "./AuthButton.module.css";
import AuthContext from "../store/AuthContext";
import { useContext } from "react";
const AuthButton = (props) => {
  const authCtx = useContext(AuthContext);
  return (
    <button
      className={classes.authbutton}
      disabled={(!authCtx.validUserAuth || !authCtx.mailValid) && props.disable}
    >
      {props.children}
    </button>
  );
};
export default AuthButton;
