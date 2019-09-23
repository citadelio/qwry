import React, { useState, useEffect } from "react";
import rw from "random-words";
import dotenv from "dotenv";
import { connect } from "react-redux";

import LoadScreen from "./components/LoadScreen";
import GamesList from "./components/GamesList";
import Game from "./components/games";
import Complete from "./components/Complete";
import GameOver from "./components/GameOver";
import AppEnvironment from "./components/AppEnvironment";

const App = ({ setting }) => {
  useEffect(() => {
    sessionStorage.setItem("display", setting.currentDisplay);
  }, [setting.currentDisplay]);

  if (setting.currentDisplay === "load") {
    return (
      <AppEnvironment>
        <LoadScreen />
      </AppEnvironment>
    );
  } else if (setting.currentDisplay === "list") {
    return (
      <AppEnvironment>
        <GamesList />
      </AppEnvironment>
    );
  } else if (
    setting.currentDisplay === "playing" ||
    setting.currentDisplay === "restart" ||
    setting.currentDisplay === "next" ||
    setting.currentDisplay === "switch"
  ) {
    return (
      <AppEnvironment>
        <Game />
      </AppEnvironment>
    );
  } else if (setting.currentDisplay === "over") {
    return (
      <AppEnvironment>
        <GameOver />
      </AppEnvironment>
    );
  } else if (setting.currentDisplay === "complete") {
    return (
      <AppEnvironment>
        <Complete />
      </AppEnvironment>
    );
  }
};

const mapStateToProps = state => ({
  setting: state.settings
});
export default connect(mapStateToProps)(App);
