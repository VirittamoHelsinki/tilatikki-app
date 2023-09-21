/* Extends the express library's Request interface by adding a new property */
declare namespace Express {
  interface Request {
      user?: IUser; // The "user" property of Request can now be of type IUser
  }
}

/* Extends the express library's Response interface by adding a new property for advanced results */
declare namespace Express {
  interface Response {
      advancedResults?: {
          success: boolean; // Indicates whether the operation was successful
          count: number; // The count of items in the result
          pagination: {
              next?: {
                  page: number; // The next page number
                  limit: number; // The limit of items per page
              };
              prev?: {
                  page: number; // The previous page number
                  limit: number; // The limit of items per page
              };
          };
          data: any; // The data to be returned in the response
      };
  }
}
