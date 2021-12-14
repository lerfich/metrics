import { createContext } from 'react';

import {
    CreateCaseModel
} from './models';

class GlobalStore {
    models = {
      createCaseModel: new CreateCaseModel(),
    }

    services = {
    }
}

const store = new GlobalStore();

const StoreContext = createContext(store);

export default store;
export { StoreContext };
