import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  nameInput: "",
  pwInput: "",
  mailInput: "",
  nameChange: () => {},
  pwChange: () => {},
  emailChange: () => {},
  validUserAuth: false,
  login: () => {},
  logout: () => {},
  signup: () => {},
  nameValid: false,
  pwValid: false,
  mailValid: false,
  nameTouched: false,
  pwTouched: false,
  mailTouched: false,
  highestJump: 0,
  mostVisitedSpot: "",
  totalJumps: 0,
  updateUserData: () => {},
  dark: false,
  themeToggler: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [pwInput, setPwInput] = useState("");
  const [mailInput, setMailInput] = useState("");
  const [nameValid, setNameValid] = useState(false);
  const [mailValid, setMailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);
  const [pwTouched, setPwTouched] = useState(false);
  const [mailTouched, setMailTouched] = useState(false);
  const [highestJump, setHighestJump] = useState(0);
  const [totalJumps, setTotalJumps] = useState(0);
  const [mostVisitedSpot, setMostVisitedSpot] = useState("");
  const [dark, setDark] = useState(Boolean);
  const [, forceUpdate] = useState();

  const nameChangeHandler = (e) => {
    const input = e.target.value;
    if (input.trim().length > 0) {
      setNameTouched(true);
    }
    setNameInput(input);

    if (input.trim().length > 2) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
  };

  const pwChangeHandler = (e) => {
    const input = e.target.value;
    if (input.trim().length > 0) {
      setPwTouched(true);
    }
    setPwInput(input);

    if (input.trim().length > 2) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  const emailChangeHandler = (e) => {
    const input = e.target.value;
    if (input.trim().length > 0) {
      setMailTouched(true);
    }
    setMailInput(input);

    if (input.trim().length > 2 && input.trim().includes("@")) {
      setMailValid(true);
    } else {
      setMailValid(false);
    }
  };
  const themeToggler = () => {
    setDark((prevDark) => {
      const newDark = !prevDark;
      localStorage.setItem("isDark", newDark ? "true" : "false");
      return newDark;
    });
  };

  const validUserAuth = nameTouched && nameValid && pwTouched && pwValid;

  const loginHandler = async (e) => {
    e.preventDefault();
    if (validUserAuth) {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", nameInput);
      setHighestJump(0);
      setTotalJumps(0);
      setMostVisitedSpot("");
      forceUpdate();
    }
  };

  const signupHandler = (e) => {
    e.preventDefault();
    if (validUserAuth && mailValid) {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", nameInput);
      forceUpdate();
    }
  };

  const logoutHandler = (e) => {
    setIsLoggedIn(false);
    setNameTouched(false);
    setPwTouched(false);
    setMailTouched(false);
    setMailInput("");
    setNameInput("");
    setPwInput("");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setHighestJump(null);
    setTotalJumps(null);
    setMostVisitedSpot(null);
    forceUpdate();
  };

  const updateUserData = (highestJump, mostVisitedSpot, totalJumps) => {
    setHighestJump(highestJump);
    setMostVisitedSpot(mostVisitedSpot);
    setTotalJumps(totalJumps);
  };

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn === "true") {
      setIsLoggedIn(true);
      const storedUsername = localStorage.getItem("username");
      setNameInput(storedUsername);
      const darkPref = localStorage.getItem("isDark");
      if (darkPref === "true") {
        setDark(true);
      } else {
        setDark(false);
      }
    }
  }, [setDark]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        nameInput,
        pwInput,
        mailInput,
        nameChange: nameChangeHandler,
        pwChange: pwChangeHandler,
        emailChange: emailChangeHandler,
        validUserAuth,
        login: loginHandler,
        logout: logoutHandler,
        signup: signupHandler,
        nameValid,
        pwValid,
        mailValid,
        nameTouched,
        pwTouched,
        mailTouched,
        highestJump,
        mostVisitedSpot,
        totalJumps,
        updateUserData,
        dark,
        themeToggler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
