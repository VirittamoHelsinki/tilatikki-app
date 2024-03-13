/* Extends the express library's Request interface by adding a new property */
declare namespace Express {
  interface Request {
      user?: IUser; // The "user" property of Request can now be of type IUser
  }
}
