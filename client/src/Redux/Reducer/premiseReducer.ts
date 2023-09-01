// Import the `Reducer` and `Dispatch` interfaces from Redux.
import { Reducer, Dispatch } from "redux";
// import { initialState, initialStateProps } from "./initialState"; // for future when initalState and props are moved to its own file


// All data here is dummy for testing reducer and actions it shows the structure an how to build reducers
// start from ActionTypes, Action interface, Action creator's and then reducer

// Action types
// This defines the different types of actions that can be dispatched to the reducer.
enum ActionType {
    UPDATE_COUNTER = "UPDATE_COUNTER"
}

// Action interface
// This defines the interface for all actions that can be dispatched to the reducer.
interface UpdateCounterAction {
    type: typeof ActionType.UPDATE_COUNTER;
}

// Collection of all Action interface types
export type Action =
|UpdateCounterAction;

// Action creators
// These functions create actions that can be dispatched to the reducer.
export const updateCounter = () => {
    return async (dispatch: Dispatch<UpdateCounterAction>) => {
        console.log("updateCounter active");
        dispatch({ type: ActionType.UPDATE_COUNTER });
    };
};

// Initial state
// This is the initial state of the reducer.
const initialState = {
    value: 0
};

// InitialState interface
// This defines the interface for the initial state of the reducer.
interface InitialStateProps {
    value: number;
}

// Main reducer
// This is the main reducer that updates the state of the reducer based on the actions that are dispatched to it.
const premiseReducer: Reducer<InitialStateProps> = (state = initialState,action:Action) => {
    switch (action.type) {
      case ActionType.UPDATE_COUNTER:
        return {
          ...state,
          value: state.value + 1
        };
  
      default:
        return state;
    }
  };

export default premiseReducer;