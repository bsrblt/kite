import { useContext, useState } from "react";
import AuthButton from "../Layout/AuthButton";
import LangSelect from "../Layout/LangSelect";
import AuthContext from "../store/AuthContext";
import LangContext from "../store/LangContext";
import classes from "./UserLogin.module.css";

const UserLogin = () => {
  const authCtx = useContext(AuthContext);
  const langCtx = useContext(LangContext);

  const [userInteracted, setUserInteracted] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [forgotPw, setForgotPw] = useState(false);

  const newUserHandler = () => {
    setUserInteracted(true);
    setForgotPw(false);
    setIsLoggingIn(false);
    setIsSigningUp(true);
  };
  const existingUserHandler = () => {
    setUserInteracted(true);
    setForgotPw(false);
    setIsSigningUp(false);
    setIsLoggingIn(true);
  };

  const pwRecoveryHandler = () => {
    setForgotPw(true);
  };

  const usernameInputClass =
    !authCtx.nameTouched || (authCtx.nameTouched && authCtx.nameValid)
      ? classes.usernameInput
      : classes.usernameInputError;

  const pwInputClass =
    !authCtx.pwTouched || (authCtx.pwTouched && authCtx.pwValid)
      ? classes.pwInput
      : classes.pwInputError;

  const mailInputClass =
    !authCtx.mailTouched || (authCtx.mailTouched && authCtx.mailValid)
      ? classes.mailInput
      : classes.mailInputError;

  const placeholderNameText = langCtx.generateText("placeholderNameText");
  const placeholderPWText = langCtx.generateText("placeholderPWText");
  const emailText = langCtx.generateText("emailText");
  const existingUserText = langCtx.generateText("existingUserText");
  const newUserText = langCtx.generateText("newUserText");
  const errMsgText = langCtx.generateText("errMsgText");
  const mailErrMsgText = langCtx.generateText("mailErrMsgText");
  const loginWordText = langCtx.generateText("loginWordText");
  const loginWordTextCaps = langCtx.generateText("loginWordTextCaps");
  const signupWordTextCaps = langCtx.generateText("signupWordTextCaps");
  const signupWordText = langCtx.generateText("signupWordText");
  const newUserMsgText = langCtx.generateText("newUserMsgText");
  const existingUserMsgText = langCtx.generateText("existingUserMsgText");
  const pwForgot = langCtx.generateText("pwForgot");
  const submitButtonText = langCtx.generateText("submitButtonText");
  const loginText = langCtx.generateText("loginText");
  const signupText = langCtx.generateText("signupText");

  const formMsg =
    !isSigningUp && !isLoggingIn ? (
      <>
        {langCtx.langEN && (
          <h1 className={classes.plsloginmsgText}>
            Please <span onClick={existingUserHandler}>{loginWordText}</span> or{" "}
            <span onClick={newUserHandler}>{signupWordText}</span> to enter your
            session details.
          </h1>
        )}
        {langCtx.langTR && (
          <h1 className={classes.plsloginmsgText}>
            Seans detaylarınızı girebilmek için lütfen{" "}
            <span onClick={existingUserHandler}>{loginWordText}</span> veya{" "}
            <span onClick={newUserHandler}>{signupWordText}.</span>
          </h1>
        )}
        {langCtx.langFR && (
          <h1 className={classes.plsloginmsgText}>
            Veuillez vous{" "}
            <span onClick={existingUserHandler}>{loginWordText}</span> ou vous{" "}
            <span onClick={newUserHandler}>{signupWordText}</span> pour saisir
            les détails de votre séance.
          </h1>
        )}
      </>
    ) : isSigningUp ? (
      <h1 className={classes.plsloginmsgText}>{newUserMsgText}</h1>
    ) : (
      <h1 className={classes.plsloginmsgText}>{existingUserMsgText}</h1>
    );

  const memberText = isSigningUp ? (
    <h4 className={classes.memberText}>
      {existingUserText}{" "}
      <span onClick={existingUserHandler}>{loginWordTextCaps}</span>
    </h4>
  ) : isLoggingIn ? (
    <h4 className={classes.memberText}>
      {newUserText} <span onClick={newUserHandler}>{signupWordTextCaps}</span>
    </h4>
  ) : null;

  const mailInputField = (
    <div className={classes.loginDiv_name_and_pw}>
      <div className={classes.loginDivInner}>
        <input
          className={mailInputClass}
          type="email"
          name="email"
          id="email"
          minLength={10}
          maxLength={30}
          placeholder={emailText}
          value={authCtx.mailInput}
          onChange={authCtx.emailChange}
        ></input>
      </div>
    </div>
  );

  const authSection = (
    <>
      <div className={classes.loginDiv_name_and_pw}>
        <div className={classes.loginDivInner}>
          <input
            className={usernameInputClass}
            type="text"
            name="username"
            id="username"
            minLength={3}
            maxLength={12}
            placeholder={placeholderNameText}
            value={authCtx.nameInput}
            onChange={authCtx.nameChange}
          ></input>
        </div>
      </div>
      <div className={classes.loginDiv_name_and_pw}>
        <div className={classes.loginDivInner}>
          <input
            className={pwInputClass}
            type="password"
            name="password"
            id="password"
            minLength={3}
            maxLength={12}
            placeholder={placeholderPWText}
            value={authCtx.pwInput}
            onChange={authCtx.pwChange}
          ></input>
        </div>
      </div>
      {isSigningUp && mailInputField}
      <AuthButton
        className={classes.authButton}
        type="submit"
        disable={
          isLoggingIn
            ? !authCtx.validUserAuth
            : isSigningUp
            ? !authCtx.validUserAuth || !authCtx.mailValid
            : null
        }
      >
        {isSigningUp ? signupText : loginText}
      </AuthButton>
      <div className={classes.pwForgot} onClick={pwRecoveryHandler}>
        {!isSigningUp && pwForgot}
      </div>
    </>
  );

  const recoverySection = (
    <>
      {mailInputField}
      <AuthButton type="submit" disable={!authCtx.mailValid}>
        {submitButtonText}
      </AuthButton>
      {authCtx.mailTouched && !authCtx.mailValid && (
        <div className={classes.recoverErrormsg}>{mailErrMsgText}</div>
      )}
    </>
  );

  return (
    <div className={classes.loginDiv}>
      <div className={classes.langselectModal}>
        <LangSelect />
      </div>
      <form
        className={classes.loginform}
        onSubmit={isLoggingIn ? authCtx.login : authCtx.signup}
      >
        <div className={classes.userMsgText}>
          <div>{formMsg}</div>
          <div>{memberText}</div>
        </div>
        <div className={classes.authSection}>
          {userInteracted && !forgotPw && authSection}
          {forgotPw && recoverySection}
        </div>
      </form>
      <div className={classes.errorMsgBox}>
        {((authCtx.nameTouched && !authCtx.nameValid) ||
          (authCtx.pwTouched && !authCtx.pwValid)) && (
          <div className={classes.inputerrormsg}>{errMsgText}</div>
        )}
        {authCtx.mailTouched && !authCtx.mailValid && isSigningUp && (
          <div className={classes.mailErrormsg}>{mailErrMsgText}</div>
        )}
      </div>
    </div>
  );
};
export default UserLogin;
