// Import the `useDispatch` and `bindActionCreators` hooks from React Redux.
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

// Import the action creators from the Redux store.
import { reservationActionCreators } from "../Redux/store";

// Export the `usePremiseAction` hook.
export function useReservationAction() {
  // Get the `dispatch` function from the React Redux Provider.
  const dispatch = useDispatch();

  // Bind the action creators to the `dispatch` function.
  return bindActionCreators(reservationActionCreators, dispatch);
}
