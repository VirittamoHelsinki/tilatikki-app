import { type Request, type Response } from "express";
import Space from "../models/Space.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import Premise from "../models/Premise.js";

// Desc: Get all spaces
// @route GET /api/spaces
// @access Public
export const getAllSpace = asyncErrorHandler(
  async (_req: Request, res: Response) => {
    const spaces = await Space.find();
    res.status(200).json({ success: true, data: spaces });
  }
);

// Desc: Create new space
// @route POST /api/spaces
// @access Private
export const createSpace = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const { name, area, floor, premiseId, buildingId } = req.body;

    // Add validation here if needed
    if (!name) return res.status(400).json({ error: "Name is required" });
    if (!area) return res.status(400).json({ error: "Area is required" });
    if (!floor) return res.status(400).json({ error: "Floor is required" });

    // Check if for values to exists
    const premise = await Premise.findById(premiseId);
    if (!premise)
      return res
        .status(404)
        .json({ error: `Premise not found with id: ${premiseId}` });

    const building = premise.buildings.find(
      (b) => b._id.toString === buildingId
    );
    if (!building)
      return res
        .status(404)
        .json({ error: "Building not found with id: ${building}" });

    const space = new Space({
      name,
      area,
      floor,
      premise: premise,
      building: building,
    });

    const newSpace = await space.save();
    res.status(201).json({ success: true, data: newSpace });
  }
);

// Desc: Get a specific space by ID
// @route GET /api/spaces/:id
// @access Public
export const getSpaceById = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const space = await Space.findById(req.params.id);
    if (!space) {
      return res.status(404).json({ success: false, error: "Space not found" });
    }
    res.status(200).json({ success: true, data: space });
  }
);

// Desc: Update a space by ID
// @route PUT /api/spaces/:id
// @access Private
export const updateSpaceById = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const space = await Space.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!space) {
      return res.status(404).json({ success: false, error: "Space not found" });
    }
    res.status(200).json({ success: true, data: space });
  }
);

// Desc: Delete a space by ID
// @route DELETE /api/spaces/:id
// @access Private
export const deleteSpaceById = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const space = await Space.findByIdAndDelete(req.params.id);
    if (!space) {
      return res.status(404).json({ success: false, error: "Space not found" });
    }
    res.status(204).json();
  }
);
