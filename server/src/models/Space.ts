import { Schema, type Model, model } from "mongoose";
import { type ISpace } from "@shared/types/entity/space";

// Typeguard to check if the value is of type ISpace[].
export function isSpaceList(value: ISpace[]): value is ISpace[] {
  return (
    Array.isArray(value) && value.every((element) => element instanceof Space)
  );
}

const spaceSchema = new Schema<ISpace>({
  name: { type: String, required: true, minlength: 1, maxlength: 50 },
  area: Number,
  premise: { type: Schema.Types.ObjectId, required: true, ref: "Premise" },
  building: { type: Schema.Types.ObjectId, required: true },
  floor: { type: Number, required: true },
  availabilities: [{ type: Schema.Types.ObjectId, ref: "Availability" }],
  reservations: [{ type: Schema.Types.ObjectId, ref: "Reservation" }],
});

const Space: Model<ISpace> = model<ISpace>("Space", spaceSchema);

export default Space;
