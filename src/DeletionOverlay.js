import React, { useContext } from "react";
import LangContext from "./store/LangContext";
import classes from "./DeletionOverlay.module.css";

const DeletionOverlay = (props) => {
  const langCtx = useContext(LangContext);
  const deleteText = langCtx.generateText("deleteText");
  const cancelText = langCtx.generateText("cancelText");

  const warning = (
    <div className={classes.delConfirm}>
      <button
        className={classes.confButton}
        onClick={props.onConfirm}
        ref={props.ref}
      >
        {deleteText}
      </button>
      <button className={classes.cancelButton} onClick={props.onCancel}>
        {cancelText}
      </button>
    </div>
  );

  return warning;
};

export default DeletionOverlay;
