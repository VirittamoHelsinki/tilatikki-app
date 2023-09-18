// export an interface called initialStateProps
// this interface will define the properties of the initial state
export interface initialStateProps {
  users: [{}];
  currentUser: {};
  token:string;
  isLoading: boolean;
  showAlert: boolean;
  alertText: string,
  alertType: string,
}

// export a constant called initialState
// this constant will be the initial state of the application
// it will be an object that conforms to the initialStateProps interface
export const initialState: initialStateProps = {
  users: [
    {
      _id: "",
      firstname: "",
      lastname: "",
      email: "",
      premises: [],
      role: "",
      availabilities: [],
      reservations: [],
      createdAt: "",
      updatedAt: "",
    },
  ],
  currentUser: {
    _id: "",
    firstname: "",
    lastname: "",
    email: "",
    premises: [],
    role: "",
    availabilities: [],
    reservations: [],
    createdAt: "",
    updatedAt: "",
  },
  token:"",
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
};
