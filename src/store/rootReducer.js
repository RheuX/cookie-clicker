import { combineReducers } from "redux";
import scoreReducer from './scoreSlice';
import upgradeReducer from "./upgradeSlice";
import gameStateReducer from "./gameStateSlice";
import timerReducer from "./timerSlice";
// defult impoted ??

const rootReducer = combineReducers({
  gameState: gameStateReducer,
  score: scoreReducer,
  upgrade: upgradeReducer,
  timer: timerReducer,
});

export default rootReducer;