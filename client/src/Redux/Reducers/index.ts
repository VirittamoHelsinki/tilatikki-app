// Import the `combineReducers` function from Redux.
import { combineReducers } from "redux";

// Import the `reducer` function from the `premiseReducer` file.
import premiseReducer from "./PremiseReducer/premiseReducer";
import userReducer from "./UserReducer/userReducer";

// Create a new reducer called `rootReducer`.
const rootReducer = combineReducers({
  premise: premiseReducer,
  user: userReducer
});

// Export the `rootReducer` function.
export default rootReducer;

// Export the type of the Redux store state as `RootState`.
export type RootState = ReturnType<typeof rootReducer>;