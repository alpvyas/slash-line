import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
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

const persistConfig = {
  key: "root",
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const configureStore = (preloadedState) => {
  return createStore(persistedReducer, preloadedState, enhancer);
};

const store = configureStore();

export const persistor = persistStore(store)

if (process.env.NODE_ENV !== 'production') {

  window.store = store;
}

export default configureStore;