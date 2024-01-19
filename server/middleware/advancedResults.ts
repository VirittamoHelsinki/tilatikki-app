import { Request, NextFunction } from 'express';
import { CustomResponse } from '../types.js'
import Premise from '../models/Premise.js';

export const advancedResults = async (req: Request, res: CustomResponse<any>, next: NextFunction) => {
    let query;

    // Assuming floors query is in the format: floors=2
    const floorNumber = req.query.floors;

    if (floorNumber) {
        // Use MongoDB's $elemMatch to match nested documents
        query = Premise.find({
            buildings: {
                $elemMatch: {
                    floors: {
                        $elemMatch: {
                            floor: Number(floorNumber)
                        }
                    }
                }
            }
        });
    } else {
        query = Premise.find({});
    }

    const results = await query;

    res.advancedResults = {
        success: true,
        count: results.length,
        data: results
    };

    next();

    next();
};

export default advancedResults;