import type { Document, Schema } from "mongoose";
import { IUser } from "./user";
import { IPremise } from "./premise";
import { ISpace } from "./space";
import { IAvailability } from "./availability";

export interface IReservation extends Document {
  creator: Schema.Types.ObjectId | IUser;
  startdate: Date;
  enddate: Date;
  premise: Schema.Types.ObjectId | IPremise;
  space: Schema.Types.ObjectId | ISpace;
  availability: Schema.Types.ObjectId | IAvailability;
}
