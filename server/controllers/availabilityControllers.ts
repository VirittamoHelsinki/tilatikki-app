import { Request, Response, NextFunction } from "express";

// Desc: Get all availabilities
// @route GET /api/availabilities
// @access Public
export const getAvailability = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({ success: true, msg: "Show all availabilities" });
};

// Desc: Create new availability
// @route POST /api/availabilities
// @access Private
export const createAvailability = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({ success: true, msg: "Create new availability" });
};

// Desc: Update availability
// @route PUT /api/availabilities/:id
// @access Private

export const updateAvailability = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res
    .status(200)
    .json({ success: true, msg: `Update availability ${req.params.id}` });
};

// Desc: Delete availability
// @route DELETE /api/availabilities/:id
// @access Private

export const deleteAvailability = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete availability ${req.params.id}` });
};
