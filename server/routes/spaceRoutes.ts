import express from "express";
import {
  getSpace,
  createSpace,
  updateSpace,
  deleteSpace,
} from "../controllers/spaceControllers";

const router = express.Router();

router.route("/").get(getSpace).post(createSpace);
router.route("/:id").get(getSpace).put(updateSpace).delete(deleteSpace);

export default router;
