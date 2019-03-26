import React from "react";
import get from "lodash/get";

import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { PersistGate } from "redux-persist/integration/react";
import { MuiThemeProvider } from "@material-ui/core/styles";

import { history, store, persistor } from "./modules";
import { setAuthToken } from "./modules/api/http";
import { SplashScreen } from "./components/Loading";

import Pages from "./pages";
import { theme } from "./styles";
import "./App.css";

function setAuthTokenAfterPersist() {
  const token = get(store.getState(), "session.token.access");
  setAuthToken(token);
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<SplashScreen />}
        persistor={persistor}
        onBeforeLift={setAuthTokenAfterPersist}
      >
        <MuiThemeProvider theme={theme}>
          <ConnectedRouter history={history}>
            <Pages />
          </ConnectedRouter>
        </MuiThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
