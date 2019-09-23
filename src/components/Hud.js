import React, { useState, useEffect } from "react";
import {
  Grid,
  IconButton,
  LinearProgress,
  Snackbar,
  SnackbarContent
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { PauseCircleOutlineRounded } from "@material-ui/icons";
import { amber, green } from "@material-ui/core/colors";
import clsx from "clsx";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { connect } from "react-redux";
import {
  changePauseAction,
  changeScreenAction
} from "../actions/settingsActions";
import {
  decreaseProgressAction,
  decreaseDurationAction,
  resetDurationAction
} from "../actions/gameplayActions";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  },
  chip: {
    margin: theme.spacing(1)
  },
  fab: {
    margin: theme.spacing(1),
    fontSize: "1.2rem",
    height: 42,
    width: 42
  },

  fab_block: {
    borderRadius: 0,
    margin: theme.spacing(1),
    fontSize: "1.2rem",
    height: 42,
    width: 42
  },
  output_box: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    margin: "15px 0",
    fontSize: "3rem"
  },
  output_item: {
    border: "1px solid #ccc",
    padding: "5px 10px",
    fontSize: "1.75rem"
  },
  input_box: {
    position: "absolute",
    bottom: 60,
    width: "100%"
  },
  input_container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.main
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
}));

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const MySnackbarContentWrapper = props => {
  const classes = useStyles();
  const { className, message, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      {...other}
    />
  );
};

const Hud = ({
  settings,
  gameplay,
  togglePause,
  decreaseProgress,
  decreaseDuration,
  changeScreen,
  resetDuration
}) => {
  const [successSnackbar, setSuccessSnackbar] = useState(false);
  const [incorrectSnackbar, setIncorrectSnackbar] = useState(false);

  const normalise = value =>
    ((value - 0) * 100) / (gameplay.defaultCompleted - 0);

  useEffect(() => {
    function progress() {
      if (!settings.pauseState) {
        if (gameplay.completed > 0) {
          decreaseProgress(gameplay.completed);
        } else {
          //game over
          changeScreen("over");
          clearInterval(timers);
        }
        //fire action to decrase completed

        function duration() {
          if (!settings.pauseState) {
            if (gameplay.duration > 0) {
              decreaseDuration(gameplay.duration);
            } else {
              //show error snackbar
              setIncorrectSnackbar(true);
              let switchScreen = "next";
              if (settings.currentDisplay === "next") {
                switchScreen = "switch";
              } else if (settings.currentDisplay === "switch") {
                switchScreen = "next";
              }
              changeScreen(switchScreen);
              resetDuration();
            }
          }
        }
        duration();
      }
    }
    let timers;
    if (settings.selectedGameId === 2) {
      if (gameplay.definition.length > 0) timers = setInterval(progress, 1000);
    } else if (settings.selectedGameId === 3) {
      if (gameplay.synonym !== "") timers = setInterval(progress, 1000);
    } else {
      timers = setInterval(progress, 1000);
    }
    return () => {
      clearInterval(timers);
    };
  }, [gameplay.completed, gameplay.duration, gameplay.definition]);

  return (
    <React.Fragment>
      {
        <React.Fragment>
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={successSnackbar}
            autoHideDuration={1500}
            onClose={() => setSuccessSnackbar(false)}
          >
            <MySnackbarContentWrapper variant="success" message="Correct!" />
          </Snackbar>
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={incorrectSnackbar}
            autoHideDuration={1500}
            onClose={() => setIncorrectSnackbar(false)}
          >
            <MySnackbarContentWrapper
              variant="error"
              message={`Sorry, Time Up! `}
              // message={`Time Up! correct answer is ${gameplay.primaryWord.toUpperCase()}`}
            />
          </Snackbar>
        </React.Fragment>
      }

      <Grid container spacing={1} style={styles.outline}>
        <Grid item xs={4} style={styles.item}>
          <IconButton
            aria-label="pause"
            style={styles.pauseBtn}
            onClick={() => togglePause(settings.pauseState)}
          >
            <PauseCircleOutlineRounded />
          </IconButton>
          <small style={styles.subtitle}>Point</small>
          {gameplay.point}
        </Grid>
        <Grid item xs={4} style={styles.item}>
          <small style={styles.subtitle}>Time</small>:
          {gameplay.duration.toString().padStart(2, 0)}
        </Grid>
        <Grid item xs={4} style={styles.item}>
          <small style={styles.subtitle}>Target</small>
          {gameplay.target * gameplay.level}
        </Grid>
      </Grid>

      <LinearProgress
        style={styles.progress}
        variant="determinate"
        value={normalise(gameplay.completed)}
        color={
          gameplay.completed < 0.3 * gameplay.defaultCompleted
            ? "secondary"
            : "primary"
        }
      />
    </React.Fragment>
  );
};

const styles = {
  outline: {
    border: "1px solid #a0a0a0",
    borderRadius: 5,
    padding: 10,
    textAlign: "center",
    fontSize: "1.75rem",
    position: "relative"
  },
  item: {
    padding: 4,
    border: "3px solid #3f51b5"
  },
  pauseBtn: {
    top: 0,
    left: 0,
    padding: 6,
    position: "absolute",
    backgroundColor: "rgb(207, 232, 252)",
    color: "#000000b5"
  },
  subtitle: {
    color: "rgb(74, 72, 72)",
    display: "block",
    fontSize: "0.7rem"
  },
  progress: {
    width: "100%",
    margin: "15px 0",
    height: 10
  }
};

const mapStateToProps = state => ({
  settings: state.settings,
  gameplay: state.gameplay
});
const mapDispatchToProps = dispatch => ({
  togglePause: currentState => {
    dispatch(changePauseAction(currentState));
  },
  decreaseProgress: currentState => {
    dispatch(decreaseProgressAction(currentState));
  },
  decreaseDuration: currentDuration => {
    dispatch(decreaseDurationAction(currentDuration));
  },
  changeScreen: newScreen => {
    dispatch(changeScreenAction(newScreen));
  },
  resetDuration: () => {
    dispatch(resetDurationAction());
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hud);
