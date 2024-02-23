// Import the `useDispatch` and `bindActionCreators` hooks from React Redux.
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

// Import the action creators from the Redux store.
import { spaceActionCreators } from "../Redux/store";

export function useSpaceAction() {
  // Get the `dispatch` function from the React Redux Provider.
  const dispatch = useDispatch();

  return bindActionCreators(spaceActionCreators, dispatch);
}
