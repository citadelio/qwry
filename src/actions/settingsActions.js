import {
  CHANGE_SCREEN,
  TOGGLE_PAUSE,
  TOGGLE_SOUND,
  TOGGLE_PREVIEW,
  SET_GAME
} from "../actions/actionTypes";

export const changeScreenAction = screenType => {
  return {
    type: CHANGE_SCREEN,
    payload: screenType
  };
};

export const changePauseAction = currentState => {
  return {
    type: TOGGLE_PAUSE,
    payload: !currentState
  };
};

export const changeSoundAction = currentState => {
  return {
    type: TOGGLE_SOUND,
    payload: !currentState
  };
};

export const changeGamePreview = currentState => {
  return {
    type: TOGGLE_PREVIEW,
    payload: !currentState
  };
};
export const changeSelectedGameAction = id => {
  return {
    type: SET_GAME,
    payload: id
  };
};
