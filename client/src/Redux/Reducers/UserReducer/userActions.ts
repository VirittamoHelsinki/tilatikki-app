import { Dispatch } from "redux";
import axios from "axios";
import { ActionType } from "./userTypes";
import Cookies from "universal-cookie";

// Define the User interface TODO: Fix any types
export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  premises: any[];
  role: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  availabilities: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reservations: any[];
  createdAt: string;
  updatedAt: string;
}

// Define the action interface for user-related actions
interface UserAction<Type, Payload> {
  type: Type;
  payload?: Payload;
}

// Define credentials interface
interface RegisterUser {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
}

// const baseURL = "http://localhost:5000";
// const middleURL = {
//   login: "/api/auth",
//   common: "/api",
// };
const cookies = new Cookies();

// Save the token as a cookie.

let token: string = "";

export function setToken(newToken: string): string {
  return (token = newToken);
}

export const config = () => {
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

// Define the action creator for fetching all users
export const getAllUsers = () => {
  return async (dispatch: Dispatch<UserAction<ActionType, User[] | Error>>) => {
    dispatch({ type: ActionType.GET_ALL_USERS_BEGINS });
    try {
      // Make an API call to fetch all user data from your backend
      const response = await axios.get(
        "http://localhost:5050/api/users",
        config(),
      );

      const userData = response.data;
      dispatch({
        type: ActionType.GET_ALL_USERS_SUCCESS,
        payload: userData,
      });
    } catch (error) {
      dispatch({
        type: ActionType.GET_ALL_USERS_FAILURE,
        payload: error as Error,
      });
    }
  };
};

export const loginUser = (credentials: { email: string; password: string }) => {
  return async (dispatch: Dispatch<UserAction<ActionType, User[] | Error>>) => {
    dispatch({ type: ActionType.LOGIN_USER_BEGINS });

    try {
      const response = await axios.post(
        "http://localhost:5050/api/auth/login",
        credentials,
      );
      const userData = response.data;
      token = userData.token;
      cookies.set("tilatikkiToken", token, {
        // Cookie expires in 3 days.

        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),

        path: "/",
      });

      dispatch({
        type: ActionType.LOGIN_USER_SUCCESS,
        payload: userData,
      });

      getMe();
    } catch (error) {
      dispatch({
        type: ActionType.LOGIN_USER_FAILURE,
        payload: error as Error,
      });
    }
  };
};

export const logoutUser = () => {
  return async (dispatch: Dispatch<UserAction<ActionType, User[] | Error>>) => {
    dispatch({ type: ActionType.LOGOUT_USER_BEGINS });
    try {
      const response = await axios.get(
        "http://localhost:5050/api/auth/logout",
        config(),
      );
      const userData = response.data;
      cookies.remove("tilatikkiToken");
      dispatch({
        type: ActionType.LOGOUT_USER_SUCCESS,
        payload: userData,
      });

      // After successful logout, call getMe
    } catch (error) {
      dispatch({
        type: ActionType.LOGOUT_USER_FAILURE,
        payload: error as Error,
      });
    }
  };
};

export const getMe = () => {
  return async (dispatch: Dispatch<UserAction<ActionType, User[] | Error>>) => {
    dispatch({ type: ActionType.GET_ME_BEGINS });
    try {
      const response = await axios.get(
        "http://localhost:5050/api/auth/me",
        config(),
      );
      const userData = response.data;
      dispatch({
        type: ActionType.GET_ME_SUCCESS,
        payload: userData,
      });

      return userData;
    } catch (error) {
      dispatch({
        type: ActionType.GET_ME_FAILURE,
        payload: error as Error,
      });
    }
  };
};

export const registerUser = (credentials: RegisterUser) => {
  return async (dispatch: Dispatch<UserAction<ActionType, User[] | Error>>) => {
    dispatch({ type: ActionType.CREATE_USER_BEGINS });
    try {
      const response = await axios.post(
        "http://localhost:5050/api/auth/register",
        credentials,
      );
      const userData = response.data;
      dispatch({
        type: ActionType.CREATE_USER_SUCCESS,
        payload: userData,
      });
    } catch (error) {
      dispatch({
        type: ActionType.CREATE_USER_FAILURE,
        payload: error as Error,
      });
    }
  };
};
