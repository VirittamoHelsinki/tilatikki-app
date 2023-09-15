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

router.route("/").get(protect,getAvailability).post(protect,createAvailability);
router
  .route("/:id").all(protect)
  .get(protect,getAvailability)
  .put(protect,updateAvailability)
  .delete(protect,deleteAvailability)

// use post request instead of get so the client can add startdate and enddate in the body.
router.route("/premise/:id").post(getAvailabilitiesWithPremiseId)

export default router;
