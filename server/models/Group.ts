import { Schema, model, Document } from "mongoose";
import { type IUser } from "./User.js";
import { type IReservation } from "./Reservation.js";


export interface IGroup extends Document {
    studentSize: number;
    teachers: Schema.Types.ObjectId[] | IUser[];
    reservations: Schema.Types.ObjectId[] | IReservation[];

}


const groupSchema = new Schema<IGroup>({
    studentSize: { type: Number, required: true },
    teachers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    reservations: [{ type: Schema.Types.ObjectId, ref: "Reservation" }],
});

const Group = model<IGroup>("Group", groupSchema);

export default Group;
