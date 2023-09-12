import { Request, Response, NextFunction } from "express";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import User, { IUser } from "../models/User";
import { jwtExpire, node_env } from "../utils/config";

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

    sendTokenResponse(user, 200, res);
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

    sendTokenResponse(user, 200, res);
  }
);

// Get token from model, create cookie and send response
export const sendTokenResponse = (user: IUser, statusCode: number, res: Response) => {
  // Create token
  const token: string = user.getSignedJwtToken();

  const options: { expires: Date; httpOnly: boolean; secure?: boolean } = {
    expires: new Date(Date.now() + jwtExpire * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if (node_env === 'production') {
    options.secure = true;
  }

  // Send response
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};

// @desc forgot password
// @route POST /api/auth/forgotpassword
// @access Public

export const forgotPassword = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new Error('There is no user with that email'));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  console.log(resetToken)


  res.status(200).json({ success: true, data:user });
}
);

