import { Document, Schema, Model, model, SchemaTypes } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  premises: Schema.Types.ObjectId[];
  availabilities: Schema.Types.ObjectId[];
  reservations: Schema.Types.ObjectId[];
  getSignedJwtToken(): string;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
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
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false,
    },
    premises: [
      {
        // Premises that the user has access to.
        type: SchemaTypes.ObjectId,
        ref: "Premise",
      },
    ],
    availabilities: [
      {
        // Availabilities that the user has created.
        type: SchemaTypes.ObjectId,
        ref: "Availability",
      },
    ],
    reservations: [
      {
        // Reservations that the user has created.
        type: SchemaTypes.ObjectId,
        ref: "Reservation",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre<IUser>("save", async function (next) {
  const user = this;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function () {
  const user = this;
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET || "blablabla", {
    expiresIn: process.env.JWT_EXPIRE || "30",
  });
};

// Match user entered password to hashed password in the database
userSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
  const user = this;
  return await bcrypt.compare(enteredPassword, user.password);
};

const User: Model<IUser> = model<IUser>("User", userSchema);

export default User;