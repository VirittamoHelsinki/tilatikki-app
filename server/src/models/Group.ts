import { Schema, model } from "mongoose";
import { type IGroup } from "@shared/types/api/group";

const groupSchema = new Schema<IGroup>({
    studentSize: { type: Number, required: true },
    teachers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    reservations: [{ type: Schema.Types.ObjectId, ref: "Reservation" }],
});

const Group = model<IGroup>("Group", groupSchema);

export default Group;
