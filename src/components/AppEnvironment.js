import React, { Fragment, useEffect } from "react";
import backgroundSound from "../assets/sounds/backgroundsound.mp3";
// import changeLevel from "../assets/sounds/ChangeLevel.mp3";
// import click from "../assets/sounds/Click3.mp3";
import { connect } from "react-redux";
const AppEnvironment = ({ settings, children }) => {
  useEffect(() => {
    if (
      settings.sound &&
      (settings.currentDisplay !== "playing" &&
        settings.currentDisplay !== "next" &&
        settings.currentDisplay !== "switch")
    ) {
      document.getElementById("bgsound").play();
    } else {
      document.getElementById("bgsound").pause();
    }
  });

  return (
    <Fragment>
      {children}
      <audio src={backgroundSound} loop id="bgsound" />
      {/* <audio src={click} id="clicksound" /> */}
      {/* <audio src={changeLevel} id="changeLevelsound" /> */}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(mapStateToProps)(AppEnvironment);
