import { Model, Schema } from 'mongoose';

export interface LoyaltyProgramProps {
    name: String;
    description: String;
    points_per_purchase?: number;
    discount_rate?: number;
    discount_type?: string;
    vali_from: Date;
    vali_to: Date;
    created_at: Date;
}
export const LoyaltyProgramSchema: Schema<LoyaltyProgramProps> = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        points_per_purchase: { type: Number },
        discount_rate: { type: Number },
        discount_type: { type: String },
        vali_from: { type: Date, required: true },
        vali_to: { type: Date, required: true },
        created_at: { type: Date, required: true, default: Date.now },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: 'LoyaltyProgram',
    }
);

export const LoyaltyProgramModel: Model<LoyaltyProgramProps> = mongoose.model('LoyaltyProgram', LoyaltyProgramSchema);
