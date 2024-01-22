import { Schema, model, Document } from "mongoose";
import { ISpace } from "./Space.js";

export interface IBuilding extends Document {
  name: string;
  floors: number;
  rooms: number 
  outlines:{
    floor: number;
    image: string;
  }[],
  blueprint: {
    floor: number;
    image: string;
  }[];
  facade: string[];
  space: {
    _id: Schema.Types.ObjectId[] | ISpace[];
  }[];
}

// Define the building schema.
const buildingSchema = new Schema<IBuilding>({
  name: { type: String, required: true, minlength: 1, maxlength: 100 },
  floors: { type: Number, required: true },
  rooms: { type: Number, require: true }, // Adjust the ref if the model name is different
  outlines: [{ 
    floor: { 
        type: Number, 
        required: true 
    },
    image: { 
        type: String, 
        required: true 
    }
   }],
  blueprint: [{
    floor: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  
  }],
  facade: [], // Replace with the specific schema if the structure is known
  space: [{ 
    type: Schema.Types.ObjectId, 
    ref: "Space" 
}]
});

// Create the model.
const Building = model<IBuilding>("Building", buildingSchema);

export default Building;