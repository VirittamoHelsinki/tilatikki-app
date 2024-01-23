import express from "express";
import {
  getPremise,
  getSinglePremise,
  createPremise,
  updatePremise,
  deletePremise,
} from "../controllers/premiseControllers.js";

const router = express.Router();

//router.use(protect)
router.route("/").get(getPremise).post(createPremise);
router.route("/:id").get(getSinglePremise).put(updatePremise).delete(deletePremise);

export default router;
