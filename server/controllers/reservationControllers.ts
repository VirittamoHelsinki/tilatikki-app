import { Request, Response, NextFunction } from "express";

// Desc: Get all availabilities
// @route GET /api/availabilities
// @access Public
export const getReservation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({ success: true, msg: "Show all Reservation" });
};

// Desc: Create new Reservation
// @route POST /api/availabilities
// @access Private
export const createReservation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({ success: true, msg: "Create new Reservation" });
};

// Desc: Update Reservation
// @route PUT /api/availabilities/:id
// @access Private

export const updateReservation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res
    .status(200)
    .json({ success: true, msg: `Update Reservation ${req.params.id}` });
};

// Desc: Delete Reservation
// @route DELETE /api/availabilities/:id
// @access Private

export const deleteReservation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res
        .status(200)
        .json({ success: true, msg: `Delete Reservation ${req.params.id}` });
}

