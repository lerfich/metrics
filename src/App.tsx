import React from "react";
import store, { StoreContext } from "./store";
import "./app.css";
import { ErrorBoundary } from "react-error-boundary";
import {
  BrowserRouter as Router,
  // Switch,
  Route,
  Redirect,
} from "react-router-dom";
import NavBar from "./shared/components/navigation/NavBar/navBar";
import AddCase from "./features/collection/components/AddCase";
import Cases from "./features/collection/components/SavedCases";
import { ErrorFallback } from "./shared/components/ui";
import { APP_URL } from "shared/components/navigation/constants";
import { ActualCasePage } from "features/analysis/pages/ActualCasePage";
import { RouterSwitchSymbol } from "shared/symbols/RouterSwitchSymbol";
import { InvalidPage } from "shared/components/navigation/InvalidPage";
import { ActualCaseAnalysis } from "features/analysis/components/ActualCaseAnalysis";

export const App: React.FC = () => {
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
                      <AddCase />
                    </Route>
                    <Route path={APP_URL.savedCases} exact>
                      <Cases />
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
