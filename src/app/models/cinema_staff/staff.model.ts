import { Schema, Model, ObjectId } from 'mongoose';

export interface CinemaStaffProps {
    user_id: ObjectId;
    cinema_id: ObjectId;
    role: string;
    schedule: string;
    created_at: Date;
}

export const CinemaStaffSchema: Schema<CinemaStaffProps> = new Schema(
    {
        user_id: { type: Schema.Types.ObjectId, ref: 'User' },
        cinema_id: { type: Schema.Types.ObjectId, ref: 'Cinema' },
        role: { type: String, required: true },
        schedule: { type: String, required: true },
        created_at: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: 'CinemaStaff',
    }
);

export const CinemaStaffModel: Model<CinemaStaffProps> = new Model('CinemaStaff', CinemaStaffSchema);
