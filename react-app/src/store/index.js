import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import gameDetailsReducer from "./gameDetails";
import userTeamsReducer from "./userTeams";
import playersReducer from "./players";
import sessionReducer from "./session";
import statsReducer from "./stats";
import leaguesReducer from "./leagues";
import teamsReducer from "./teams";
import getStartedReducer from "./getStarted";

const rootReducer = combineReducers({
  session: sessionReducer,
  players: playersReducer,
  leagues: leaguesReducer,
  userTeams: userTeamsReducer,
  stats: statsReducer,
  gameDetails: gameDetailsReducer,
  teams: teamsReducer,
  getStarted: getStartedReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;