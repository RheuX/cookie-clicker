import { combineReducers } from "redux";
import scoreReducer from './scoreSlice';
import upgradeReducer from "./upgradeSlice";
import gameStateReducer from "./gameStateSlice";
// defult impoted ??

const rootReducer = combineReducers({
  gameState: gameStateReducer,
  score: scoreReducer,
  upgrade: upgradeReducer,
});

export default rootReducer;