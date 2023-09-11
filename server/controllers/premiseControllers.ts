import { Request, Response, NextFunction } from "express";

// Desc: Get all availabilities
// @route GET /api/availabilities
// @access Public
export const getPremise = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({ success: true, msg: "Show all Premise" });
};

// Desc: Create new Premise
// @route POST /api/availabilities
// @access Private
export const createPremise = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({ success: true, msg: "Create new Premise" });
};

// Desc: Update Premise
// @route PUT /api/availabilities/:id
// @access Private

export const updatePremise = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res
    .status(200)
    .json({ success: true, msg: `Update Premise ${req.params.id}` });
};

// Desc: Delete Premise
// @route DELETE /api/availabilities/:id
// @access Private

export const deletePremise = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res
        .status(200)
        .json({ success: true, msg: `Delete Premise ${req.params.id}` });
}

