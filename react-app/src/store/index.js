import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import myTeamReducer from "./myTeam";
import playersReducer from "./players";
import sessionReducer from "./session";
import statsReducer from "./stats";

const rootReducer = combineReducers({
  session: sessionReducer,
  players: playersReducer,
  userTeam: myTeamReducer,
  stats: statsReducer,
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

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {

  window.store = store;
}

export default configureStore;