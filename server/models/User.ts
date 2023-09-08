import { Document, Schema, Model, model } from 'mongoose';

interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  passwordHash: string;
  premises: Schema.Types.ObjectId[];
  availabilities: Schema.Types.ObjectId[];
  reservations: Schema.Types.ObjectId[];
}

interface IUserModel extends IUser, Document {}

const userSchema = new Schema<IUser>({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  premises: [{
      // Premises that the user has access to.
      type: Schema.Types.ObjectId,
      ref: 'Premise',
  }],
  availabilities: [{
      // Availabilities that the user has created.
      type: Schema.Types.ObjectId,
      ref: 'Availability',
  }],
  reservations: [{
      // Reservations that the user has created.
      type: Schema.Types.ObjectId,
      ref: 'Reservation',
  }]
});

const User: Model<IUserModel> = model<IUserModel>('User', userSchema);

export default User;