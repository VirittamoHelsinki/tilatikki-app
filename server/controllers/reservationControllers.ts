import { Request, Response, NextFunction } from "express";

import Availability, { IAvailability } from "../models/Availability";
import Reservation, { IReservation } from "../models/Reservation";
import Premise, { IPremise } from "../models/Premise";
import Space, { ISpace } from "../models/Space";


export const getReservation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res
    .status(200)
    .json({ success: true, msg: 'incomplete' });
};

// Reserve a space during an availability.
export const createReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { startdate, enddate, premise, space, availability } = req.body;
  // Still need to make sure the user is found this way(or change this).
  const { user } = res.locals;

  availability = await Availability.findById(availability)
                                   .populate('reservations');

  if (!availability) {
    return res.status(404).json({ error: `Availability not found with id: ${availabilityId}` });
  }

  // (In progress) ToDo:
  // 1. Check if the space exists and add premise id from that object
  // 2. Check if there are reservations that overlap with the new reservation.

  // Create the reservation
  const reservation: IAvailability = new Availability({
    startdate,
    enddate,
    premise,
    creator: user._id,
  });
  
  res.status(201).json(reservation);
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

