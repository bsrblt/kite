import React, { useState, useEffect } from "react";
import { translations } from "./translations";

const LangContext = React.createContext({
  langEN: true,
  langFR: false,
  langTR: false,
  langENchangeHandler: () => {},
  langFRchangeHandler: () => {},
  langTRchangeHandler: () => {},
  storedLangEN: null,
  storedLangTR: null,
  storedLangFR: null,
  generateText: () => {},
});

export const LangContextProvider = (props) => {
  const storedLangEN = localStorage.getItem("langEN") === "true";
  const storedLangTR = localStorage.getItem("langTR") === "true";
  const storedLangFR = localStorage.getItem("langFR") === "true";

  const [langEN, setLangEN] = useState(storedLangEN);
  const [langFR, setLangFR] = useState(storedLangFR);
  const [langTR, setLangTR] = useState(storedLangTR);

  const setLanguage = (en, fr, tr) => {
    setLangEN(en);
    setLangFR(fr);
    setLangTR(tr);
    localStorage.setItem("langEN", en);
    localStorage.setItem("langTR", tr);
    localStorage.setItem("langFR", fr);
  };

  useEffect(() => {
    setLangEN(storedLangEN);
    setLangFR(storedLangFR);
    setLangTR(storedLangTR);
  }, [storedLangEN, storedLangFR, storedLangTR]);

  return (
    <LangContext.Provider
      value={{
        langEN,
        langFR,
        langTR,
        langENchangeHandler: () => setLanguage(true, false, false),
        langFRchangeHandler: () => setLanguage(false, true, false),
        langTRchangeHandler: () => setLanguage(false, false, true),
        storedLangEN,
        storedLangTR,
        storedLangFR,
        generateText: (key) =>
          translations[key][langEN ? "en" : langTR ? "tr" : "fr"],
      }}
    >
      {props.children}
    </LangContext.Provider>
  );
};
export default LangContext;
