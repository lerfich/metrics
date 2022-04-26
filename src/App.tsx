import ExpertResearcherPage from "./Pages/expertResearcher";
import store, { StoreContext } from "./store";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import LuxonUtils from "@date-io/luxon";

const App = () => {
  return (
    <StoreContext.Provider value={store}>
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <div className="app">
          <ExpertResearcherPage />
        </div>
      </MuiPickersUtilsProvider>
    </StoreContext.Provider>
  );
};

export default App;
