import ExpertResearcherPage from "./Pages/expertResearcher";
import store, { StoreContext } from "./store";

function App() {
  return (
    <StoreContext.Provider value={store}>
      <div className="app">
        <ExpertResearcherPage />
      </div>
    </StoreContext.Provider>
  );
}

export default App;