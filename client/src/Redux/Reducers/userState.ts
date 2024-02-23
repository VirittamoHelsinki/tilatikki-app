type UserType = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  premises: string[];
  role: string;
  availabilities: string[];
  reservations: string[];
  createdAt: string;
  updatedAt: string;
};
// export an interface called initialStateProps
// this interface will define the properties of the initial state
export interface initialUserStateProps {
  users: UserType[];
  currentUser: {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    reservations: string[];
  };
  token: string;
  isLoading: boolean;
  showAlert: boolean;
  alertText: string;
  alertType: string;
}

// export a constant called initialState
// this constant will be the initial state of the application
// it will be an object that conforms to the initialStateProps interface
export const initialUserState: initialUserStateProps = {
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
    reservations: [],
  },
  token: "",
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
};
