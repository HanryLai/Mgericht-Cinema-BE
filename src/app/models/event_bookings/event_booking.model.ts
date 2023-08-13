import { Model, ObjectId, Schema } from 'mongoose';
import { PaymentOptions } from '../bookings/booking.model';
export interface EventBookingProps {
    user_id: ObjectId;
    event_id: ObjectId;
    total_ticket: number;
    total_amount: number;
    payment_status: PaymentOptions;
    booking_date: Date;
    created_at: Date;
}

export const EventBookingSchema: Schema<EventBookingProps> = new Schema(
    {
        user_id: { type: Schema.Types.ObjectId, ref: 'User' },
        event_id: { type: Schema.Types.ObjectId, ref: 'Event' },
        total_ticket: { type: Number, required: true },
        total_amount: { type: Number, required: true },
        payment_status: {
            type: String,
            required: true,
            enum: Object.values(PaymentOptions),
            default: PaymentOptions.NEW,
        },
        booking_date: { type: Date, required: true },
        created_at: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: 'EventBooking',
    }
);
export const EventBookingModel: Model<EventBookingProps> = new Model('EventBooking', EventBookingSchema);
