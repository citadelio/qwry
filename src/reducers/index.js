import { combineReducers } from "redux";
import SettingsReducer from "./settings";
import GamePlayReducers from "./gameplay";

export default combineReducers({
  settings: SettingsReducer,
  gameplay: GamePlayReducers
});
