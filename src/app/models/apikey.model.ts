import { Schema, Types, model } from 'mongoose';

export const apiKeySchema = new Schema(
    {
        key: {
            type: String,
            required: true,
            unique: true,
        },
        status: {
            type: Boolean,
            default: true,
        },
        permissions: {
            type: String,
            required: true,
            enum: ['0000', '1111', '2222'],
        },
    },
    { collection: 'ApiKeys', timestamps: true }
);
export const apiKeyModel = model('ApiKey', apiKeySchema);
