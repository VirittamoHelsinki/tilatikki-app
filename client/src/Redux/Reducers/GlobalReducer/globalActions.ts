import { Dispatch } from "redux";
import { ActionType } from "./globalTypes"; // Assuming you have your action types defined in a separate file

// Define the action interface for user-related actions
interface Action<Payload> {
  type: ActionType;
  payload?: Payload;
}

export function clearAlert<Payload>() {
  return (dispatch: Dispatch<Action<Payload>>) => {
    setTimeout(() => {
      dispatch({ type: ActionType.CLEAR_ALERT });
    }, 3000);
  };
}

export function displayAlert<Payload>() {
  return (dispatch: Dispatch<Action<Payload>>) => {
    dispatch({ type: ActionType.DISPLAY_ALERT });
    clearAlert()(dispatch);
  };
}
