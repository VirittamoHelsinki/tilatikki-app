// export an interface called initialStateProps
// this interface will define the properties of the initial state
export interface initialStateProps {
    value: number
  }
  
  // export a constant called initialState
  // this constant will be the initial state of the application
  // it will be an object that conforms to the initialStateProps interface
  export const initialState: initialStateProps = {
    value: 0
  }