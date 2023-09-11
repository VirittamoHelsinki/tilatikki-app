import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import asyncErrorHandler from "./asyncErrorHandler";
import User, {IUser} from "../models/User";

const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log("Method:", req.method);
  console.log("Path:  ", req.path);
  console.log("Body:  ", req.body);
  console.log("---");
  next();
};

const unknownEndpoint = (req: Request, res: Response): void => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(error.message);

  if (error.name === "CastError") {
    res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    res.status(400).send({ error: error.message });
  } else {
    next(error);
  }
};

// Protect routes
const protect = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Make sure token exists
    if (!token) {
      return next(new Error("Not authorized to access this route"));
    }

      // Verify token
      const decoded = jwt.verify(token, "secret") as { id: string }; // Adjust the type accordingly

      console.log(decoded);

      // Assuming you have a User model and a UserType
      const user: IUser | null = await User.findById(decoded.id);

      if (!user) {
        throw new Error("User not found");
      }

      res.locals = {
        user,
      };

      next();
  }
);

export { unknownEndpoint, errorHandler, requestLogger, protect };