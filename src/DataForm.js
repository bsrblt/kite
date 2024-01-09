import React, { useState, useEffect, useContext } from "react";
import classes from "./DataForm.module.css";
import Button from "./Layout/Button";
import InputBox from "./Layout/InputBox";
import kotalenton from "././assets/kotalenton.jpg";
import AuthContext from "./store/AuthContext";
import LangContext from "./store/LangContext";
import { database } from "./store/firebaseConfig";
import { ref, set } from "firebase/database";

const currentTimestamp = Date.now();
const currentDate = new Date(currentTimestamp);
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();

const DataForm = (props) => {
  const [spot, setSpot] = useState("");
  const [height, setHeight] = useState("");
  const [size, setSize] = useState("");

  const [heightInputValid, setHeightInputValid] = useState(false);
  const [sizeInputValid, setSizeInputValid] = useState(false);
  const [spotInputValid, setSpotInputValid] = useState(false);
  const incompleteInput =
    !heightInputValid || !sizeInputValid || !spotInputValid;

  const [spotTouched, setSpotTouched] = useState(false);
  const [heightTouched, setHeightTouched] = useState(false);
  const [sizeTouched, setSizeTouched] = useState(false);

  const authCtx = useContext(AuthContext);
  const langCtx = useContext(LangContext);
  const texts = {
    welcomeText: langCtx.generateText("welcomeText"),
    enterDetailsText: langCtx.generateText("enterDetailsText"),
    heightText: langCtx.generateText("heightText"),
    spotSelectText: langCtx.generateText("spotSelectText"),
    sizeText: langCtx.generateText("sizeText"),
    submitButtonText: langCtx.generateText("submitButtonText"),
  };
  const dark = authCtx.dark ? classes.dark : "";

  useEffect(() => {
    setSpotInputValid(spot.trim() !== "");
    setHeightInputValid(Number(height) > 0 && Number(height) <= 40);
    setSizeInputValid(Number(size) >= 3 && Number(size) <= 17);
  }, [height, size, spot]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (incompleteInput) {
      setSpotTouched(true);
      setHeightTouched(true);
      setSizeTouched(true);
      return;
    } else {
      const formData = {
        id: Date.now().toString() + authCtx.nameInput.toString(),
        date: `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`,
        name: authCtx.nameInput,
        spot: spot,
        height: height,
        size: size,
        likes: 0,
      };

      props.onSaveFormData(formData);

      const addFormDataHandler = async () => {
        try {
          const databaseRef = ref(database, `Sessions/${formData.id}`);
          await set(databaseRef, formData);
          console.log("Data added successfully:", formData.id);
        } catch (error) {
          console.error("Error adding session:", error.message);
        }
      };
      addFormDataHandler();
      setSpot("");
      setHeight("");
      setSize("");
      setHeightTouched(false);
      setSizeTouched(false);
    }
  };

  return (
    <div className={classes.dataformbody}>
      <div className={classes.mainTitle}>
        <div className={classes.loggedInMessage}>
          {texts.welcomeText}
          {authCtx.nameInput}
          {texts.enterDetailsText}
        </div>
      </div>
      <div className={`${classes.container} ${dark}`}>
        <form onSubmit={submitHandler} className={classes.sessionForm}>
          <div className={classes.ridername}>
            {authCtx.isLoggedIn && authCtx.nameInput}
          </div>
          <div className={classes.dataformInner}>
            <select
              className={
                authCtx.dark
                  ? `${classes.sessionDropDown_spot_dark}`
                  : `${classes.sessionDropDown_spot} ${
                      spotTouched && !spotInputValid ? classes.invalid : ""
                    }`
              }
              value={spot}
              type="select"
              onChange={(e) => setSpot(e.target.value)}
            >
              <option value="selectspot">{texts.spotSelectText}</option>
              <option value="Güzelyalı">Güzelyalı</option>
              <option value="Ayvalık">Ayvalık</option>
              <option value="Urla">Urla</option>
              <option value="Akyaka">Akyaka</option>
            </select>
            <InputBox
              className={classes.sessionInput_height}
              type="number"
              value={height}
              isTouched={heightTouched}
              isValid={heightInputValid}
              min={0}
              max={40}
              step={0.1}
              placeholder={texts.heightText}
              onChange={(e) => setHeight(e.target.value)}
            />
            <InputBox
              type="number"
              className={classes.sessionInput_kitesize}
              value={size}
              min={5}
              max={17}
              isTouched={sizeTouched}
              isValid={sizeInputValid}
              step={0.5}
              placeholder={texts.sizeText}
              onChange={(e) => setSize(e.target.value)}
            />
            <Button type="submit" disable={incompleteInput ? true : false}>
              {texts.submitButtonText}
            </Button>
          </div>
        </form>
        <img className={classes.kitejump_img} src={kotalenton} alt=""></img>
      </div>
    </div>
  );
};

export default DataForm;
