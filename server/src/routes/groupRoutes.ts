import express from "express";
import { getAllGroups, getSingleGroup } from "../controllers/groupControllers";
// import Group from "../models/Group";

const router = express.Router();

// Route for getting all groups
router.route("/").get(getAllGroups);
router.route("/:id").get(getSingleGroup);


export default router;