import type { Document, Types, Schema } from "mongoose";
import { IUser } from "./user";
import { IBuilding } from "./building";

export interface IPremise extends Document {
  name: string;
  address: string;
  users: Schema.Types.ObjectId[] | IUser[];
  premise_facade: string[];
  buildings: Schema.Types.ObjectId[] | IBuilding[]
}

//

type getPremise = {
  success: boolean;
  premises: Document<unknown, {}, IPremise> & IPremise & {
    _id: Types.ObjectId;
  }
}
