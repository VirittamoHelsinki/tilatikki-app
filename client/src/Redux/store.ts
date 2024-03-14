import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import { thunk } from "redux-thunk";
import { rootReducer } from "./Reducers/rootReducer";

// Create an array of middleware, including thunk.
const middleware = [thunk];
// TODO: fix this error
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create the Redux store.
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware)),
);

// Export all the action creators from the `premiseReducer` file as a named export called `actionCreators`.
export * as userActionCreators from "./Reducers/UserReducer/userActions";
export * as premiseActionCreators from "./Reducers/PremiseReducer/premiseActions";
export * as reservationActionCreators from "./Reducers/ReservaitationReducer/reservationActions";
export * as spaceActionCreators from "./Reducers/SpaceReducer/spaceActions";
