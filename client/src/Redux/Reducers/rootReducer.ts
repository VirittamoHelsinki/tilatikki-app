// Import the `combineReducers` function from Redux.
import { combineReducers } from "redux";

// Import the `reducer` function from the `premiseReducer` file.
import premiseReducer from "./PremiseReducer/premiseReducer";
import userReducer from "./UserReducer/userReducer";
import reservationReducer from "./ReservaitationReducer/reservationReducer";
import spaceReducer from "~/Redux/Reducers/SpaceReducer/spaceReducer";

// Create a new reducer called `rootReducer`.
export const rootReducer = combineReducers({
  premise: premiseReducer,
  user: userReducer,
  reservation: reservationReducer,
  space: spaceReducer,
});

// Export the type of the Redux store state as `RootState`.
export type RootState = ReturnType<typeof rootReducer>;
