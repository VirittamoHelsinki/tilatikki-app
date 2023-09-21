import express from "express";
import {
  getPremise,
  createPremise,
  updatePremise,
  deletePremise,
} from "../controllers/premiseControllers";
import { protect } from "../utils/middleware";

const router = express.Router();
//router.use(protect)
router.route("/").get(getPremise).post(createPremise);
router.route("/:id").get(getPremise).put(updatePremise).delete(deletePremise);

export default router;
