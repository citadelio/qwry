import React, { useState, useEffect } from "react";
import { CssBaseline, Container, Slide } from "@material-ui/core";
import BottomNav from "./BottomNav";
import Hud from "./Hud";
import PauseDialog from "./PauseDialog";

const GameEnvironment = ({ children }) => {
  useEffect(() => {
    document.getElementById("bgsound").pause();
  }, []);
  return (
    <React.Fragment>
      <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <div>
          <Container fixed style={styles.container}>
            <Hud />
            {children}
            <PauseDialog />
          </Container>
          <BottomNav />
        </div>
      </Slide>
    </React.Fragment>
  );
};

const styles = {
  container: {
    backgroundColor: "#cfe8fc",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    padding: 15,
    alignItems: "center",
    justifyContent: "flex-start",
    position: "relative"
  }
};
export default GameEnvironment;
