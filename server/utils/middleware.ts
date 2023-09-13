import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import asyncErrorHandler from "./asyncErrorHandler";
import User, {IUser} from "../models/User";
import {jwtSecret } from "./config";


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
const protect = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token;

  // Check if the request contains an "Authorization" header with a "Bearer" token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // If there's no token, return a 401 (Unauthorized) response
  if (!token) {
    return res.status(401).json({ error: 'Not authorized, no token' });
  }

  // Verify the token and extract the user's ID
  const decoded = jwt.verify(token, jwtSecret) as { id: string };

  // Find the user in the database by their ID, excluding their password
  req.user = await User.findById(decoded.id).select('-password');

  // Log the user object for debugging purposes
  console.log(req.user);

  // Continue to the next middleware or route handler
  next();
});

// Middleware function to authorize specific user roles for routes
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Check if the user's role is included in the allowed roles
    if (!roles.includes(req.user.role)) {
      return next(
        new Error(
          `User role ${req.user.role} is not authorized to access this route`
        )
      );
    }

    // Continue to the next middleware or route handler
    next();
  };
};

export { unknownEndpoint, errorHandler, requestLogger, protect };