import { Schema, model } from 'mongoose';
export const keyTokenSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        publicKey: {
            type: String,
            required: true,
        },
        refreshToken: {
            type: Array,
            default: [],
        },
    },
    { collection: 'Keys', timestamps: true }
);

export const keyModel = model('Key', keyTokenSchema);
