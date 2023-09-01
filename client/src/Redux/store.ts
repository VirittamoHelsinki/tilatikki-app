// Import the `createStore` and `applyMiddleware` functions from Redux.
import { createStore, applyMiddleware } from "redux";

// Import the `thunk` and `logger` middleware from Redux middleware libraries.
import thunk from "redux-thunk";
import logger from 'redux-logger';

// Import the `rootReducer` reducer from the `index` file.
import rootReducer from "./Reducer/index";

// Create an array of middleware, including thunk.
const middleware = [thunk,logger];

//Check if the environment is development.
if (process.env.NODE_ENV === "development") {
  // Add the logger middleware to the middleware array.
  middleware.push(logger);
}

// Create the Redux store.
export const store = createStore(
  // Use the `rootReducer` reducer.
  rootReducer,
  // Apply the middleware array.
  applyMiddleware(...middleware)
);