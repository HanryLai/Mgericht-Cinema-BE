import { Schema, Model, ObjectId } from 'mongoose';

export interface ReviewsProps {
    user_id: ObjectId;
    movie_id: ObjectId;
    rating: Number;
    comment: String;
    created_at: Date;
}

export const ReviewsSchema: Schema<ReviewsProps> = new Schema(
    {
        user_id: { type: Schema.Types.ObjectId, ref: 'User' },
        movie_id: { type: Schema.Types.ObjectId, ref: 'Movie' },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        created_at: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: 'Reviews',
    }
);

export const ReviewsModel: Model<ReviewsProps> = new Model('Reviews', ReviewsSchema);
