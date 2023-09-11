import { Request, Response, NextFunction } from "express";

// Desc: Get all availabilities
// @route GET /api/availabilities
// @access Public
export const getSpace = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({ success: true, msg: "Show all Space" });
};

// Desc: Create new Space
// @route POST /api/availabilities
// @access Private
export const createSpace = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({ success: true, msg: "Create new Space" });
};

// Desc: Update Space
// @route PUT /api/availabilities/:id
// @access Private

export const updateSpace = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res
    .status(200)
    .json({ success: true, msg: `Update Space ${req.params.id}` });
};

// Desc: Delete Space
// @route DELETE /api/availabilities/:id
// @access Private

export const deleteSpace = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res
        .status(200)
        .json({ success: true, msg: `Delete Space ${req.params.id}` });
}

