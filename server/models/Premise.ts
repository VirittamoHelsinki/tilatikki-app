import { type Document, Schema, type Model, model } from 'mongoose';
import { type ISpace } from './Space.js';
import { type IUser } from './User.js';

// For internal model definition only.
export interface IPremise extends Document {
  name: string;
  address: string;
  spaces: Schema.Types.ObjectId[] | ISpace[];
  buildings: {
    _id: string;
    floors: {
      floor: number;
      blueprint_url?: string;
    }[];
  }[];
  users: Schema.Types.ObjectId[] | IUser[];
}

// Typeguard to check if the value is of type IPremise[].
// TODO: Fix value typed any
export function isPremiseList(value: any): value is IPremise[] {
  return (
    Array.isArray(value) &&
    value.every(element => element instanceof Premise)
  );
}

const premiseSchema = new Schema<IPremise>({
  name: { type: String, required: true, minlength: 1, maxlength: 100, },
  address: { type: String, required: true, minlength: 1, maxlength: 100, },
  users: [{ type: Schema.Types.ObjectId, ref: 'User', }],
  spaces: [{ type: Schema.Types.ObjectId, ref: 'Space', }],
  buildings: [{
    name: {
      // Can also be a number or letter. Something that
      // identifies the building for the users.
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    floors: [{
      floor: { type: Number, required: true, },
      blueprint_url: String,
    }],
  }]
});

const Premise: Model<IPremise> = model<IPremise>('Premise', premiseSchema);

export default Premise;
