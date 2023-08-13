import { Model, Schema, ObjectId } from 'mongoose';

export interface UserPointsHistoryProps {
    user_id: ObjectId;
    points_earned: number;
    transactions: String;
    transactions_date: Date;
    created_at: Date;
}

export const UserPointsHistorySchema: Schema<UserPointsHistoryProps> = new Schema(
    {
        user_id: { type: Schema.Types.ObjectId, ref: 'User' },
        points_earned: { type: Number, required: true },
        transactions: { type: String, required: true },
        transactions_date: { type: Date, required: true },
        created_at: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: 'UserPointsHistory',
    }
);

export const UserPointsHistoryModel: Model<UserPointsHistoryProps> = new Model(
    'UserPointsHistory',
    UserPointsHistorySchema
);
