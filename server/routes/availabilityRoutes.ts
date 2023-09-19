import express from "express";
import {
  getAvailability,
  createAvailability,
  updateAvailability,
  deleteAvailability,
  getAvailabilitiesWithPremiseId
} from "../controllers/availabilityControllers";
import {protect} from "../utils/middleware";


const router = express.Router();
router.use(protect)
router.route("/").get(getAvailability).post(createAvailability);
router
  .route("/:id").all()
  .get(getAvailability)
  .put(updateAvailability)
  .delete(deleteAvailability)

// use post request instead of get so the client can add startdate and enddate in the body.
router.route("/premise/:id").post(getAvailabilitiesWithPremiseId)

export default router;
