import { Dispatch } from "redux";
import { SpaceActionTypes } from "./spaceTypes";

// Action for getting all premises
export function getAllSpaces() {
  return async function (dispatch: Dispatch) {
    dispatch({ type: SpaceActionTypes.GET_SPACES_BEGINS });
    try {
      const response = await fetch("/api/space", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: SpaceActionTypes.GET_SPACES_SUCCESS,
        payload: await response.json(),
      });
    } catch (error) {
      dispatch({
        type: SpaceActionTypes.GET_SPACES_FAILURE,
        payload: error as Error,
      });
    }
  };
}

export function getSpaceById(id: string) {
  return async function (dispatch: Dispatch) {
    dispatch({ type: SpaceActionTypes.GET_SPACE_BEGINS });
    try {
      const response = await fetch(`/api/space/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: SpaceActionTypes.GET_SPACE_SUCCESS,
        payload: await response.json(),
      });
    } catch (error) {
      dispatch({
        type: SpaceActionTypes.GET_SPACE_FAILURE,
        payload: error as Error,
      });
    }
  };
}
