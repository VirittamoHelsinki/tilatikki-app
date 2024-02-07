import express from "express";
import { updateBuilding, getSingleBuilding } from "../controllers/buildingControllers.js";
import Building from "../models/Building.js";


const router = express.Router();

//router.use(protect)

router.route("/:id").put(updateBuilding).get(getSingleBuilding)

export default router;
