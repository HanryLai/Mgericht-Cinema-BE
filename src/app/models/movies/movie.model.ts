import mongoose, { Schema, Model, ObjectId } from 'mongoose';

export type Rating = {
    user_id: ObjectId;
    rating: number;
    comment: string;
    create_at: Date;
};

export interface MovieProps {
    title: string;
    genre: [String];
    actors: [String];
    release_date: Date;
    director: String;
    duration: Number;
    trailer_url: String;
    created_at: Date;
    updated_at: Date;
    ratings: [Rating];
    poster_url: String;
    description: String;
}

export const MovieSchema: Schema<MovieProps> = new Schema(
    {
        title: { type: String, required: true, unique: true },
        genre: { type: [String], required: true },
        actors: { type: [String], required: true },
        release_date: { type: Date, required: true },
        director: { type: String, required: true },
        duration: { type: Number, required: true },
        trailer_url: { type: String, required: true },
        created_at: { type: Date, default: Date.now },
        updated_at: { type: Date, default: Date.now },
        ratings: [
            {
                user_id: { type: Schema.Types.ObjectId, ref: 'User' },
                rating: { type: Number, required: true },
                comment: { type: String, required: true },
                create_at: { type: Date, default: Date.now },
            },
        ],
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: 'Movies',
    }
);

export const MovieModel: Model<MovieProps> = new Model('Movie', MovieSchema);
