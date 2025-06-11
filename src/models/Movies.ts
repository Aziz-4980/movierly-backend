import { Schema, Types } from 'mongoose';

interface IMovie {
  _id: Types.ObjectId;
  title: string;
  description: string;
  thumbnailUrl: string;
  ratings: number;
  createdBy: string;
}

const movieSchema = new Schema<IMovie>(
  {
    title: {
      type: String,
      required: [true, 'title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'description is required'],
      unique: true,
      trim: true,
    },
    thumbnailUrl: {
      type: String,
      required: [true, 'thumbnailUrl is required'],
    },
    ratings: {
      type: Number,
      required: [true, 'ratings is required'],
    },

    createdBy: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);
