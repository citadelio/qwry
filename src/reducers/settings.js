import {
  CHANGE_SCREEN,
  TOGGLE_PAUSE,
  TOGGLE_SOUND,
  TOGGLE_PREVIEW,
  SET_GAME
} from "../actions/actionTypes";

const initialState = {
  currentDisplay: "load",
  pauseState: false,
  sound: false,
  gamePreview: false,
  selectedGameId: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SCREEN:
      return {
        ...state,
        currentDisplay: action.payload
      };
    case TOGGLE_PAUSE:
      return {
        ...state,
        pauseState: action.payload
      };
    case TOGGLE_SOUND:
      return {
        ...state,
        sound: action.payload
      };
    case TOGGLE_PREVIEW:
      return {
        ...state,
        gamePreview: action.payload
      };
    case SET_GAME:
      return {
        ...state,
        selectedGameId: action.payload
      };
    default:
      return state;
  }
};
