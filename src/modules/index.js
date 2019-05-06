// redux and storage
import {createStore, applyMiddleware, combineReducers, compose} from "redux";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

// routing
import {connectRouter, routerMiddleware} from "connected-react-router";
import {createBrowserHistory} from "history";

// reducer
import {sessionReducer} from "./session";
import {experienceReducer} from "./experience";
import {utilityReducer, utilityActions} from "./utility";
import {mailerReducer} from "./mailer";

// middleware
import loggerMiddleware from "./middlewares/logger";
import errorMiddleware from "./middlewares/error";
import atlasAPIv1 from "./api/atlas/v1";
import heliosAPIv1 from "./api/helios/v1";

// config
import {isDevelopment} from "../config";

const composeEnhancers =
  (isDevelopment && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const history = createBrowserHistory();
const rootReducer = combineReducers({
  session: persistReducer({key: "session", storage}, sessionReducer),
  experience: persistReducer({key: "experience", storage}, experienceReducer),
  mailer: mailerReducer,
  utility: utilityReducer,
  router: connectRouter(history),
});

const middlewares = [
  errorMiddleware,
  thunk.withExtraArgument({
    // add extra argument from others
    API: {
      atlasV1: atlasAPIv1,
      heliosV1: heliosAPIv1,
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
