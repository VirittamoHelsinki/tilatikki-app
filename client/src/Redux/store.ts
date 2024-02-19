// Import the `createStore` and `applyMiddleware` functions from Redux.
import { legacy_createStore as createStore, applyMiddleware } from "redux";

// Import the `thunk` and `logger` middleware from Redux middleware libraries.
import { thunk } from "redux-thunk";
import logger from "redux-logger";

// Import the `rootReducer` reducer from the `index` file.
import { rootReducer } from "./Reducers/rootReducer";

// Create an array of middleware, including thunk.
const middleware = [thunk, logger];

// Create the Redux store.
export const store = createStore(rootReducer, applyMiddleware(...middleware));

// Export all the action creators from the `premiseReducer` file as a named export called `actionCreators`.
export * as userActionCreators from "./Reducers/UserReducer/userActions";
export * as premiseActionCreators from "./Reducers/PremiseReducer/premiseActions";
