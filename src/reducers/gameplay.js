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
  SET_SYNONYM
} from "../actions/actionTypes";

const initialState = {
  duration: 10,
  defaultCompleted: 40,
  completed: 40,
  primaryWord: "",
  secondaryWord: "",
  answer: "",
  shuffledWord: [],
  definition: [],
  mode: "",
  point: 0,
  target: 20,
  level: 1,
  synonym: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DECREASE_PROGESS:
      return {
        ...state,
        completed: action.payload
      };
    case DECREASE_DURATION:
      return {
        ...state,
        duration: action.payload
      };
    case SAVE_PRIMARY_WORD:
      return {
        ...state,
        primaryWord: action.payload
      };
    case SAVE_SECONDARY_WORD:
      return {
        ...state,
        secondaryWord: action.payload
      };
    case SAVE_ANSWER:
      return {
        ...state,
        answer: action.payload
      };
    case SAVE_SHUFFLED_WORD:
      return {
        ...state,
        shuffledWord: action.payload
      };
    case SET_DEFINITION:
      return {
        ...state,
        definition: action.payload
      };
    case SET_MODE:
      if (action.payload !== "play" && action.payload !== "unPause") {
        if (action.payload === "another" || action.payload === "home") {
          return {
            ...state,
            mode: action.payload,
            duration: initialState.duration,
            completed: initialState.completed,
            point: initialState.point,
            level: initialState.level,
            target: initialState.target
          };
        } else {
          return {
            ...state,
            mode: action.payload,
            duration: initialState.duration,
            completed: initialState.completed,
            point: initialState.point,
            target: initialState.target
          };
        }
      } else {
        return {
          ...state,
          mode: action.payload
        };
      }
    case SET_POINT:
      return {
        ...state,
        point: state.point + action.payload
      };
    case SET_LEVEL:
      return {
        ...state,
        level: action.payload
      };
    case SET_TARGET:
      return {
        ...state,
        target: action.payload
      };
    case RESET_DURATION:
      return {
        ...state,
        duration: initialState.duration
      };
    case SET_SYNONYM:
      return {
        ...state,
        synonym: action.payload
      };

    default:
      return state;
  }
};
