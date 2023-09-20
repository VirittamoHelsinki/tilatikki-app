// Import the `createStore` and `applyMiddleware` functions from Redux.
import { legacy_createStore as createStore, applyMiddleware } from "redux";

// Import the `thunk` and `logger` middleware from Redux middleware libraries.
import thunk from "redux-thunk";
import logger from 'redux-logger';

// Import the `rootReducer` reducer from the `index` file.
import rootReducer from "./Reducers/index";

// Create an array of middleware, including thunk.
const middleware = [thunk,logger];

//Check if the environment is development.


// Create the Redux store.
export const store = createStore(
  // Use the `rootReducer` reducer.
  rootReducer,
  // Apply the middleware array.
  applyMiddleware(...middleware)
);
