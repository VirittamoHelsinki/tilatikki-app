import mongoose from 'mongoose';

type FilterParams = {
  buildingId?: mongoose.Types.ObjectId;
  spaceId?: mongoose.Types.ObjectId;
  floor?: number;
  name?: string; // New field for space name filtering
  reservedParam?: string;
};

//Aggregation stages used in the pipeline
// $match = filter
// $lookup = join
// $unwind = flatten
// $group = group
// $project = format output

export const createPremiseAggregationPipeline = (
  params: FilterParams
): mongoose.PipelineStage[] => {
  const { buildingId, spaceId, floor, name, reservedParam } = params;
  const pipeline: mongoose.PipelineStage[] = [];

  // Join with buildings to get detailed information
  pipeline.push({
    $lookup: {
      from: 'buildings',
      localField: 'buildings',
      foreignField: '_id',
      as: 'buildingDetails'
    }
  });

  // Unwind the buildingDetails for further operations
  pipeline.push({
    $unwind: {
      path: '$buildingDetails',
      preserveNullAndEmptyArrays: true
    }
  });

  // If a buildingId is specified, filter the buildings
  if (buildingId) {
    pipeline.push({
      $match: {
        'buildingDetails._id': buildingId
      }
    });
  }

  // Lookup for spaces
  pipeline.push({
    $lookup: {
      from: 'spaces',
      localField: 'buildingDetails.space',
      foreignField: '_id',
      as: 'spaceDetails'
    }
  });

  // Filter outlines, blueprints, and spaces if floor is specified
  if (floor !== undefined) {
    pipeline.push({
      $addFields: {
        'buildingDetails.outlines': {
          $filter: {
            input: '$buildingDetails.outlines',
            as: 'outline',
            cond: { $eq: ['$$outline.floor', floor] }
          }
        },
        'buildingDetails.blueprint': {
          $filter: {
            input: '$buildingDetails.blueprint',
            as: 'blueprint',
            cond: { $eq: ['$$blueprint.floor', floor] }
          }
        },
        spaceDetails: {
          $filter: {
            input: '$spaceDetails',
            as: 'spaceDetail',
            cond: { $eq: ['$$spaceDetail.floor', floor] }
          }
        }
      }
    });
  }

  // Add filtered or unfiltered space details to buildingDetails
  pipeline.push({
    $addFields: {
      'buildingDetails.space': '$spaceDetails'
    }
  });

  // If a spaceId is specified, filter the spaces after they've been populated
  if (spaceId) {
    pipeline.push({
      $match: {
        'buildingDetails.space._id': spaceId
      }
    });
  }

  // Adjusted grouping logic
  pipeline.push({
    $group: {
      _id: '$_id', // premise ID
      name: { $first: '$name' }, // Preserving premise name
      address: { $first: '$address' }, // Preserving premise address
      users: { $first: '$users' }, // Preserving associated users
      premise_facade: { $first: '$premise_facade' },
      buildingDetails: { $push: '$buildingDetails' } // Collecting building details
    }
  });

  // Adjust the final projection to format the output
  pipeline.push({
    $project: {
      _id: 1,
      name: 1,
      address: 1,
      premise_facade: 1,
      buildings: {
        $cond: {
          if: { $eq: [buildingId, undefined] },
          then: '$buildingDetails',
          else: { $arrayElemAt: ['$buildingDetails', 0] }
        }
      }
    }
  });

  return pipeline;
};

//http://localhost:5050/api/premise/6200ad77bc43fc001f4a0e21?building=65afba6ad46dd7e414fce57a&floor=1
