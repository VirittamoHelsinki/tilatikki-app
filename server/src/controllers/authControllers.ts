import { type Request, type Response } from "express";
import crypto from "node:crypto";
import asyncErrorHandler from "../middleware/asyncErrorHandler";
import User, { IUser } from "../models/User";
import sendEmail from "../utils/sendEmail";
import * as config from "../utils/config";

type RegisterUserForm = {
  firstname: string|undefined;
  lastname: string|undefined;
  email: string|undefined;
  password: string|undefined;
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncErrorHandler(
  async (req: Request, res: Response) => {
    // Extract user information from the request body
    const { firstname, lastname, email, password }: RegisterUserForm = req.body;

    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ error: "Please enter all fields" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
    }

    // Create a new user
    const user: IUser = await User.create({
      firstname,
      lastname,
      email: email.toLowerCase(),
      password,
    });

    // Create a JWT token for the user and send it in the response
    sendTokenResponse(user, 201, res);
  },
);

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncErrorHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Please provide an email and password" });
  }

  // Check for user with the provided email
  const user = await User.findOne({ email: email.toLowerCase() }).select("+password")

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Check if the provided password matches the user's password
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Create a JWT token for the user and send it in the response
  sendTokenResponse(user, 200, res);
});

//desc Log user out / clear cookie
//@route GET /api/auth/logout
//@access Private
export const logout = asyncErrorHandler(
  async (_req: Request, res: Response) => {
    // Set the cookie to an empty string with an expiration date in the past
    res.cookie("token", "none", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });

    res.status(200).json({ success: true, data: {} });
  },
);

//@desc Get current logged in user
//@route POST /api/auth/me
//@access Private
export const getMe = asyncErrorHandler(async (req: Request, res: Response) => {
  // Find and send the currently authenticated user
  const user = await User.findById(req.user.id);

  res.status(200).json(user);
});

//@desc Update user details
//@route PUT /api/auth/updatedetails
//@access Private
export const updateDetails = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const body = req.body;
    // Define fields to update based on the request body
    const fieldsToUpdate = {
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
    };

    // Find and update the user's details
    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    // Respond with the updated user data
    res.status(200).json({ success: true, data: user });
  },
);

//@desc Update password
//@route PUT /api/auth/updatepassword
//@access Private
export const updatePassword = asyncErrorHandler(async (req, res) => {
  // Find the user by ID and include the password field
  const user = await User.findById(req.user.id).select("+password");

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Check if the current password matches
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return res.status(401).json({ error: "Password is incorrect" });
  }

  // Set the new password and save the user document
  user.password = req.body.newPassword;

  await user.save();

  // Create a new JWT token for the user and send it in the response
  sendTokenResponse(user, 200, res);
});

// Get token from model, create a cookie, and send a response
export const sendTokenResponse = (
  user: IUser,
  statusCode: number,
  res: Response,
) => {
  try {
    // Create a JWT token
    const token: string = user.getSignedJwtToken();
  
    // Set options for the cookie
    const options: {
      expires: Date;
      httpOnly: boolean;
      secure?: boolean;
    } = {
      expires: new Date(Date.now() + config.jwtExpire * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
  
    // If in production, enable secure flag for HTTPS
    if (config.node_env === "production") {
      options.secure = true;
    }
  
    // Send the response with the token and cookie
    res
      .status(statusCode)
      .cookie("token", token, options)
      .json({ success: true, token });
  } catch (error) {
    console.error("sendTokenResponse error:", error);
  }
};

// @desc forgot password
// @route POST /api/auth/forgotpassword
// @access Public
export const forgotPassword = asyncErrorHandler(
  async (req: Request, res: Response) => {
    // Find a user by their email
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(404)
        .json({ error: "There is no user with that email" });
    }

    // Generate a reset token and save it to the user document
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Create a reset URL for the user to use
    const resetUrl = `${req.protocol}://${req.get("host")}/api/auth/resetpassword/${resetToken}`;

    const message = `You are receiving this email because you
  (or someone else) has requested the reset of a password.
  Please make a PUT request to: \n\n ${resetUrl}`;

    try {
      // Send an email with the reset instructions
      await sendEmail({
        to: user.email,
        subject: "Password reset token",
        text: message,
      });

      return res.status(200).json({ success: true, data: "Email sent" });
    } catch (error) {
      console.error(error);
      // Clear the reset token and expiration if there's an error
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({ validateBeforeSave: false });
      return res.status(500).json({ error: "Email could not be sent" });
    }
  },
);

// @desc Reset password
// @route PUT /api/auth/resetpassword/:resettoken
// @access Public
export const resetPassword = asyncErrorHandler(
  async (req: Request, res: Response) => {
    // Get hashed token from the URL
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.resettoken as crypto.BinaryLike)
      .digest("hex");

    // Find a user by the reset token and expiration date
    const user = await User.findOne({
      resetPasswordToken: resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Set the new password, clear the reset token and expiration, and save the user document
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    // Create a new JWT
    sendTokenResponse(user, 200, res);
  },
);
