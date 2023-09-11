import { Request, Response, NextFunction } from "express";

import Availability, { IAvailability } from "../models/Availability";

// Get all availabilities on the premise that are partially or totally
// contained between startdate and enddate time parameters received in the body.
export const getAvailabilitiesWithPremiseId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { startdate, enddate } = req.body
  const { premiseId } = req.params

  if (!startdate) return res.status(400).json({ error: 'startdate missing from body' })
  if (!enddate) return res.status(400).json({ error: 'enddate missing from body' })

  let availabilities = await Availability.find({
    premise: premiseId
  }).populate('reservations')

  if (!availabilities || availabilities.length === 0) {
    // Also directs here if premiseId does not point to an existing premise.
    // Might want to handle that separately with an error.
    return res.status(204).json([])
  }

  availabilities = availabilities.filter(availability => {

    if (startdate <= availability.startdate < enddate) return true
    if (startdate <  availability.enddate  <= enddate) return true
    if (availability.startdate <= startdate && enddate <= availability.enddate) return true

    return false
  })

  res.status(200).json(availabilities)
};

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
