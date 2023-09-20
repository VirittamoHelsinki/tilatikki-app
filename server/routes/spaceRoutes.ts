import express from "express";
import {
  getAllSpace,
  createSpace,
  updateSpaceById,
  deleteSpaceById,
  getSpaceById,
} from "../controllers/spaceControllers";

const router = express.Router();

router.route("/").get(getAllSpace).post(createSpace);
router.route("/:id").get(getSpaceById).put(updateSpaceById).delete(deleteSpaceById);

export default router;
