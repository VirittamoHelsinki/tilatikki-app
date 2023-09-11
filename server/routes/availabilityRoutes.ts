import express from "express";
import {
  getAvailability,
  createAvailability,
  updateAvailability,
  deleteAvailability,
} from "../controllers/availabilityControllers";

const router = express.Router();

router.route("/").get(getAvailability).post(createAvailability);
router
  .route("/:id")
  .get(getAvailability)
  .put(updateAvailability)
  .delete(deleteAvailability);

export default router;
