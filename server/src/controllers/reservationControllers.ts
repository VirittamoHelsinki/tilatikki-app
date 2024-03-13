import { type Request, type Response } from "express";
import Availability, { type IAvailability } from "../models/Availability";
import Reservation, {
  type IReservation,
  isReservationList,
} from "../models/Reservation";
import Premise from "../models/Premise";
import {
  intersectingTimespans,
  duringTimespan,
} from "../utils/dateFunctions";
import asyncErrorHandler from "../middleware/asyncErrorHandler";

export const getReservation = asyncErrorHandler(async function (
  req: Request,
  res: Response
) {
  const reservation = await Reservation.findById(req.params.id);

  if (!reservation) {
    return res.status(404).json({ error: "Reservation not found" });
  }
  res.status(200).json(reservation);
});

export const getAllReservations = asyncErrorHandler(async function (
  _req: Request,
  res: Response
) {
  const reservations = await Reservation.find();

  if (!reservations) {
    return res.status(404).json({ error: "Reservations not found" });
  }
  res.status(200).json(reservations);
});

// Reserve a space during an availability.
export const createReservation = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const { startdate, enddate, availabilityId } = req.body;
    const user = req.user;

    const availability = await Availability.findById(availabilityId).populate(
      "reservations"
    );

    if (!availability) {
      return res
        .status(404)
        .json({ error: `Availability not found with id: ${availability}` });
    }

    // Check that the reservations timespan is contained within the
    // timespan of the availability it is connected to.
    if (!duringTimespan(startdate, enddate, availability)) {
      return res.status(400).json({
        error: "Reservation time falls outside the scope of the availability",
      });
    }

    // Make sure the space.availabilities field is a Reservation list
    // by using the typeguard function: isReservationList.
    if (!isReservationList(availability.reservations as IReservation[])) {
      return res.status(500).json({
        error: `The reservations field of availability: ${availability._id} is not of type IReservation[]`,
      });
    }

    // Check that the new reservation does not overlap with other reservations
    // on the same availability.
    if (
      intersectingTimespans(
        startdate,
        enddate,
        availability.reservations as IReservation[]
      )
    ) {
      return res.status(400).json({ error: "Availabilities cannot overlap." });
    }

    const premise = await Premise.findById(availability.premise);

    if (!premise) {
      return res
        .status(404)
        .json({ error: `Premise not found with id: ${availability.premise}` });
    }

    // current setup is that you HAVE assign manually(dev has to do dis) the user to a school be enable the ability to reserve rooms in any schools
    // Check that the user is authorized to create reservations for this premise.
    if (!premise.users.some((uid) => user._id.equals(uid))) {
      return res.status(401).json({
        error: `You are not authorized to create reservations for premise: ${availability.premise}`,
      });
    }

    // Create the reservation
    let reservation: IAvailability = new Availability({
      startdate,
      enddate,
      availability: availability._id,
      premise: availability.premise,
      space: availability.space,
      creator: user._id,
    });

    reservation = await reservation.save();

    user.reservations.push(reservation._id);

    await user.save();

    res.status(201).json(reservation);
  }
);

// Desc: Update Reservation
// @route PUT /api/availabilities/:id
// @access Private
export const updateReservation = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const { startdate, enddate } = req.body;
    const id = req.params.id;
    const user = req.user;

    if (!startdate)
      return res.status(400).json({ error: "startdate missing from body" });
    if (!enddate)
      return res.status(400).json({ error: "enddate missing from body" });

    let reservation = await Reservation.findById(id);

    if (!reservation) {
      return res
        .status(404)
        .json({ error: `Reservation not found with id: ${id}` });
    }

    const availability = await Availability.findById(
      reservation.availability
    ).populate("reservations");

    if (!availability) {
      return res.status(404).json({
        error: `Availability not found with id: ${reservation.availability}`,
      });
    }

    // Check that the reservation timespan is contained within the
    // timespan of the availability it is connected to.
    if (!duringTimespan(startdate, enddate, availability)) {
      return res.status(400).json({
        error: "Reservation time falls outside the scope of the availability",
      });
    }

    // Make sure the availability.reservations field is a Reservation list
    // by using the typeguard function: isReservationList.
    if (!isReservationList(availability.reservations as IReservation[])) {
      return res.status(500).json({
        error: `The reservations field of availability: ${availability._id} is not of type IReservation[]`,
      });
    }

    // Check that the new reservation does not overlap with other reservations
    if (
      intersectingTimespans(
        startdate,
        enddate,
        (availability.reservations as IReservation[]).filter(
          (r) => !r._id.equals(id)
        )
      )
    ) {
      return res.status(400).json({ error: "Reservations cannot overlap." });
    }

    const premise = await Premise.findById(availability.premise);

    if (!premise) {
      return res
        .status(404)
        .json({ error: `Premise not found with id: ${availability.premise}` });
    }

    // Check that the user is authorized to create reservations for this premise.
    if (!premise.users.some((uid) => user._id.equals(uid))) {
      return res.status(401).json({
        error: `You are not authorized to create reservations for premise: ${availability.premise}`,
      });
    }

    reservation.startdate = startdate;
    reservation.enddate = enddate;

    reservation = await reservation.save();

    res.status(200).json(reservation);
  }
);

// Desc: Delete Reservation
// @route DELETE /api/availabilities/:id
// @access Private
export const deleteReservation = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user;

    const reservation = await Reservation.findById(id);

    if (!reservation) {
      return res
        .status(404)
        .json({ error: `Reservation not found with id: ${id}` });
    }

    const premise = await Premise.findById(reservation.premise);

    if (!premise) {
      return res
        .status(404)
        .json({ error: `Premise not found with id: ${reservation.premise}` });
    }

    // Check if the user is authorized to remove a reservation from this premise.
    if (!premise.users.some((uid) => user._id.equals(uid))) {
      return res.status(401).json({
        error: `You are not authorized to remove availabilities from premise: ${premise._id}`,
      });
    }

    await Reservation.findByIdAndDelete(id);

    res.status(204).json({ message: "Reservation deleted" });
  }
);
