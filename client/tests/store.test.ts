import premiseReducer, { ActionType } from '../src/Redux/Reducer/premiseReducer';

it('should increment the counter when the UPDATE_COUNTER action is dispatched', () => {
    const initialState = {
      value: 0,
    };
  
    const action = {
      type: ActionType.UPDATE_COUNTER,
    };
  
    const newState = premiseReducer(initialState, action);
  
    expect(newState.value).toBe(1);
});