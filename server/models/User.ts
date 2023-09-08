import { Document, Schema, Model, model } from 'mongoose';

interface IUser {
  firstname: string;
  lastname?: string;
  email: string;
  passwordHash: string;
  premises: Schema.Types.ObjectId[];
}

interface IUserModel extends IUser, Document {}

const userSchema = new Schema<IUser>({
  firstname: {
    type: String,
    required: true,
  },
  lastname: String,
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  premises: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Premise',
    },
  ],
});

const User: Model<IUserModel> = model<IUserModel>('User', userSchema);

export default User;