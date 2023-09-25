import {store} from './store'

import { persistStore } from "redux-persist";

const persistedStore = persistStore(store);

export default persistedStore;