import { Document, Schema, Model, model } from 'mongoose';

interface IReservation {
  creator: Schema.Types.ObjectId;
  startdate: Date;
  enddate: Date;
  premise: Schema.Types.ObjectId;
  space: Schema.Types.ObjectId;
  availability: Schema.Types.ObjectId;
}

interface IReservationModel extends IReservation, Document {}

const reservationSchema = new Schema<IReservation>({
  // Creator is only required for availabilities created by users.
  // Availabilities that might be added from APIs dont need a creator.
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
  availability: {
    type: Schema.Types.ObjectId,
    ref: 'Availability',
  }
});

const Reservation: Model<IReservationModel> = model<IReservationModel>('Reservation', reservationSchema);

export default Reservation;