import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/User"; // Assuming your User model is in '../models/User'
import asyncErrorHandler from "../utils/asyncErrorHandler";

// Desc: Get all Users
// @route GET /api/users
// @access Public
export const getUsers = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  }
);

// Desc: Update User
// @route PUT /api/users/:id
// @access Private
export const updateUser = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const updatedUser: IUser = req.body;
    const user = await User.findByIdAndUpdate(userId, updatedUser, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  }
);

// Desc: Delete User
// @route DELETE /api/users/:id
// @access Private
export const deleteUser = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    res.status(200).json({ success: true, data: {} });
  }
);
