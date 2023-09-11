import { Document, Schema, Model, model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
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
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ],
  },
  passwordHash: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  premises: [
    {
      // Premises that the user has access to.
      type: Schema.Types.ObjectId,
      ref: "Premise",
    },
  ],
  availabilities: [
    {
      // Availabilities that the user has created.
      type: Schema.Types.ObjectId,
      ref: "Availability",
    },
  ],
  reservations: [
    {
      // Reservations that the user has created.
      type: Schema.Types.ObjectId,
      ref: "Reservation",
    },
  ],
});

userSchema.pre('save', async function(next) {
  const user = this as IUserModel;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.passwordHash, salt);
  user.passwordHash = hash;
  next();
});

const User: Model<IUserModel> = model<IUserModel>("User", userSchema);

export default User;
