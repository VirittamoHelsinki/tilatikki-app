import express from "express";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  getMe,
  updateDetails,
  updatePassword,
} from "../controllers/authControllers";
import { protect } from "../utils/middleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resettoken", resetPassword);
router.use(protect);
router.get("/me", getMe);
router.put("/updateDetails", updateDetails);
router.put("/updatePassword", updatePassword);

export default router;
