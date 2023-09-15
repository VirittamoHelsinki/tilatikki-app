import { Document, Schema, Model, model } from 'mongoose';

export interface ISpace {
  name: string;
  area?: number;
  premise: Schema.Types.ObjectId;
  building: Schema.Types.ObjectId;
  floor: Schema.Types.ObjectId;
  availabilities: {
    user_id?: Schema.Types.ObjectId;
    startdate: Date;
    enddate: Date;
  }[];
  reservations: {
    user_id: Schema.Types.ObjectId;
    startdate: Date;
    enddate: Date;
  }[];
}

interface ISpaceModel extends ISpace, Document {}

const spaceSchema = new Schema<ISpace>({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  area: Number,
  premise: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Premise',
  },
  building: {
    type: Schema.Types.ObjectId,
    required: true
  },
  floor: {
    type: Number,
    required: true
  }
});

const Space: Model<ISpaceModel> = model<ISpaceModel>('Space', spaceSchema);

export default Space;