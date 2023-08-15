import { Schema, Model, ObjectId } from 'mongoose';

export interface ShowtimesProps {
    movie_id: ObjectId;
    cinema_id: ObjectId;
    date_time: Date;
    available_seats: Number;
    created_at: Date;
    bookings: ObjectId[];
}
export const ShowtimesSchema: Schema<ShowtimesProps> = new Schema(
    {
        movie_id: { type: Schema.Types.ObjectId, ref: 'Movie', required: true },
        cinema_id: { type: Schema.Types.ObjectId, ref: 'Cinema', required: true },
        date_time: { type: Date, required: true },
        available_seats: { type: Number, required: true },
        created_at: { type: Date, default: Date.now },
        bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: 'Showtimes',
    }
);

export const ShowtimesModel: Model<ShowtimesProps> = new Model('Showtimes', ShowtimesSchema);
