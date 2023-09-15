import { Request, Response, NextFunction } from "express";

import Availability, { IAvailability } from "../models/Availability";
import Premise, { IPremise} from "../models/Premise";
import Space, { ISpace } from "../models/Space";

import asyncErrorHandler from "../utils/asyncErrorHandler"; 

// Get all availabilities on the premise that are partially or totally
// contained between startdate and enddate time parameters received in the body.
export const getAvailabilitiesWithPremiseId = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { startdate, enddate } = req.body
    const { premiseId } = req.params

    if (!startdate) return res.status(400).json({ error: 'startdate missing from body' })
    if (!enddate) return res.status(400).json({ error: 'enddate missing from body' })

    let availabilities = await Availability.find({
      premise: premiseId
    }).populate('reservations')

    if (!availabilities || availabilities.length === 0) {
      // No availabilities exist for this premise, or the premise does not exist.
      return res.status(204).json([])
    }

    // Filter availabilities that are partially or totally contained between startdate and enddate.
    availabilities = availabilities.filter(availability => {

      if (startdate <= availability.startdate < enddate) return true
      if (startdate <  availability.enddate  <= enddate) return true
      if (availability.startdate <= startdate && enddate <= availability.enddate) return true

      return false
    })

    res.status(200).json(availabilities)
  }
);

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
export const createAvailability = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { startdate, enddate, spaceId } = req.body;
    const { user } = res.locals; // Make sure this points to correct user location.

    if (!startdate) return res.status(400).json({ error: 'startdate missing from body' })
    if (!enddate) return res.status(400).json({ error: 'enddate missing from body' })
    if (!spaceId) return res.status(400).json({ error: 'spaceId missing from body' })

    const space = await Space.findById(spaceId)

    if (!space) return res.status(404).json({ error: `Space not found with id: ${spaceId}` })

    const premise = await Premise.findById(space.premise)

    // Check if the user is authorized to create an availability for this premise.
    if (!premise?.users.find(uid => user._id.equals(uid))) {
      return res.status(401).json({
        error: `You are not authorized to create availabilities for premise: ${spaceId}`
      })
    }

    let availability = new Availability({
      creator: user._id,
      startdate,
      enddate,
      space: spaceId,
      premise: premise._id
    })

    availability = await availability.save()

    res.status(200).json(availability);
  }
);

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
