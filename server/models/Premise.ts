import { Document, Schema, Model, model } from 'mongoose';

interface IPremise {
  name: string;
  address: string;
  spaces: Schema.Types.ObjectId[];
  buildings: {
    _id: string;
    floors: {
      floor: number;
      blueprint_url?: string;
    }[];
  }[];
  users: Schema.Types.ObjectId[];
}

interface IPremiseModel extends IPremise, Document {}

const premiseSchema = new Schema<IPremise>({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  address: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  spaces: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Space',
    },
  ],
  buildings: [
    {
      _id: {
        type: String,
        required: true,
      },
      floors: [
        {
          floor: {
            type: Number,
            required: true,
          },
          blueprint_url: String,
        },
      ],
    },
  ],
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const Premise: Model<IPremiseModel> = model<IPremiseModel>('Premise', premiseSchema);

export default Premise;