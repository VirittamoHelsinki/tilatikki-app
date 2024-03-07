import express from "express";
import {
  getReservation,
  getAllReservations,
  createReservation,
  updateReservation,
  deleteReservation,
} from "../controllers/reservationControllers.js";
import { authorize, protect } from "../utils/middleware.js";
// import Reservation from '../models/Reservation.js';

const router = express.Router();

router.use(protect);
router.use(authorize("user", "admin"));

router.route("/").get(getAllReservations).post(createReservation);
router
  .route("/:id")
  .get(getReservation)
  .put(updateReservation)
  .delete(deleteReservation);

export default router;
