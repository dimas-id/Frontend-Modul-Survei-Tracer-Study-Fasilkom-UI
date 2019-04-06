// redux and storage
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

// routing
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

// reducer
import sessionReducer from "./session";
import experienceReducer from "./experience";
import utilityReducer, { utilityActions } from "./utility";

// middleware
import { loggerMiddleware } from "./logger";
import atlasAPIv1 from "./api/atlas/v1";

// config
import { isDevelopment } from "../config";

const composeEnhancers =
  (isDevelopment && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const history = createBrowserHistory();
const rootReducer = combineReducers({
  session: persistReducer({ key: "session", storage }, sessionReducer),
  experience: persistReducer({ key: "experience", storage }, experienceReducer),
  utility: utilityReducer,
  router: connectRouter(history)
});

const middlewares = [
  thunk.withExtraArgument({
    // add extra argument from others
    atlasAPIv1,
    utilityActions
  }),
  routerMiddleware(history)
];

if (isDevelopment) {
  middlewares.push(loggerMiddleware);
}

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);

window.alertDialog = function(title, message, onPositive, onNegative) {
  store.dispatch(
    utilityActions.showAlert(title, message, onPositive, onNegative)
  );
};
