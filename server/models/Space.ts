import { Document, Schema, Model, model } from 'mongoose';

import { LAvailability, IAvailability } from './Availability';

export interface ISpace {
  name: string;
  area?: number;
  premise: Schema.Types.ObjectId;
  building: Schema.Types.ObjectId;
  floor: Schema.Types.ObjectId;
  availabilities: Schema.Types.ObjectId[] | object[]//LAvailability[];
  reservations: Schema.Types.ObjectId[];
}

interface ISpaceModel extends ISpace, Document {}

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