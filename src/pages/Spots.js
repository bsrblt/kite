import React, { useContext, useState, useRef, useEffect } from "react";
import TitleBox from "../Layout/TitleBox";
import styles from "../App.module.css";
import classes from "./Pages.module.css";
import LangContext from "../store/LangContext";
import AuthContext from "../store/AuthContext";
import Modal from "../Layout/Modal";
// import ida from "..//assets/ida.jpg";

const Spots = () => {
  const authCtx = useContext(AuthContext);
  const langCtx = useContext(LangContext);
  const dark = authCtx.dark ? classes.dark : "";
  const spotsText = langCtx.generateText("spotsText");

  const [showSpot, setShowSpot] = useState(null);
  const spotRef = useRef();

  const openSpotModal = (spot) => {
    setShowSpot(spot);
  };

  const spotsData = [
    {
      title: "Güzelyalı",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12218.354892819774!2d26.338391!3d40.039961!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b054bd699f312b%3A0x7a2b5e3d5002c0c1!2s%C4%B0da%20Windsurf!5e0!3m2!1str!2str!4v1703428425128!5m2!1str!2str",
    },
    {
      title: "Ayvalık",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3084.4741190840914!2d26.761202634887706!3d39.368144000000036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b09fa4c60fd925%3A0x2435a344309fa534!2s81%20Kite%20Club%20Ayvalik!5e0!3m2!1str!2str!4v1703434686640!5m2!1str!2str",
    },
    {
      title: "Urla",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3129.7641126791423!2d26.651159076888533!3d38.331292971850395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bb90e11e890789%3A0x7e293042b26fdc!2sURLA%20KITE%20CENTER%20-%20U%20K%20C!5e0!3m2!1str!2str!4v1703434305889!5m2!1str!2str",
    },
    {
      title: "Akyaka",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6369.107669178398!2d28.32239394869122!3d37.04428313871392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bf9f4829fe7243%3A0xe3747440b7bf7a8f!2sKite%20Beach%20Akyaka!5e0!3m2!1str!2str!4v1703433953471!5m2!1str!2str",
    },
  ];

  const getModalContent = (title) => {
    return (
      <>
        <div className={classes.gmap}>
          <iframe
            title={title}
            src={showSpot.mapUrl}
            width="600"
            height="450"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className={classes.spotTitle}>{title}</div>
        <aside>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, quasi.
          Pariatur laudantium quaerat aspernatur, illum esse maiores ut at
          minima, tenetur placeat alias ipsum facilis animi cumque impedit vitae
          labore!
        </aside>
      </>
    );
  };

  useEffect(() => {
    const closeModalHandler = (e) => {
      if (spotRef.current && !spotRef.current.contains(e.target)) {
        setShowSpot(null);
      }
    };
    document.addEventListener("mousedown", closeModalHandler);

    return () => {
      document.removeEventListener("mousedown", closeModalHandler);
    };
  }, []);

  return (
    <>
      {showSpot && <Modal>{getModalContent(showSpot.title)}</Modal>}

      <div className={styles.mainDiv}>
        <TitleBox title={spotsText} />
        {spotsData.map((spot) => (
          <div
            key={spot.title}
            className={`${classes.container} ${dark}`}
            ref={spotRef}
            onClick={() => openSpotModal(spot)}
          >
            {spot.title}
          </div>
        ))}
      </div>
    </>
  );
};

export default Spots;
