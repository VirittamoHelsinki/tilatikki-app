import { Document, Schema, Model, model, SchemaTypes } from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtSecret, jwtExpire } from "../utils/config";
import { IReservation } from "./Reservation";
import { IAvailability } from "./Availability";
import { IPremise } from "./Premise";

// For internal model definition only.
export interface SchemaUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  premises: Schema.Types.ObjectId[] | IPremise[];
  availabilities: Schema.Types.ObjectId[] | IAvailability[];
  reservations: Schema.Types.ObjectId[] | IReservation[];
  resetPasswordToken: string | undefined;
  resetPasswordExpire: Date | undefined;
  credentials: Schema.Types.ObjectId;
  getSignedJwtToken(): string;
  matchPassword(enteredPassword: string): Promise<boolean>;
  getResetPasswordToken(): string;
}

// Use this interface for objects of this type. (adds _id field)
export interface IUser extends SchemaUser, Document {}

// Typeguard to check if the value is of type IUser[].
export function isUserList(value: any): value is IUser[] {
  return (
    Array.isArray(value) &&
    value.every(element => element instanceof User)
  );
}

const userSchema = new Schema<SchemaUser>(
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
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
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
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    credentials: {
      // Credentials that the user has created.
      type: SchemaTypes.ObjectId,
      ref: "Credential",
    },
  },
  { timestamps: true }
);

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) next();

  const user = this;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function () {
  const user = this;
  return jwt.sign({ id: user._id }, jwtSecret, {
    expiresIn: jwtExpire,
  });
};

// Match user entered password to hashed password in the database
userSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  const user = this;
  return await bcrypt.compare(enteredPassword, user.password);
};

// Generate and hash password token

userSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");
  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User: Model<IUser> = model<IUser>("User", userSchema);

export default User;
