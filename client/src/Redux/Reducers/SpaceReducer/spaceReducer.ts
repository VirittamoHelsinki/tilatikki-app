import { SpaceActionTypes, type SpaceActionType } from "./spaceTypes";
import { initialSpaceState, SpaceStateProps } from "../spaceState"; // Adjust the path as needed

interface SpaceAction {
  type: SpaceActionType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any; // Define a more specific type if available
}

function spaceReducer(
  state: SpaceStateProps = initialSpaceState,
  action: SpaceAction,
): SpaceStateProps {
  switch (action.type) {
    case SpaceActionTypes.GET_SPACES_BEGINS:
      return {
        ...state,
        isLoading: true,
      };

    case SpaceActionTypes.GET_SPACES_SUCCESS:
      return {
        ...state,
        spacesData: action.payload,
        isLoading: false,
      };

    case SpaceActionTypes.GET_SPACES_FAILURE:
      return {
        ...state,
        isLoading: false,
        alertType: "danger",
        alertText: action.payload?.message,
      };

    case SpaceActionTypes.GET_SPACE_BEGINS:
      return {
        ...state,
        isLoading: true,
      };

    case SpaceActionTypes.GET_SPACE_SUCCESS:
      return {
        ...state,
        spaceData: action.payload,
        isLoading: false,
      };

    case SpaceActionTypes.GET_SPACE_FAILURE:
      return {
        ...state,
        isLoading: false,
        alertType: "danger",
        alertText: action.payload?.message,
      };

    case SpaceActionTypes.DELETE_SPACE_BEGINS:
      return {
        ...state,
        isLoading: true,
      };

    case SpaceActionTypes.DELETE_SPACE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        alertType: "success",
        alertText: "Premise successfully deleted",
      };

    case SpaceActionTypes.DELETE_SPACE_FAILURE:
      return {
        ...state,
        isLoading: false,
        alertType: "danger",
        alertText: action.payload?.message,
      };

    case SpaceActionTypes.UPDATE_SPACE_BEGINS:
      return {
        ...state,
        isLoading: true,
      };

    case SpaceActionTypes.UPDATE_SPACE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        alertType: "success",
        alertText: action.payload?.message,
      };

    case SpaceActionTypes.UPDATE_SPACE_FAILURE:
      return {
        ...state,
        isLoading: false,
        alertType: "danger",
        alertText: action.payload?.message,
      };

    case SpaceActionTypes.CREATE_SPACE_BEGINS:
      return {
        ...state,
        isLoading: true,
      };

    case SpaceActionTypes.CREATE_SPACE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        alertType: "success",
        alertText: action.payload?.message,
      };

    case SpaceActionTypes.CREATE_SPACE_FAILURE:
      return {
        ...state,
        isLoading: false,
        alertType: "danger",
        alertText: action.payload?.message,
      };
    default:
      return state;
  }
}

export default spaceReducer;
