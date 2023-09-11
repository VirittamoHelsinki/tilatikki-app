import express from "express";
import {
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/userControllers";

const router = express.Router();


router.route("/").get(getUsers);
router.route("/:id").get(getUsers).put(updateUser).delete(deleteUser);

export default router;