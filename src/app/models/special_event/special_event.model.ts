import { Model, Schema, ObjectId } from 'mongoose';

export interface SpecialEventProps {
    title: String;
    description: String;
    event_date: Date;
    registrantion_start: Date;
    registrantion_end: Date;
    created_at: Date;
}

export const SpecialEventSchema: Schema<SpecialEventProps> = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        event_date: { type: Date, required: true },
        registrantion_start: { type: Date, required: true },
        registrantion_end: { type: Date, required: true },
        created_at: { type: Date, required: true, default: Date.now },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: 'SpecialEvent',
    }
);

export const SpecialEventProps: Model<SpecialEventProps> = new Model('SpecialEvent', SpecialEventSchema);
