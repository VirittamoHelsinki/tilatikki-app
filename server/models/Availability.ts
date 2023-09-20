import { Document, Schema, Model, model } from 'mongoose';

// Use this or remove?
export interface LAvailability {
  _id: Schema.Types.ObjectId;
  creator: Schema.Types.ObjectId;
  startdate: Date;
  enddate: Date;
  premise: Schema.Types.ObjectId;
  space: Schema.Types.ObjectId;
  reservations: Schema.Types.ObjectId[];
}

export interface IAvailability {
  //id: Schema.Types.ObjectId;
  creator: Schema.Types.ObjectId;
  startdate: Date;
  enddate: Date;
  premise: Schema.Types.ObjectId;
  space: Schema.Types.ObjectId;
  reservations: Schema.Types.ObjectId[];
}

interface IAvailabilityModel extends IAvailability, Document {}

const availabilitySchema = new Schema<IAvailability>({
  // Creator is only required for availabilities created by users.
  // Availabilities that might be added from APIs dont need a creator.
  // id: {
  //   type: Schema.Types.ObjectId,
  //   required: true
  // },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  startdate: {
    type: Date,
    required: true,
  },
  enddate: {
    type: Date,
    required: true,
  },
  premise: {
    type: Schema.Types.ObjectId,
    ref: 'Premise',
  },
  space: {
    type: Schema.Types.ObjectId,
    ref: 'Space',
  },
  reservations: [{
    type: Schema.Types.ObjectId,
    ref: 'Reservation',
  }]
});

const Availability: Model<IAvailabilityModel> = model<IAvailabilityModel>('Availability', availabilitySchema);

export default Availability;