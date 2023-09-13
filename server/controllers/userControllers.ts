import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/User"; 
import asyncErrorHandler from "../utils/asyncErrorHandler"; 

// Desc: Get all Users
// @route GET /api/auth/users
// @access Private/Admin
export const getUsers = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Respond with advanced results from middleware
    res.status(200).json(res.advancedResults);
  }
);

// Desc: Get single User
// @route GET /api/auth/users/:id
// @access Private/Admin
export const getUser = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Find a user by ID
    const user = await User.findById(req.params.id);

    // If user not found, return a 404 error
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Respond with the found user
    res.status(200).json(user);
  }
);

// Desc: Create User
// @route POST /api/auth/users
// @access Private/Admin
export const createUser = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Create a user based on the request body
    const user = await User.create(req.body);

    // Respond with the created user
    res.status(201).json(user);
  }
);

// Desc: Update User
// @route PUT /api/auth/users/:id
// @access Private/Admin
export const updateUser = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Update a user by ID with the data from the request body
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { 
      new: true,
      runValidators: true
    });

    // Respond with the updated user
    res.status(200).json(user);
  }
);

// Desc: Delete User
// @route DELETE /api/auth/users/:id
// @access Private/Admin
export const deleteUser = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Find and delete a user by ID
    await User.findByIdAndDelete(req.params.id);

    // Respond with a success message
    res.status(200).json({});
  }
);