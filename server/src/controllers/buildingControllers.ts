import { type Request, type Response } from "express";
import Building from "../models/Building";
// import Space from "../models/Space";
import asyncErrorHandler from "../middleware/asyncErrorHandler";


// Desc: Get all buildings
// @route GET /api/buildings
// @access Public

export const getAllBuildings = asyncErrorHandler(async (/*_req: Request, res: Response*/) => {});

// Desc: Create new building
// @route POST /api/buildings
// @access Private

export const createBuilding = asyncErrorHandler(async (/*req: Request, res: Response*/) => {});



// Desc: Get single building
// @route GET /api/buildings/:id
// @access Public

export const getSingleBuilding = asyncErrorHandler(async (req: Request, res: Response) => {
    const building = await Building.findById(req.params.id);
    if(!building) return res.status(404).json({ success: false, msg: "Building not found" });
    res.status(200).json({ success: true, data: building });
});


// Desc: Update building
// @route PUT /api/buildings/:id
// @access Private

export const updateBuilding = asyncErrorHandler(async (req: Request, res: Response) => {
    // Include the update data from the request body and return the updated building instead of the original
    const building = await Building.findByIdAndUpdate(req.params.id,req.body,{ new: true } );

    if(!building) return res.status(404).json({ success: false, msg: "Building not found" });

    res.status(200).json({ success: true, data: building, msg: "Building updated" });
});