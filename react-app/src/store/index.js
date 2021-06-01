import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from "redux-thunk";
import gameDetailsReducer from "./gameDetails";
import userTeamReducer from "./userTeam";
import playersReducer from "./players";
import sessionReducer from "./session";
import statsReducer from "./stats";
import leagueReducer from "./leagues";
import teamsReducer from "./teams";

const rootReducer = combineReducers({
  session: sessionReducer,
  players: playersReducer,
  leagues: leagueReducer,
  userTeam: userTeamReducer,
  stats: statsReducer,
  gameDetails: gameDetailsReducer,
  teams: teamsReducer,
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