import { Document, Schema, Model, model } from 'mongoose';

interface ISpace {
  name: string;
  area?: number;
  premise_id: Schema.Types.ObjectId;
  building_id: string;
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
  premise_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Premise',
  },
  building_id: {
    type: String,
    required: true,
  },
  floor: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  availabilities: [
    {
      user_id: {
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
    },
  ],
  reservations: [
    {
      user_id: {
        type: Schema.Types.ObjectId,
        required: true,
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
    },
  ],
});

const Space: Model<ISpaceModel> = model<ISpaceModel>('Space', spaceSchema);

export default Space;