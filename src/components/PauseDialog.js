import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  DialogTitle,
  Dialog,
  Divider
} from "@material-ui/core";
import PlayArrowRounded from "@material-ui/icons/PlayArrowRounded";
import { blue } from "@material-ui/core/colors";
import { connect } from "react-redux";
import {
  changePauseAction,
  changeScreenAction,
  changeGamePreview
} from "../actions/settingsActions";
import { setModeAction } from "../actions/gameplayActions";
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  }
});

function SimpleDialog({
  settings,
  togglePause,
  changeScreen,
  changePreview,
  setMode
}) {
  const classes = useStyles();
  return (
    <Dialog aria-labelledby="simple-dialog-title" open={settings.pauseState}>
      <DialogTitle id="simple-dialog-title">PAUSED</DialogTitle>
      <List>
        <ListItem
          button
          onClick={() => {
            togglePause(settings.pauseState);
            setMode("play");
          }}
        >
          <ListItemAvatar>
            <Avatar>
              <PlayArrowRounded />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Resume" />
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={() => {
            changeScreen("restart");
            togglePause(settings.pauseState);
            setMode("restart");
          }}
        >
          <ListItemText primary="Restart" />
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={() => {
            changeScreen("list");
            changePreview(settings.gamePreview);
            togglePause(settings.pauseState);
            setMode("another");
          }}
        >
          <ListItemText primary="Another Game" />
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={() => {
            changeScreen("load");
            changePreview(settings.gamePreview);
            togglePause(settings.pauseState);
            setMode("home");
          }}
        >
          <ListItemText primary="Main Menu" />
        </ListItem>
      </List>
    </Dialog>
  );
}

const PauseDialog = ({
  settings,
  togglePause,
  changeScreen,
  changePreview,
  setMode
}) => {
  return (
    <div>
      <SimpleDialog
        settings={settings}
        togglePause={togglePause}
        changeScreen={changeScreen}
        changePreview={changePreview}
        setMode={setMode}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  settings: state.settings
});
const mapDispatchToProps = dispatch => ({
  togglePause: currentState => {
    dispatch(changePauseAction(currentState));
  },
  changeScreen: screenType => {
    dispatch(changeScreenAction(screenType));
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
)(PauseDialog);
