import mongoose, { ObjectId } from 'mongoose';

export type Address = {
    lna: string;
    lng: string;
    street: string;
    city: string;
    state: string;
};
export enum Role {
    ADMIN = 'Admin',
    CUSTOMER = 'Customer',
    EMPLOYEE = 'Employee',
}
export interface IUser extends mongoose.Document {
    email: string;
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    phone: number;
    address: Address[];
    role: Role;
    cart: ObjectId;
    isBlocked: boolean;
    isVerified: boolean;
    passwordChangedAt: Date;
    passwordResetToken: String;
    passwordResetExpires: Date;
    verificationToken: string | null;
    createdAt: Date;
}
export const userSchema: mongoose.Schema<IUser> = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minlength: 6,
        },
        password: { type: String, required: true, trim: true, minlength: 8 },
        first_name: { type: String, required: true, trim: true },
        last_name: { type: String, required: true, trim: true },
        phone: { type: Number, required: true, trim: true },
        address: {
            type: [
                {
                    lna: { type: String, required: true, trim: true },
                    lng: { type: String, required: true, trim: true },
                    street: { type: String, required: true, trim: true },
                    city: { type: String, required: true, trim: true },
                    state: { type: String, required: true, trim: true },
                },
            ],
            trim: true,
        },
        //         role: {
        //             type: String,
        //             enum: Object.values(Role),
        //             default: Role.CUSTOMER,
        //             required: false,
        //         },
        //         cart: {
        //             type: mongoose.Types.ObjectId,
        //             ref: 'Cart',
        //             default: null,
        //         },
        passwordChangedAt: { type: Date, default: Date.now },
        passwordResetToken: { type: String, default: '' },
        passwordResetExpires: { type: Date },
        isVerified: { type: Boolean, default: false },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: 'users',
    }
);
export const userModel: mongoose.Model<IUser> = mongoose.model('user', userSchema);
