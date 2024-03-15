import { Schema, type Model, model } from "mongoose";
import { IPremise } from "@shared/types/entity/premise";

// Typeguard to check if the value is of type IPremise[].
export function isPremiseList(value: IPremise[]): value is IPremise[] {
  return (
    Array.isArray(value) && value.every((element) => element instanceof Premise)
  );
}

const premiseSchema = new Schema<IPremise>({
  name: { type: String, required: true, minlength: 1, maxlength: 100 },
  address: { type: String, required: true, minlength: 1, maxlength: 100 },
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  premise_facade: [],
  buildings: [{type: Schema.Types.ObjectId,ref: "Building"}],
});

const Premise: Model<IPremise> = model<IPremise>("Premise", premiseSchema);

export default Premise;
