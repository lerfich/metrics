import React from "react";
import store, { StoreContext } from "./store";
import "./app.css";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./shared/components/ui/NavBar/navBar";
import AddCase from "./features/collection/components/AddCase";
import Cases from "./features/collection/components/Cases";
import { ErrorFallback } from "./shared/components/ui";

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
              <Switch>
                <Route path="/add">
                  <AddCase />
                </Route>
                <Route path="/cases">
                  <Cases />
                </Route>
              </Switch>
            </Router>
          </ErrorBoundary>
        </div>
      </div>
    </StoreContext.Provider>
  );
};
