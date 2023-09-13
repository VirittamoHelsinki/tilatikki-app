/*extends the express library's Request interface by adding a new property 
called user of type IUser to the Request object. 
This is a TypeScript declaration to tell TypeScript that when you use req.user*/

declare namespace Express {
    interface Request {
      user?: IUser; 
    }
  }

  declare namespace Express {
    interface Response {
      advancedResults?: {
        success: boolean;
        count: number;
        pagination: {
          next?: {
            page: number;
            limit: number;
          };
          prev?: {
            page: number;
            limit: number;
          };
        };
        data: any;
      };
    }
  }