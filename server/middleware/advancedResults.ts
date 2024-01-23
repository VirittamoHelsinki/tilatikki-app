import { Request, NextFunction } from 'express';
import { CustomResponse } from '../types.js'
import Premise from '../models/Premise.js';

export const advancedResults = async (req: Request, res: CustomResponse<any>, next: NextFunction) => {
    let query;

    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude (these are not filtering fields)
    const removeFields = ['select', 'sort', 'page', 'limit'];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // Parse the query string to find premises with specific floor criteria
    let parsedQuery = JSON.parse(queryStr);

    // Modify the parsed query to filter through nested building floors
    if (parsedQuery.buildings && parsedQuery.buildings.floors) {
        const floors = parsedQuery.buildings.floors;
        parsedQuery = { 'buildings.floors.floor': floors }; // Adjust this based on your schema
    }

    // Finding resource
    query = Premise.find(parsedQuery);

    // Executing query
    const results = await query;

    // Send response
    res.advancedResults = {
        success: true,
        count: results.length,
        data: results
    };

    next();
};

export default advancedResults;