import { Dispatch } from "redux";
import axios from "axios";
import { ActionType } from "./userTypes"; // Assuming you have your action types defined in a separate file

// Define the User interface
export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  premises: any[];
  role: string;
  availabilities: any[];
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

let token: any = null;

const config = () => {
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};


// Define the action creator for fetching all users
export const getAllUsers = () => {
  return async (dispatch: Dispatch<UserAction<ActionType, User[]>>) => {
    dispatch({ type: ActionType.GET_ALL_USERS_BEGINS });
    try {
      // Make an API call to fetch all user data from your backend
      const response = await axios.get(
        "http://localhost:5000/api/users",
        config()
      );

      const userData = response.data;
      console.log("users : ", userData);
      dispatch({
        type: ActionType.GET_ALL_USERS_SUCCESS,
        payload: userData,
      });
    } catch (error) {
      dispatch({
        type: ActionType.GET_ALL_USERS_FAILURE,
        payload: error as any,
      });
    }
  };
};

export const loginUser = (credentials: { email: string; password: string }) => {
  return async (dispatch: Dispatch<UserAction<ActionType, any>>) => {
    dispatch({ type: ActionType.LOGIN_USER_BEGINS });
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        credentials
      );
      const userData = response.data;
      token = userData.token;
      dispatch({
        type: ActionType.LOGIN_USER_SUCCESS,
        payload: userData,
      });
    } catch (error) {
      dispatch({
        type: ActionType.LOGIN_USER_FAILURE,
        payload: error as any,
      });
    }
  };
};


