import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  ListItemText,
  ListItem,
  List,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide
} from "@material-ui/core";
import { Close, PlayCircleOutlineRounded } from "@material-ui/icons";
import { connect } from "react-redux";
import {
  changeGamePreview,
  changeScreenAction
} from "../actions/settingsActions";
import games from "../games";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    textAlign: "center",
    fontFamily: "PT Serif"
  },
  game_image_div: {
    height: 200,
    backgroundSize: "cover"
  },
  button: {
    width: 100,
    margin: "50px auto"
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const GameDialog = ({ settings, changePreview, changeScreen }) => {
  const classes = useStyles();
  const [gameId, setGameId] = useState(null);
  const [currentGame, setCurrentGame] = useState({
    id: "",
    title: "",
    image_path: "",
    description: ""
  });
  useEffect(() => {
    const selectedGameId = settings.selectedGameId;
    setGameId(selectedGameId);
  }, [settings.selectedGameId]);

  useEffect(() => {
    games.games.map(game => {
      if (game.id === gameId) {
        setCurrentGame(game);
      }
    });
  }, [gameId]);
  function handleClose() {
    changePreview(settings.gamePreview);
  }

  return (
    <div>
      <Dialog
        fullScreen
        open={settings.gamePreview}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              {currentGame.title}
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div
          className={classes.game_image_div}
          style={{ backgroundImage: `url(${currentGame.image_path})` }}
        ></div>
        <List>
          <ListItem>
            <ListItemText
              style={{ textAlign: "justify" }}
              primary={currentGame.description}
              secondary={`played ${Math.floor(Math.random() * 100) +
                Math.floor(Math.random() * 1000)} times`}
            />
          </ListItem>
          <Divider />
        </List>
        <IconButton
          style={{ margin: "auto" }}
          color="primary"
          onClick={handleClose}
          aria-label="play"
          onClick={() => changeScreen("playing")}
        >
          <PlayCircleOutlineRounded
            fontSize="large"
            style={{ fontSize: "6.25rem" }}
          />
        </IconButton>
      </Dialog>
      ;
    </div>
  );
};

const mapStateToProps = state => ({
  settings: state.settings
});

const mapDispatchToProps = dispatch => ({
  changePreview: previewState => {
    dispatch(changeGamePreview(previewState));
  },
  changeScreen: newScreen => {
    dispatch(changeScreenAction(newScreen));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameDialog);
