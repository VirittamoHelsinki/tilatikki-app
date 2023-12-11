import { store } from "./store";

import { persistStore } from "redux-persist";
//@ts-ignore
const persistedStore = persistStore(store);

export default persistedStore;
