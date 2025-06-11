import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../types';

export interface IMovie extends Document {
  title: string;
  description: string;
  thumbnailUrl: string;
  ratings: number;
  createdBy: IUser['_id'];
  createdAt: Date;
  updatedAt: Date;
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
      trim: true,
    },
    thumbnailUrl: {
      type: String,
      required: [true, 'thumbnailUrl is required'],
    },
    ratings: {
      type: Number,
      required: [true, 'ratings is required'],
      min: [0, 'Rating must be at least 0'],
      max: [5, 'Rating cannot be more than 5'],
      default: 0,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Creator is required'],
    },
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model<IMovie>('Movie', movieSchema);

export default Movie;
