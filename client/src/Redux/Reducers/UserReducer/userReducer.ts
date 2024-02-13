import { initialUserState, initialUserStateProps } from "../userState";
import { ActionTypes, type ActionType } from "./userTypes";

// Define the action interface for user-related actions
interface UserAction {
  type: ActionType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}

// Main reducer
const userReducer = (
  state: initialUserStateProps = initialUserState,
  action: UserAction,
): initialUserStateProps => {
  switch (action.type) {
    case ActionTypes.LOGIN_USER_BEGINS:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        token: action.payload?.token,
        isLoading: false,
      };
    case ActionTypes.LOGIN_USER_FAILURE:
      return {
        ...state,
        token: "",
        isLoading: false,
        alertType: "danger",
        alertText: action.payload?.message,
      };

    case ActionTypes.GET_ALL_USERS_BEGINS:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case ActionTypes.GET_ALL_USERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        alertType: "danger",
        alertText: action.payload.message,
      };
    case ActionTypes.GET_USER_BY_ID_BEGINS:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.GET_USER_BY_ID_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
      };
    case ActionTypes.GET_USER_BY_ID_FAILURE:
      return {
        ...state,
        isLoading: false,
        alertType: "danger",
        alertText: action.payload?.message,
      };
    case ActionTypes.CREATE_USER_BEGINS:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.CREATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        alertType: "success",
        alertText: action.payload?.message,
      };
    case ActionTypes.CREATE_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        alertType: "danger",
        alertText: action.payload?.message,
      };
    case ActionTypes.LOGOUT_USER_BEGINS:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.LOGOUT_USER_SUCCESS:
      return {
        ...initialUserState,
      };
    case ActionTypes.LOGOUT_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        alertType: "danger",
        alertText: action.payload?.message,
      };

    case ActionTypes.GET_ME_BEGINS:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.GET_ME_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        isLoading: false,
      };
    case ActionTypes.GET_ME_FAILURE:
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
