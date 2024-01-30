import mongoose from 'mongoose';

type FilterParams = {
  buildingId?: mongoose.Types.ObjectId;
  spaceId?: mongoose.Types.ObjectId;
  floor?: number;
  name?: string;  // New field for space name filtering
  reservedParam?: string;
};

//Aggregation stages used in the pipeline
// $match = filter
// $lookup = join
// $unwind = flatten
// $group = group
// $project = format output



export const createPremiseAggregationPipeline = (params: FilterParams): mongoose.PipelineStage[] => {
  const { buildingId, spaceId, floor, name, reservedParam } = params;
  const pipeline: mongoose.PipelineStage[] = [];



  return pipeline;
};


//http://localhost:5050/api/premise/6200ad77bc43fc001f4a0e21?building=65afba6ad46dd7e414fce57a&floor=1