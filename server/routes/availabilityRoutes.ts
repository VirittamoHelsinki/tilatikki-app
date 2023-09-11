import express from "express";
import {
  getAvailability,
  createAvailability,
  updateAvailability,
  deleteAvailability,
} from "../controllers/availabilityControllers";
import {protect} from "../utils/middleware";


const router = express.Router();

router.route("/").get(getAvailability).post(protect,createAvailability);
router
  .route("/:id")
  .get(getAvailability)
  .put(updateAvailability)
  .delete(deleteAvailability);

export default router;
