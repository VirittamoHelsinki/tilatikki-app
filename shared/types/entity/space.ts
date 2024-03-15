import type { Document, Schema } from "mongoose";
import { IPremise } from "./premise";
import { IAvailability } from "./availability";
import { IReservation } from "./reservation";

export interface ISpace extends Document {
  name: string;
  area?: number;
  premise: Schema.Types.ObjectId | IPremise;
  building: Schema.Types.ObjectId;
  floor: Schema.Types.ObjectId;
  availabilities: Schema.Types.ObjectId[] | IAvailability[];
  reservations: Schema.Types.ObjectId[] | IReservation[];
}
