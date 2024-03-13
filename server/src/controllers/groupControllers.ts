import { type Request, type Response } from "express";
import Group from "../models/Group";
import asyncHandler from "../middleware/asyncErrorHandler";


// Desc: Get all groups
// @route GET /api/group
// @access Public

export const getAllGroups = asyncHandler(async (_req: Request, res: Response) => {
    const groups = await Group.find({});

        if(!groups) return res.status(404).json({ success: false, msg: "No groups found" });

    res.status(200).json({ success: true, data: groups });

    }
);

//Desc: Get single group
//@route GET /api/group/:id
//@access Public

export const getSingleGroup = asyncHandler(async (req: Request, res: Response) => {
    const group = await Group.findById(req.params.id);

        if(!group) return res.status(404).json({ success: false, msg: "Group not found" });

    res.status(200).json({ success: true, data: group });

    }
)

