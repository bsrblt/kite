import React, { useContext } from "react";
import classes from "./AdminPanel.Module.css";
import AuthContext from "../src/store/AuthContext";

const AdminPanel = (props) => {
  const authCtx = useContext(AuthContext);

  const delAllHandler = async (e) => {
    e.preventDefault();
    console.log("Delete all button clicked.");
    try {
      const response = await fetch(
        "https://kite-session-tracker-default-rtdb.europe-west1.firebasedatabase.app/Sessions.json",
        { method: "DELETE" }
      );
      console.log(response);
      if (response.ok) {
        console.log("Successfully deleted all sessions.");
        alert("Successfully deleted all sessions.");
        props.onDelAll();
      } else {
        console.log("Failed to delete all sessions.");
        alert("Failed to delete all sessions.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      {authCtx.isLoggedIn && (
        <div className={classes.adminDelButtonDiv}>
          <div>
            <button
              className={classes.adminDelButton}
              type="submit"
              onClick={delAllHandler}
            >
              DELETE ALL SESSIONS
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminPanel;
