import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/User"; // Assuming your User model is in '../models/User'
import asyncErrorHandler from "../utils/asyncErrorHandler";

// Desc: Get all Users
// @route GET /api/auth/users
// @access Private/Admin
export const getUsers = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(res.advancedResults);
  }
);

// Desc: Get single User
// @route GET /api/auth/users/:id
// @access Private/Admin

export const getUser = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
   const user = await User.findById(req.params.id);
   if(!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);

  }
);

// Desc: Create User
// @route POST /api/auth/users
// @access Private/Admin

export const createUser = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      data: user,
    });
  }
);

// Desc: Update User
// @route PUT /api/auth/users/:id
// @access Private/Admin

export const updateUser = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { 
      new: true,
      runValidators: true
      });
    res.status(200).json({
      success: true,
      data: user,
    });
  }
);

// Desc: Delete User
// @route DELETE /api/auth/users/:id
// @access Private/Admin

export const deleteUser = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      data: {},
    });
  }
);
