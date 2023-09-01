// Import the `combineReducers` function from Redux.
import { combineReducers } from "redux";

// Import the `reducer` function from the `premiseReducer` file.
import reducer from "./premiseReducer";

// Create a new reducer called `rootReducer`.
const rootReducer = combineReducers({
  Data: reducer
});

// Export the `rootReducer` function.
export default rootReducer;

// Export the type of the Redux store state as `RootState`.
export type RootState = ReturnType<typeof rootReducer>;