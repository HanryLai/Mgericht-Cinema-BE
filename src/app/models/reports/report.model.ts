import { Model, Schema } from 'mongoose';

export interface ReportProps {
    report_type: string;
    content: string;
    generated_at: Date;
    created_at: string;
}
export const ReportSchema: Schema<ReportProps> = new Schema(
    {
        report_type: { type: String, required: true },
        content: { type: String, required: true },
        generated_at: { type: Date, required: true },
        created_at: { type: String, required: true },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: 'Report',
    }
);

export const ReportModel: Model<ReportProps> = new Model('Report', ReportSchema);
