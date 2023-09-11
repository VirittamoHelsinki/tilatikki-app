import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/User"; // Assuming your User model is in '../models/User'

// Desc: Get all Users
// @route GET /api/users
// @access Public
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// Desc: Create new User
// @route POST /api/users
// @access Private
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser: IUser = req.body;
    const user = await User.create(newUser);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// Desc: Update User
// @route PUT /api/users/:id
// @access Private
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    const updatedUser: IUser = req.body;
    const user = await User.findByIdAndUpdate(userId, updatedUser, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// Desc: Delete User
// @route DELETE /api/users/:id
// @access Private
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};