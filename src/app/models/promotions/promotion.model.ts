import { Schema, Model } from 'mongoose';

export interface PromotionProps {
    name: string;
    description: string;
    discount_code: string;
    valid_from: string;
    valid_to: string;
    create_at: Date;
}

export const PromotionSchema: Schema<PromotionProps> = new Schema(
    {
        name: { type: 'string', required: true },
        description: { type: 'string', required: true },
        discount_code: { type: 'string', required: true },
        valid_from: { type: 'string', required: true },
        valid_to: { type: 'string', required: true },
        create_at: { type: 'Date', required: true },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: 'Promotion',
    }
);

export const PromotionModel: Model<PromotionProps> = new Model('Promotion', PromotionSchema);
