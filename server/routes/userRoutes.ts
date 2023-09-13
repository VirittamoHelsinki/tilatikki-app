import express from "express";
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser,
} from "../controllers/userControllers";
import User from "../models/User";
import { protect, authorize } from "../utils/middleware";
import advancedResults from "../utils/advancedResults";

const router = express.Router();

router.use(protect);
router.use(authorize("admin"));
router.route("/").get(advancedResults(User), getUsers).post(createUser);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

export default router;
