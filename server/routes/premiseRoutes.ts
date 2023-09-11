import express from "express";
import {
  getPremise,
  createPremise,
  updatePremise,
  deletePremise,
} from "../controllers/premiseControllers";

const router = express.Router();

router.route("/").get(getPremise).post(createPremise);
router.route("/:id").get(getPremise).put(updatePremise).delete(deletePremise);

export default router;
