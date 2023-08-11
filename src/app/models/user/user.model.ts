import mongoose, { Schema, Model, ObjectId } from 'mongoose';
import { HTTP_CREATED } from '../../constants/http-status/status';

export enum Role {
   ADMIN = 'admin',
   CUSTOMER = 'customer',
   STAFF = 'staff',
}
export interface UserProps {
   username: String;
   password: String;
   email: String;
   address: String[];
   phone: number;
   create_at: Date;
   last_login: Date;
   role: Role; // optional role 'admin', 'customer' or 'staff'
   loyalty_points: Number;
   is_verified: Boolean;
   reset_password_token: String;
   reset_password_expires: Date;
   verificationToken: String | null;
}
export const UserSchema: Schema<UserProps> = new Schema({
   username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 6,
   },
   password: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      minlength: 8,
   },
   email: { type: String, required: true, unique: true },
   address: { type: [String], required: true },
   phone: { type: Number, required: true },
   create_at: { type: Date, default: Date.now },
   last_login: { type: Date, default: Date.now },
   role: { type: String, enum: Object.values(Role), default: Role.CUSTOMER, required: true },
   loyalty_points: { type: Number, default: 0 },
   is_verified: { type: Boolean, default: false },
   reset_password_token: { type: String, default: null },
   reset_password_expires: { type: Date, default: null },
   verificationToken: {
      type: String,
      default: null,
      trim: true,
      index: { expires: '1.5h' },
   },
},{
   timestamps: true,
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
      collection: 'User',
});

export const UserModel: Model<UserProps> = mongoose.model('User', UserSchema);
