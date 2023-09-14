import { Dispatch } from "redux";
import { ActionType } from "./globalTypes"; // Assuming you have your action types defined in a separate file

// Define the action interface for user-related actions
interface Action {
  type: ActionType;
  payload?: any;
}

export const clearAlert = () => {
  return (dispatch: Dispatch<Action>) => {
    setTimeout(() => {
      dispatch({ type: ActionType.CLEAR_ALERT });
    }, 3000);
  };
};

export const displayAlert = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.DISPLAY_ALERT });
    clearAlert()(dispatch);
  };
};
