import mongoose, { Schema, Model, ObjectId } from 'mongoose';
export interface TransactionHistoryProps {
    user_id: ObjectId;
    transaction_type: string;
    transaction_amount: number;
    transaction_date: Date;
}

export const TransactionHistorySchema: Schema<TransactionHistoryProps> = new Schema(
    {
        user_id: { type: Schema.Types.ObjectId, ref: 'User' },
        transaction_type: { type: String, required: true },
        transaction_amount: { type: Number, required: true },
        transaction_date: { type: Date, required: true },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: 'TransactionHistory',
    }
);

export const TransactionHistoryModel: Model<TransactionHistoryProps> = new Model(
    'TransactionHistory',
    TransactionHistorySchema
);
