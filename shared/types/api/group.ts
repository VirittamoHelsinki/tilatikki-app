import type { Document, Schema } from "mongoose";
import { IUser } from "./user";
import { IReservation } from "./reservation";

export interface IGroup extends Document {
  studentSize: number;
  teachers: Schema.Types.ObjectId[] | IUser[];
  reservations: Schema.Types.ObjectId[] | IReservation[];
}
