import { Model, Schema, model } from 'mongoose';
import { IUser } from './user.model';

export interface IKeyToken {
    user: IUser;
    publicKey: string;
    refreshToken: string[];
}

export const keyTokenSchema: Schema<IKeyToken> = new Schema({
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
        type: [String],
        default: [],
    },
});

export const keyModel: Model<IKeyToken> = model('Key', keyTokenSchema);
