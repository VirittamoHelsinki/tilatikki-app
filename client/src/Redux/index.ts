// Export all the contents of the `store` file.
export * from './store';

// Export all the action creators from the `premiseReducer` file as a named export called `actionCreators`.
export * as userActionCreators from './Reducers/UserReducer/userActions';
export * as premiseActionCreators from './Reducers/PremiseReducer/premiseActions';

// Export all the contents of the `index` file.
export * from './Reducers/index';