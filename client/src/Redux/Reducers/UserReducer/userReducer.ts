import { initialState, initialStateProps } from "../initialState";
import { ActionType } from "./userTypes";

// Define the action interface for user-related actions
interface UserAction {
  type: ActionType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}

// Main reducer
const userReducer = (
  state: initialStateProps = initialState,
  action: UserAction,
): initialStateProps => {
  switch (action.type) {
    case ActionType.LOGIN_USER_BEGINS:
      return {
        ...state,
        isLoading: true,
      };
    case ActionType.LOGIN_USER_SUCCESS:
      return {
        ...state,
        token: action.payload?.token,
        isLoading: false,
      };
    case ActionType.LOGIN_USER_FAILURE:
      return {
        ...state,
        token: "",
        isLoading: false,
        alertType: "danger",
        alertText: action.payload?.message,
      };

    case ActionType.GET_ALL_USERS_BEGINS:
      return {
        ...state,
        isLoading: true,
      };
    case ActionType.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case ActionType.GET_ALL_USERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        alertType: "danger",
        alertText: action.payload.message,
      };
    case ActionType.GET_USER_BY_ID_BEGINS:
      return {
        ...state,
        isLoading: true,
      };
    case ActionType.GET_USER_BY_ID_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
      };
    case ActionType.GET_USER_BY_ID_FAILURE:
      return {
        ...state,
        isLoading: false,
        alertType: "danger",
        alertText: action.payload?.message,
      };
    case ActionType.CREATE_USER_BEGINS:
      return {
        ...state,
        isLoading: true,
      };
    case ActionType.CREATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        alertType: "success",
        alertText: action.payload?.message,
      };
    case ActionType.CREATE_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        alertType: "danger",
        alertText: action.payload?.message,
      };
    case ActionType.LOGOUT_USER_BEGINS:
      return {
        ...state,
        isLoading: true,
      };
    case ActionType.LOGOUT_USER_SUCCESS:
      return {
        ...initialState,
      };
    case ActionType.LOGOUT_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        alertType: "danger",
        alertText: action.payload?.message,
      };

    case ActionType.GET_ME_BEGINS:
      return {
        ...state,
        isLoading: true,
      };
    case ActionType.GET_ME_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        isLoading: false,
      };
    case ActionType.GET_ME_FAILURE:
      return {
        ...state,
        isLoading: false,
        alertType: "danger",
        alertText: action.payload?.message,
      };
    default:
      return state;
  }
};

export default userReducer;
