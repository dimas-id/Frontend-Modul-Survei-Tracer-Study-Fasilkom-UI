import React from "react";
import get from "lodash/get";

import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { PersistGate } from "redux-persist/integration/react";
import "normalize.css";

import { history, store, persistor } from "./modules";
import { setAuthToken } from "./modules/api/http";
import { SplashScreen } from "./components/Loading";
import "./App.css";

function setAuthTokenAfterPersist() {
  const token = get(store.getState(), "session.token.access");
  setAuthToken(token);
}

function App(props) {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<SplashScreen />}
        persistor={persistor}
        onBeforeLift={setAuthTokenAfterPersist}
      >
        <ConnectedRouter history={history}>
          <div>hehe</div>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
