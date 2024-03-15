import { Schema, Model, model } from "mongoose";
import { type IAvailability } from "@shared/types/api/availability";

// Typeguard to check if the value is of type IAvailability.
export function isAvailability(value: IAvailability): value is IAvailability {
  return (
    value &&
    value._id instanceof Schema.Types.ObjectId &&
    value.startdate instanceof Date &&
    value.enddate instanceof Date &&
    value.creator instanceof Schema.Types.ObjectId &&
    value.premise instanceof Schema.Types.ObjectId &&
    value.space instanceof Schema.Types.ObjectId &&
    value.reservations.every(
      (element) => element instanceof Schema.Types.ObjectId
    )
  );
}

// Typeguard to check if the value is of type IAvailability[].
export function isAvailabilityList(
  value: Schema.Types.ObjectId[] | IAvailability[]
) {
  return (
    Array.isArray(value) &&
    value.every((element) => element instanceof Availability)
  );
}

const availabilitySchema = new Schema<IAvailability>({
  // Creator is only required for availabilities created by users.
  // Availabilities that might be added from APIs dont need a creator.
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  startdate: { type: Date, required: true },
  enddate: { type: Date, required: true },
  premise: { type: Schema.Types.ObjectId, ref: "Premise" },
  space: { type: Schema.Types.ObjectId, ref: "Space" },
  reservations: [{ type: Schema.Types.ObjectId, ref: "Reservation" }],
});

const Availability: Model<IAvailability> = model<IAvailability>(
  "Availability",
  availabilitySchema
);

export default Availability;
