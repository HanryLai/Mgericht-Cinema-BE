import { PaymentOptions } from '@/constants/payment-option/payment_options';
import { Schema, Model, ObjectId } from 'mongoose';
export interface PaymentProps {
    booking_id: ObjectId;
    payment_option: PaymentOptions;
    payment_date: Date;
    amount: number;
}

export const PaymentSchema: Schema<PaymentProps> = new Schema(
    {
        booking_id: { type: Schema.Types.ObjectId, ref: 'Booking' },
        payment_option: {
            type: String,
            enum: Object.values(PaymentOptions),
            default: PaymentOptions.CASH,
            required: true,
        },
        payment_date: { type: Date, default: Date.now, required: true },
        amount: { type: Number, default: 0, required: true },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: 'Payment',
    }
);

export const PaymentModel: Model<PaymentOptions> = new Model('Payment', PaymentSchema);
