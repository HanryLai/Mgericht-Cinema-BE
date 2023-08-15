import mongoose, { Schema, Model, ObjectId } from 'mongoose';

export interface SystemLogProps {
    user_id: ObjectId;
    activity: string;
    description: string;
    timestamp: Date;
}
export const SystemLogSchema: Schema<SystemLogProps> = new Schema(
    {
        user_id: { type: Schema.Types.ObjectId, ref: 'User' },
        activity: { type: String, required: true },
        description: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: 'SystemLog',
    }
);

export const SystemLogModel: Model<SystemLogProps> = new Model('SystemLog', SystemLogSchema);
