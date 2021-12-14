import { createContext } from 'react';

import {
  CasesModel,
    CreateCaseModel
} from './models';

class GlobalStore {
    models = {
      createCaseModel: new CreateCaseModel(),
      casesModel: new CasesModel(),
    }

    services = {
    }
}

const store = new GlobalStore();

const StoreContext = createContext(store);

export default store;
export { StoreContext };
