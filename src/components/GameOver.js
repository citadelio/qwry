import React, { useEffect, useState } from "react";
import {
  CssBaseline,
  Container,
  Fab,
  Button,
  Snackbar,
  IconButton
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { PlayCircleOutline, Close, VolumeUp } from "@material-ui/icons";
import { connect } from "react-redux";
import {
  changeScreenAction,
  changeSoundAction,
  changePauseAction,
  changeGamePreview
} from "../actions/settingsActions";
import { setModeAction } from "../actions/gameplayActions";

import backgroundImage from "../assets/background_images/purple-v.jpg";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  overlay: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    width: "100%",
    position: "absolute",
    zIndex: -1
  },
  soverlay: {
    height: "100vh",
    width: "100%",
    position: "absolute",
    backgroundColor: "#0b0e1c",
    opacity: 0.8,
    zIndex: -1
  },
  gameName: {
    color: "ghostwhite",
    marginTop: 0,
    lineHeight: 1,
    fontSize: "3rem",
    fontFamily: "PT Serif"
  },
  button: {
    color: "ghostwhite"
  },
  subtitle: {
    fontSize: "1rem",
    float: "right",
    color: "#cbcbce",
    fontStyle: "italic",
    fontFamily: "PT Serif"
  },
  close: {
    padding: theme.spacing(0.5)
  },
  info: {
    backgroundColor: theme.palette.primary.main
  }
}));

const GameOver = ({
  changeScreen,
  settings,
  changeSound,
  togglePause,
  changePreview,
  setMode
}) => {
  const classes = useStyles();
  const [showSoundNotificaation, setShowSoundNotificaation] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSoundNotificaation(false);
  };

  const addSound = () => {
    changeSound(settings.sound);
    setShowSoundNotificaation(false);
  };

  useEffect(() => {
    setTimeout(() => {
      if (!settings.sound) {
        setShowSoundNotificaation(true);
        //set sound nofit to true
      }
    }, 2000);
  }, []);
  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.overlay}></div>
      <div className={classes.soverlay}></div>
      <Container fixed style={styles.container}>
        <div className="title" style={{ textAlign: "center" }}>
          <h1 className={classes.gameName}>Game Over</h1>
        </div>

        <Fab
          variant="extended"
          size="large"
          color="primary"
          aria-label="Play again"
          className={classes.margin}
          onClick={() => {
            changeScreen("restart");
            setMode("restart");
          }}
        >
          <PlayCircleOutline className={classes.extendedIcon} />
          Play Again
        </Fab>
        <Button
          color="primary"
          className={classes.button}
          onClick={() => {
            changeScreen("list");
            changePreview(settings.gamePreview);
            setMode("another");
          }}
        >
          Play Another Game
        </Button>
        <Button
          color="default"
          className={classes.button}
          onClick={() => {
            changeScreen("load");
            changePreview(settings.gamePreview);
            setMode("home");
          }}
        >
          Main Screen
        </Button>
      </Container>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={showSoundNotificaation}
        autoHideDuration={60000}
        onClose={handleClose}
        variant="info"
        className={classes.info}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">Turn on sound</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={addSound}
          >
            <VolumeUp />
          </IconButton>
        ]}
      />
    </React.Fragment>
  );
};

const styles = {
  container: {
    backgroundColor: "transparent",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 0
  }
};

const mapStateToProps = state => ({
  settings: state.settings
});

const mapDispatchToProps = dispatch => ({
  changeScreen: screenType => {
    dispatch(changeScreenAction(screenType));
  },
  changeSound: currentState => {
    dispatch(changeSoundAction(currentState));
  },
  togglePause: currentState => {
    dispatch(changePauseAction(currentState));
  },
  changePreview: previewState => {
    dispatch(changeGamePreview(previewState));
  },
  setMode: mode => {
    dispatch(setModeAction(mode));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameOver);
