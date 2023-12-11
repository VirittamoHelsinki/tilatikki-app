import { initialState, initialStateProps } from "../initialState";
import { ActionType } from "./globalTypes";

// Define the action interface for user-related actions
interface UserAction<Payload> {
  type: ActionType;
  payload?: Payload;
}

// Main reducer
function userReducer<Payload>(
  state: initialStateProps = initialState,
  action: UserAction<Payload>,
): initialStateProps {
  switch (action.type) {
    case ActionType.DISPLAY_ALERT:
      return {
        ...state,
        showAlert: true,
        alertType: "danger",
        alertText: "Please provide all values!",
      };
    case ActionType.CLEAR_ALERT:
      return {
        ...state,
        showAlert: false,
        alertType: "",
        alertText: "",
      };
    default:
      // For any other action types or when no action type matches, return the current state
      return state;
  }
}

export default userReducer;
