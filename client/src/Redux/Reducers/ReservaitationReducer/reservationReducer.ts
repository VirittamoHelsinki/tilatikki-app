import {
  ReservationActionTypes,
  type ReservationActionType,
} from "./reservationTypes";
import { initialPremiseState, PremiseStateProps } from "../premiseState"; // Adjust the path as needed

interface ReservationAction {
  type: ReservationActionType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any; // Define a more specific type if available
}

// Main reducer
const reservationReducer = (
  state: PremiseStateProps = initialPremiseState,
  action: ReservationAction,
): PremiseStateProps => {
  switch (action.type) {
    case ReservationActionTypes.GET_RESERVATION_BEGINS:
      return {
        ...state,
        isLoading: true,
      };

    case ReservationActionTypes.GET_RESERVATION_SUCCESS:
      return {
        ...state,
        reservationData: action.payload,
        isLoading: false,
      };

    case ReservationActionTypes.GET_RESERVATION_FAILURE:
      return {
        ...state,
        isLoading: false,
        alertType: "danger",
        alertText: action.payload?.message,
      };

    case ReservationActionTypes.GET_ALL_RESERVATIONS_BEGINS:
      return {
        ...state,
        isLoading: true,
      };

    case ReservationActionTypes.GET_ALL_RESERVATIONS_SUCCESS:
      return {
        ...state,
        reservationsData: action.payload,
        isLoading: false,
      };

    case ReservationActionTypes.GET_ALL_RESERVATIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
        alertType: "danger",
        alertText: action.payload?.message,
      };

    case ReservationActionTypes.DELETE_RESERVATION_BEGINS:
      return {
        ...state,
        isLoading: true,
      };

    case ReservationActionTypes.DELETE_RESERVATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        alertType: "success",
        alertText: "Premise successfully deleted",
      };

    case ReservationActionTypes.DELETE_RESERVATION_FAILURE:
      return {
        ...state,
        isLoading: false,
        alertType: "danger",
        alertText: action.payload?.message,
      };

    case ReservationActionTypes.UPDATE_RESERVATION_BEGINS:
      return {
        ...state,
        isLoading: true,
      };

    case ReservationActionTypes.UPDATE_RESERVATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        alertType: "success",
        alertText: action.payload?.message,
      };

    case ReservationActionTypes.UPDATE_RESERVATION_FAILURE:
      return {
        ...state,
        isLoading: false,
        alertType: "danger",
        alertText: action.payload?.message,
      };

    case ReservationActionTypes.CREATE_RESERVATION_BEGINS:
      return {
        ...state,
        isLoading: true,
      };

    case ReservationActionTypes.CREATE_RESERVATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        alertType: "success",
        alertText: action.payload?.message,
      };

    case ReservationActionTypes.CREATE_RESERVATION_FAILURE:
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

export default reservationReducer;
