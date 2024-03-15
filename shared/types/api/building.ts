import type { Document, Schema } from "mongoose";
import { ISpace } from "./space";

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
  space: {_id: Schema.Types.ObjectId[] | ISpace[]}[];
}
