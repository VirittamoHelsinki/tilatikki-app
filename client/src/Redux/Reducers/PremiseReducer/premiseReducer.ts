import { PremiseActionTypes, type PremiseActionType } from "./premiseTypes";
import { initialPremiseState, initialPremiseStateProps } from "../premiseState"; // Adjust the path as needed

// Define the action interface for premise-related actions
interface PremiseAction {
  type: PremiseActionType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any; // Define a more specific type if available
}

// Main reducer
const premiseReducer = (
  state: initialPremiseStateProps = initialPremiseState,
  action: PremiseAction,
): initialPremiseStateProps => {
  switch (action.type) {
    case PremiseActionTypes.GET_PREMISES_BEGINS:
      return {
        ...state,
        isLoading: true,
      };

    case PremiseActionTypes.GET_PREMISES_SUCCESS:
      return {
        ...state,
        premises: action.payload,
        isLoading: false,
      };

    case PremiseActionTypes.GET_PREMISES_FAILURE:
      return {
        ...state,
        isLoading: false,
        alertType: "danger",
        alertText: action.payload?.message,
      };

    case PremiseActionTypes.DELETE_PREMISE_BEGINS:
      return {
        ...state,
        isLoading: true,
      };

    case PremiseActionTypes.DELETE_PREMISE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        alertType: "success",
        alertText: "Premise successfully deleted",
      };

    case PremiseActionTypes.DELETE_PREMISE_FAILURE:
      return {
        ...state,
        isLoading: false,
        alertType: "danger",
        alertText: action.payload?.message,
      };

    case PremiseActionTypes.UPDATE_PREMISE_BEGINS:
      return {
        ...state,
        isLoading: true,
      };

    case PremiseActionTypes.UPDATE_PREMISE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        alertType: "success",
        alertText: action.payload?.message,
      };

    case PremiseActionTypes.UPDATE_PREMISE_FAILURE:
      return {
        ...state,
        isLoading: false,
        alertType: "danger",
        alertText: action.payload?.message,
      };

    case PremiseActionTypes.CREATE_PREMISE_BEGINS:
      return {
        ...state,
        isLoading: true,
      };

    case PremiseActionTypes.CREATE_PREMISE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        alertType: "success",
        alertText: action.payload?.message,
      };

    case PremiseActionTypes.CREATE_PREMISE_FAILURE:
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

export default premiseReducer;
