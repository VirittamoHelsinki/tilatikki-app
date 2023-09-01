// Import the `useDispatch` and `bindActionCreators` hooks from React Redux.
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

// Import the action creators from the Redux store.
import { actionCreators } from "../Redux/index";

// Export the `usePremiseAction` hook.
export const usePremiseAction = () => {

  // Get the `dispatch` function from the React Redux Provider.
  const dispatch = useDispatch();

  // Bind the action creators to the `dispatch` function.
  return bindActionCreators(actionCreators, dispatch);
};