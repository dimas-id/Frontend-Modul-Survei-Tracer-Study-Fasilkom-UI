// redux and storage
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import ReactGA from "react-ga";

// routing
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

// reducer
import { sessionReducer } from "./session";
import { experienceReducer } from "./experience";
import { utilityReducer, utilityActions } from "./utility";
import { crmReducer } from "./crm";

// middleware
import loggerMiddleware from "./middlewares/logger";
import errorMiddleware from "./middlewares/error";
import atlasV1 from "./api/atlas/v1";
import atlasV2 from "./api/atlas/v2";
import heliosV1 from "./api/helios/v1";

// config
import { isDevelopment } from "../config";

const composeEnhancers =
  (isDevelopment && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL,
});

if (!isDevelopment) {
  history.listen(function(location) {
    ReactGA.pageview(location.pathname + location.search);
  });
}

const rootReducer = combineReducers({
  session: persistReducer({ key: "session", storage }, sessionReducer),
  experience: persistReducer({ key: "experience", storage }, experienceReducer),
  crm: persistReducer({ key: "crm", storage }, crmReducer),
  utility: utilityReducer,
  router: connectRouter(history),
});

const middlewares = [
  errorMiddleware,
  thunk.withExtraArgument({
    // add extra argument from others
    API: {
      atlasV1,
      atlasV2,
      heliosV1,
    },
    utility: utilityActions,
  }),
  routerMiddleware(history),
];

const devMiddleware = [loggerMiddleware];
if (isDevelopment) {
  middlewares.push(...devMiddleware);
}

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);
