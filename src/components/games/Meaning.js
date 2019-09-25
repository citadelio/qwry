import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Typography,
  Chip,
  Fab,
  Container,
  Snackbar,
  SnackbarContent
} from "@material-ui/core";
import { amber, green } from "@material-ui/core/colors";
import clsx from "clsx";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { BackspaceRounded } from "@material-ui/icons";
import randomWords from "random-words";
import axios from "axios";
import { connect } from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
import GameEnvironment from "../GameEnvironment";
import {
  savePrimaryWordAction,
  saveSecondaryWordAction,
  saveAnswerAction,
  saveShuffledWordAction,
  setDefinitionAction,
  setPointAction,
  resetDurationAction,
  setModeAction
} from "../../actions/gameplayActions";

import { changeScreenAction } from "../../actions/settingsActions";
import { isNull } from "util";
// dotenv.config();

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

const Meaning = ({
  settings,
  gameplay,
  savePrimaryWord,
  saveSecondaryWord,
  saveAnswer,
  saveShuffledWord,
  setDefinition,
  setPoint,
  changeScreen,
  resetDuration,
  setMode
}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [successSnackbar, setSuccessSnackbar] = useState(false);
  const [incorrectSnackbar, setIncorrectSnackbar] = useState(false);

  //get another word to shuffle
  const shuffleArray = array => {
    return array
      .map(a => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map(a => a.value);
  };
  const handleClick = e => {
    saveAnswer(gameplay.answer + e.target.textContent);
    if (gameplay.answer.length === gameplay.primaryWord.length - 1) {
      checkAnswer(gameplay.answer + e.target.textContent);
    }
    // const newShuffle = gameplay.shuffledWord.filter(letter => {
    //   return letter !== e.target.textContent;
    // });
    gameplay.shuffledWord.splice(
      gameplay.shuffledWord.indexOf(e.target.textContent),
      1
    );
    let reshuffle = shuffleArray(gameplay.shuffledWord);
    saveShuffledWord(reshuffle);
    // e.target.parentNode.parentNode.removeChild(e.target.parentNode);
  };

  const hasTargetBeenHit = () => {
    if (gameplay.point >= (gameplay.target) + (((gameplay.level) + (gameplay.level -1)) * 10 ) - 10) {
      changeScreen("complete");
    }
  };
  const checkAnswer = word => {
    if (gameplay.primaryWord === word) {
      setSuccessSnackbar(true);
      let switchScreen = "next";
      if (settings.currentDisplay === "next") {
        switchScreen = "switch";
      } else if (settings.currentDisplay === "switch") {
        switchScreen = "next";
      }
      changeScreen(switchScreen);
      setPoint(10);
      setLoading(true);
      resetDuration();
      hasTargetBeenHit();
    } else {
      setIncorrectSnackbar(true);
    }
  };
  const undoAnswer = () => {
    let last = gameplay.answer.substr(-1);
    let answer = gameplay.answer.slice(0, -1);
    saveAnswer(answer);
    saveShuffledWord([...gameplay.shuffledWord, last]);
  };

  const getDefinition = async word => {
    try {
      const res = await axios.get(
        `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${process.env.REACT_APP_THESAURUS_KEY}`
      );
      if (!isNull(res.data[0].shortdef) && res.data[0].shortdef.length > 0) {
        setDefinition(res.data[0].shortdef);
        setLoading(false);
      } else {
        const { primaryWord, secondaryWord } = getAndSetWords();
        shuffleWords(primaryWord, secondaryWord);
      }
    } catch (error) {
      setDefinition([]);
      const { primaryWord, secondaryWord } = getAndSetWords();
      shuffleWords(primaryWord, secondaryWord);
    }
  };
  const getAndSetWords = () => {
    //generate primary and secondary word
    const primaryWord = randomWords();
    const secondaryWord = randomWords({
      exactly: 1,
      maxLength: 3
    }).toString();
    //save primary and secondary word
    savePrimaryWord(primaryWord);
    saveSecondaryWord(secondaryWord);
    //get Definition
    getDefinition(primaryWord);
    saveAnswer("");
    return { primaryWord, secondaryWord };
  };

  const shuffleWords = (primaryWord, secondaryWord) => {
    const shuffledPrimary = shuffleArray(primaryWord.split(""));
    const shuffledSecondary = shuffleArray(secondaryWord.split(""));
    const combinedArray = [...shuffledPrimary, ...shuffledSecondary];
    saveShuffledWord(combinedArray);
  };
  useEffect(() => {
    if (gameplay.mode === "play") {
      setLoading(false);
      setMode("unPause");
      return;
    } else {
      //get and Set Words
      const { primaryWord, secondaryWord } = getAndSetWords();
      shuffleWords(primaryWord, secondaryWord);
    }
  }, [settings.currentDisplay]);

  return (
    <GameEnvironment>
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
            <MySnackbarContentWrapper variant="error" message="Incorrect!" />
          </Snackbar>
        </React.Fragment>
      }
      {loading ? (
        <Skeleton variant="rect" width="100%" height={118} />
      ) : (
        <Paper className={classes.root} style={{ padding: 15 }}>
          <Typography component="div">
            <ol style={{ margin: 0 }}>
              {gameplay.definition.map((def, key) => (
                <li key={key}>{def}</li>
              ))}
            </ol>
          </Typography>
        </Paper>
      )}

      {loading ? (
        <Skeleton height={10} width="40%" />
      ) : (
        <Chip
          label={`Hint: ${gameplay.primaryWord.length} letters`}
          className={classes.chip}
          variant="outlined"
        />
      )}

      {loading ? (
        <Container>
          <Skeleton
            variant="circle"
            width={40}
            height={40}
            style={{
              position: "absolute",
              right: 0,
              marginRight: 15,
              top: "50%",
              transform: "translateY(-50%)"
            }}
          />
        </Container>
      ) : (
        <div className="undo_btn">
          <Fab
            color="default"
            aria-label="undo"
            style={{ position: "absolute", right: 0, marginRight: 15 }}
            className={classes.fab}
            onClick={undoAnswer}
          >
            <BackspaceRounded />
          </Fab>
        </div>
      )}

      <div className={classes.output_box}>{gameplay.answer.toUpperCase()}</div>

      {loading ? (
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Skeleton
            variant="rect"
            width="85%"
            height={30}
            style={{ position: "absolute", bottom: "125px" }}
          />
          <Skeleton
            variant="rect"
            width="85%"
            height={30}
            style={{ position: "absolute", bottom: "75px" }}
          />
        </Container>
      ) : (
        <div className={classes.input_box}>
          <Container className={classes.input_container}>
            {gameplay.shuffledWord.map((letter, key) => (
              <Fab
                color="primary"
                key={key}
                aria-label={letter}
                className={classes.fab_block}
                onClick={handleClick}
              >
                {letter}
              </Fab>
            ))}
          </Container>
        </div>
      )}
    </GameEnvironment>
  );
};
// };

const mapStateToProps = state => ({
  gameplay: state.gameplay,
  settings: state.settings
});

const mapDispatchToProps = dispatch => ({
  savePrimaryWord: word => {
    dispatch(savePrimaryWordAction(word));
  },
  saveSecondaryWord: word => {
    dispatch(saveSecondaryWordAction(word));
  },
  saveAnswer: word => {
    dispatch(saveAnswerAction(word));
  },
  saveShuffledWord: word => {
    dispatch(saveShuffledWordAction(word));
  },
  setDefinition: definition => {
    dispatch(setDefinitionAction(definition));
  },
  setPoint: point => {
    dispatch(setPointAction(point));
  },
  changeScreen: newScreen => {
    dispatch(changeScreenAction(newScreen));
  },
  resetDuration: () => {
    dispatch(resetDurationAction());
  },
  setMode: mode => {
    dispatch(setModeAction(mode));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Meaning);
