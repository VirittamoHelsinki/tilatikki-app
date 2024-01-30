import express from "express";
import {
  getAllSpace,
  createSpace,
  updateSpaceById,
  deleteSpaceById,
  getSpaceById,
} from "../controllers/spaceControllers.js";
import Space from "../models/Space.js";



const router = express.Router();

//router.use(protect)
router.route("/").get(getAllSpace).post(createSpace);
router.route("/:id").get(getSpaceById).put(updateSpaceById).delete(deleteSpaceById);

export default router;
