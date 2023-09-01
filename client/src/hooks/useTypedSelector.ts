// Import the `useSelector` and `TypedUseSelectorHook` hooks from React Redux.
import { useSelector, TypedUseSelectorHook } from "react-redux";

// Import the `RootState` type from the Redux store.
import { RootState } from "../Redux";

// Export the `useTypedSelector` hook.
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;