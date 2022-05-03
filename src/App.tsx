import React from "react";
import store, { StoreContext } from "./store";
import "./app.css";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import NavBar from "./shared/components/navigation/NavBar/navBar";
import { ErrorFallback } from "./shared/components/ui";
import { APP_URL } from "shared/components/navigation/constants";
import { ActualCasePage } from "features/analysis/pages/ActualCasePage";
import { RouterSwitchSymbol } from "shared/symbols/RouterSwitchSymbol";
import { AddCasePage } from "features/collection/pages/AddCasePage";
import { SavedCasesPage } from "features/collection/pages/SavedCasesPage";
import { useSnackbar } from "notistack";

export const App: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  return (
    <StoreContext.Provider value={store}>
      <div className="app">
        <div className="expert-researcher-page">
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={(e) => console.log(e)}
          >
            <Router>
              <NavBar />
              <RouterSwitchSymbol
                routes={
                  <React.Fragment>
                    <Route path={APP_URL.addCase} exact>
                      <AddCasePage />
                    </Route>
                    <Route path={APP_URL.savedCases} exact>
                      <SavedCasesPage />
                    </Route>
                    <Route
                      path={[APP_URL.actualCase, APP_URL.actualCaseAnalysis]}
                      exact
                    >
                      <ActualCasePage />
                    </Route>
                  </React.Fragment>
                }
              />
              <Redirect to={APP_URL.invalidPage} />
            </Router>
          </ErrorBoundary>
        </div>
      </div>
    </StoreContext.Provider>
  );
};
