import React from "react";
import { CssBaseline, Container, Grow } from "@material-ui/core";
import SingleGame from "./SingleGame";
import BottomNav from "./BottomNav";
import MainAppBar from "./AppBar";
import games from "../games";
import GameDialog from "./GameDialog";

const GameList = ({ changeScreen }) => {
  return (
    <React.Fragment>
      <Grow in={true} direction="left" mountOnEnter unmountOnExit>
        <div>
          <MainAppBar />
          <Container fixed style={styles.container}>
            {games.games.map((game, key) => (
              <SingleGame
                key={key}
                id={game.id}
                source={game.image_path}
                title={game.title}
                changeScreen={changeScreen}
              />
            ))}
          </Container>
          <BottomNav />
          <GameDialog />
        </div>
      </Grow>
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
    justifyContent: "flex-start"
  }
};
export default GameList;
