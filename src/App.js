import React from "react";
import get from "lodash/get";
import * as Sentry from "@sentry/browser";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { PersistGate } from "redux-persist/integration/react";
import { MuiThemeProvider } from "@material-ui/core/styles";

import { setAuthToken } from "./libs/http";
import { history, store, persistor } from "./modules";
import { createGlobalDialog, createGlobalSnackbar } from "./modules/utility";

import AlertDialog from "./components/Alert";
import { SnackbarNotifier, SnackbarProvider } from "./components/Snackbar";
import { SplashScreen } from "./components/Loading";

import Pages from "./pages";
import { theme } from "./styles";
import { isDevelopment } from "./config";

createGlobalDialog(store);
createGlobalSnackbar(store);

function setAuthTokenAfterPersist() {
  const token = get(store.getState(), "session.token.access");
  setAuthToken(token);
}

class App extends React.PureComponent {
  componentDidCatch(error, errorInfo) {
    // default scope
    if (!isDevelopment) {
      Sentry.withScope(scope => {
        scope.setExtras(errorInfo);
        Sentry.captureException(error);
      });
    }
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate
          loading={<SplashScreen />}
          persistor={persistor}
          onBeforeLift={setAuthTokenAfterPersist}
        >
          <MuiThemeProvider theme={theme}>
            <SnackbarProvider>
              <ConnectedRouter history={history}>
                <Pages />
              </ConnectedRouter>
              <AlertDialog />
              <SnackbarNotifier />
            </SnackbarProvider>
          </MuiThemeProvider>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
