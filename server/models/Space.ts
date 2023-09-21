import { Document, Schema, Model, model } from 'mongoose';
import { IPremise } from './Premise';
import { IAvailability } from './Availability';
import { IReservation } from './Reservation';

// For internal model definition only.
export interface ISpace {
  name: string;
  area?: number;
  premise: Schema.Types.ObjectId | IPremise;
  building: Schema.Types.ObjectId;
  floor: Schema.Types.ObjectId;
  availabilities: Schema.Types.ObjectId[] | IAvailability[];
  reservations: Schema.Types.ObjectId[] | IReservation[];
}

// Use this interface for objects of this type. (adds _id field)
interface ISpaceModel extends ISpace, Document {}

// Typeguard to check if the value is of type ISpace[].
export function isSpaceList(value: any): value is ISpace[] {
  return (
    Array.isArray(value) &&
    value.every(element => element instanceof Space)
  );
}

const spaceSchema = new Schema<ISpace>({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  area: Number,
  premise: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Premise',
  },
  building: {
    type: Schema.Types.ObjectId,
    required: true
  },
  floor: {
    type: Number,
    required: true
  },
  availabilities: [{
    type: Schema.Types.ObjectId,
    ref: 'Availability'
  }],
  reservations: [{
    type: Schema.Types.ObjectId,
    ref: 'Reservation'
  }]
});

const Space: Model<ISpaceModel> = model<ISpaceModel>('Space', spaceSchema);

export default Space;