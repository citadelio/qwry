import {
  DECREASE_PROGESS,
  DECREASE_DURATION,
  SAVE_PRIMARY_WORD,
  SAVE_SECONDARY_WORD,
  SAVE_ANSWER,
  SAVE_SHUFFLED_WORD,
  SET_DEFINITION,
  SET_MODE,
  SET_POINT,
  SET_LEVEL,
  SET_TARGET,
  RESET_DURATION,
  SET_SYNONYM,
  API_TRIAL
} from "../actions/actionTypes";

export const decreaseProgressAction = currentProgress => {
  return {
    type: DECREASE_PROGESS,
    payload: Math.min(currentProgress - 1, 100)
  };
};

export const decreaseDurationAction = currentDuration => {
  return {
    type: DECREASE_DURATION,
    payload: Math.floor(currentDuration - 1)
  };
};

export const savePrimaryWordAction = word => {
  return {
    type: SAVE_PRIMARY_WORD,
    payload: word
  };
};

export const saveSecondaryWordAction = word => {
  return {
    type: SAVE_SECONDARY_WORD,
    payload: word
  };
};

export const saveAnswerAction = word => {
  return {
    type: SAVE_ANSWER,
    payload: word
  };
};

export const saveShuffledWordAction = word => {
  return {
    type: SAVE_SHUFFLED_WORD,
    payload: word
  };
};

export const setDefinitionAction = definition => {
  return {
    type: SET_DEFINITION,
    payload: definition
  };
};

export const setModeAction = mode => {
  return {
    type: SET_MODE,
    payload: mode
  };
};

export const setPointAction = point => {
  return {
    type: SET_POINT,
    payload: point
  };
};

export const setLevelAction = level => {
  return {
    type: SET_LEVEL,
    payload: level
  };
};

export const setTargetAction = target => {
  return {
    type: SET_TARGET,
    payload: target
  };
};

export const resetDurationAction = () => {
  return {
    type: RESET_DURATION
  };
};

export const setSynonymAction = word => {
  return {
    type: SET_SYNONYM,
    payload: word
  };
};

export const setApiTrialAction = count => {
  return {
    type: API_TRIAL,
    payload: count
  };
};
