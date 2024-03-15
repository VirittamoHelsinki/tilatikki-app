import type { Document, Schema } from "mongoose";
import { IPremise } from "./premise";
import { IAvailability } from "./availability";
import { IReservation } from "./reservation";

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  premises: Schema.Types.ObjectId[] | IPremise[];
  availabilities: Schema.Types.ObjectId[] | IAvailability[];
  reservations: Schema.Types.ObjectId[] | IReservation[];
  resetPasswordToken: string | undefined;
  resetPasswordExpire: Date | undefined;
  credentials: Schema.Types.ObjectId;
  getSignedJwtToken(): string;
  matchPassword(enteredPassword: string): Promise<boolean>;
  getResetPasswordToken(): string;
}
