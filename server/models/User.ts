import { type Document, Schema, type Model, model } from "mongoose";
import crypto from "node:crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { type IReservation } from "./Reservation.js";
import { type IAvailability } from "./Availability.js";
import { type IPremise } from "./Premise.js";
import * as config from "../utils/config.js";

// For internal model definition only.
export interface IUser extends Document {
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

// Typeguard to check if the value is of type IUser[].
export function isUserList(value: IUser[]): value is IUser[] {
  return (
    Array.isArray(value) && value.every((element) => element instanceof User)
  );
}

const userSchema = new Schema<IUser>(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: {
      type: String,
      required: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false,
    },
    // Premises that the user has access to.
    premises: [{ type: Schema.ObjectId, ref: "Premise" }],
    role: { type: String, enum: ["user", "admin"], default: "user" },
    // Availabilities that the user has created.
    availabilities: [{ type: Schema.ObjectId, ref: "Availability" }],
    // Reservations that the user has created.
    reservations: [{ type: Schema.ObjectId, ref: "Reservation" }],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    // Credentials that the user has created.
    credentials: { type: Schema.ObjectId, ref: "Credential" },
  },
  { timestamps: true },
);

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;

  next();
});

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, config.jwtSecret, {
    expiresIn: config.jwtExpire,
  });
};

// Match user entered password to hashed password in the database
userSchema.methods.matchPassword = async function (
  enteredPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
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
