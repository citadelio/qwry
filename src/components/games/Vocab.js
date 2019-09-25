import "dotenv/config";
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
import { PlayCircleOutline } from "@material-ui/icons";
import randomWords from "random-words";
import axios from "axios";
import { connect } from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
import GameEnvironment from "../GameEnvironment";
import {
  savePrimaryWordAction,
  saveAnswerAction,
  saveShuffledWordAction,
  setSynonymAction,
  setPointAction,
  resetDurationAction,
  setDefinitionAction,
  setModeAction
} from "../../actions/gameplayActions";

import { changeScreenAction,
  changeGamePreview,
  changeSelectedGameAction} from "../../actions/settingsActions";
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
    height: 45,
    width: "auto",
    display: "block"
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
  const { className, message, action, variant, ...other } = props;
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
      action={action}
      {...other}
    />
  );
};

const Vocab = ({
  settings,
  gameplay,
  savePrimaryWord,
  saveAnswer,
  saveShuffledWord,
  setSynonym,
  setPoint,
  changeScreen,
  resetDuration,
  setDefinition,
  setMode,
  changePreview,
  changeSelectedGame
}) => {
  const classes = useStyles(),
    [loading, setLoading] = useState(true),
    [successSnackbar, setSuccessSnackbar] = useState(false),
    [incorrectSnackbar, setIncorrectSnackbar] = useState(false),
    [currentSynonym, setCurrentSynonym] = useState(""),
    [isOffline, setIsOffline] = useState(false);

  //get another word to shuffle
  const shuffleArray = array => {
    return array
      .map(a => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map(a => a.value);
  };
  const handleClick = e => {
    saveAnswer(e.target.textContent);
    const checkForAnswer = checkAnswer(e.target.textContent);
    if (checkForAnswer) {
      e.target.backgroundColor = "green";
    } else {
      e.target.backgroundColor = "red";
    }
  };

  const hasTargetBeenHit = () => {
    if (
      gameplay.point >=
      gameplay.target + (gameplay.level + (gameplay.level - 1)) * 10 - 10
    ) {
      changeScreen("complete");
    }
  };
  const checkAnswer = word => {
    if (gameplay.synonym === word) {
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
      return true;
    } else {
      let switchScreen = "next";
      if (settings.currentDisplay === "next") {
        switchScreen = "switch";
      } else if (settings.currentDisplay === "switch") {
        switchScreen = "next";
      }
      setIncorrectSnackbar(true);
      changeScreen(switchScreen);
      setLoading(true);
      resetDuration();
      return false;
    }
  };
  const getSynonym = async word => {
    if(!count){ let count = 1}
    console.log("Amount of try is "+count)
    try {
      const res = await axios.get(
        `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${process.env.REACT_APP_THESAURUS_KEY}`
      );
      if (!isNull(res.data[0].meta.syns[0][0])) {
        await setSynonym(res.data[0].meta.syns[0][0]);
        await setDefinition(res.data[0].shortdef);
        await setLoading(false);
        const respp = res.data[0].meta.syns[0][0];
        // return respp;
        const threeWords = randomWords(3);
        count = 0
        threeWords.push(respp);

        shuffleWords(threeWords);
      } else {
        count = 0
        getAndSetWords();
      }
    } catch (error) {
      count++
      
      if(count >= 50)
      {
      setSynonym("");
      setIsOffline(true);
      return;
      }else{
      getAndSetWords();
      }
    }
  };

  const getAndSetWords = () => {
    //generate primary and secondary word
    const primaryWord = randomWords();
    //save primary and secondary word
    savePrimaryWord(primaryWord);
    //get Definition
    getSynonym(primaryWord);
  };

  const shuffleWords = word => {
    const shuffledWord = shuffleArray(word);
    saveShuffledWord(shuffledWord);
  };
  useEffect(() => {
    if (gameplay.mode === "play") {
      setLoading(false);
      setMode("unPause");
      return;
    } else {
      //get and Set Words
      getAndSetWords();
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
            <MySnackbarContentWrapper variant="success" message="Correct!" action={} />
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
            <MySnackbarContentWrapper variant="error" message="Incorrect!"/>
          </Snackbar>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            open={isOffline}
            autoHideDuration={1500}
            onClose={() =>setIsOffline(false)}
          >
            <MySnackbarContentWrapper
              variant="error"
              message="Network issues!, An active internet connection is required. Click the icon to play the Scrambled Words game which works offline."
              action={[
                <IconButton
                  key="play"
                  aria-label="play"
                  color="inherit"
                  className={classes.close}
                  onClick={()=>{ 
                    changePreview(false);
                    changeSelectedGame("1");
                  }}
                >
                  <PlayCircleOutline />
                </IconButton>
              ]}
            />
          </Snackbar>
        </React.Fragment>
      }
      {loading ? (
        <Skeleton variant="rect" width="100%" height={118} />
      ) : (
        // <Paper className={classes.root} style={{ padding: 15 }}>
        <Typography component="div">
          <h1>{gameplay.primaryWord.toUpperCase()}</h1>
        </Typography>
        // </Paper>
      )}

      {/* {loading ? (
        <Skeleton height={10} width="40%" />
      ) : (
        <Chip
          label={`Def: ${gameplay.definition[0]}`}
          className={classes.chip}
          variant="outlined"
          style={{ flexWrap: "wrap" }}
        />
      )} */}

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
            style={{ position: "absolute", bottom: "225px" }}
          />
          <Skeleton
            variant="rect"
            width="85%"
            height={30}
            style={{ position: "absolute", bottom: "175px" }}
          />
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
          <Container
            className={classes.input_container}
            style={{ display: "flex", flexDirection: "column" }}
          >
            {gameplay.shuffledWord.map((word, key) => (
              <Fab
                color="primary"
                key={key}
                aria-label={word}
                className={classes.fab_block}
                onClick={handleClick}
              >
                {word}
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
  saveAnswer: word => {
    dispatch(saveAnswerAction(word));
  },
  saveShuffledWord: word => {
    dispatch(saveShuffledWordAction(word));
  },
  setSynonym: word => {
    dispatch(setSynonymAction(word));
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
  setDefinition: definition => {
    dispatch(setDefinitionAction(definition));
  },
  setMode: mode => {
    dispatch(setModeAction(mode));
  },
  changePreview: previewState => {
    dispatch(changeGamePreview(previewState));
  },
  changeSelectedGame: id => {
    dispatch(changeSelectedGameAction(id));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Vocab);
