import { Request, Response, NextFunction } from "express";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import User, { IUser } from "../models/User";

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
      const { firstname, lastname, email, password } = req.body;
      const user: IUser = await User.create({
        firstname,
        lastname,
        email,
        password,
      });

      // Create token
      const token: string = user.getSignedJwtToken();

      res.status(200).json({
        success: true,
        token,
      });
  }
);

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;
      // Validate email & password
      if (!email || !password) {
        return next(new Error("Please provide an email and password"));
      }

      // Check for user
      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new Error("Invalid credentials"));
      }

      // Check if password matches
      const isMatch = await user.matchPassword(password);

      if (!isMatch) {
        return next(new Error("Invalid credentials"));
      }

      // If password matches, create and send a token
      const token: string = user.getSignedJwtToken();

      res.status(200).json({
        success: true,
        token,
      });
  }
);