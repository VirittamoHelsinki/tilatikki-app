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
    maxlength: 100,
  },
  address: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  spaces: [{
    type: Schema.Types.ObjectId,
    ref: 'Space',
  }],
  buildings: [{
    name: {
      // Can also be a number or letter. Something that
      // identifies the building for the users.
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    floors: [{
      floor: {
        type: Number,
        required: true,
      },
      blueprint_url: String,
    }],
  }]
});

const Premise: Model<IPremiseModel> = model<IPremiseModel>('Premise', premiseSchema);

export default Premise;