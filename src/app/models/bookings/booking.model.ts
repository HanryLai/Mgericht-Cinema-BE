import { Schema, Model, ObjectId } from 'mongoose';

export enum PaymentOptions {
    NEW = 'NEW',
    PAYED = 'PAYED',
    CANCELED = 'CANCELED',
    REFUNDED = 'REFUNDED',
}
export interface BookingProps {
    user_id: ObjectId;
    showtime_id: ObjectId;
    total_ticket: number;
    total_amount: number;
    payment_status: PaymentOptions;
    booking_date: Date;
    created_at: Date;
}

export const BookingSchema: Schema<BookingProps> = new Schema(
    {
        user_id: { type: Schema.Types.ObjectId, ref: 'User' },
        showtime_id: { type: Schema.Types.ObjectId, ref: 'Showtime' },
        total_ticket: { type: Number, default: 0 },
        total_amount: { type: Number, default: 0 },
        payment_status: { type: String, enum: Object.values(PaymentOptions), default: PaymentOptions.NEW },
        booking_date: { type: Date, default: Date.now },
        created_at: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: 'Booking',
    }
);

export const BookingModel: Model<BookingProps> = mongoose.model('Booking', BookingSchema);
