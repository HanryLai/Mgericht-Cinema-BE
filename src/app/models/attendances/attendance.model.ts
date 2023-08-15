import { Schema, Model, ObjectId } from 'mongoose';

export interface AttendanceProps {
    staff_id: ObjectId;
    check_in: boolean;
    check_out: boolean;
    worked_hours: number;
    salary: number;
}

export const AttendanceSchema: Schema<AttendanceProps> = new Schema(
    {
        staff_id: { type: Schema.Types.ObjectId, ref: 'CinemaStaff', required: true },
        check_in: { type: Boolean, default: false },
        check_out: { type: Boolean, default: false },
        worked_hours: { type: Number, default: 0 },
        salary: { type: Number, default: 0 },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: 'Attendance',
    }
);
export const AttendanceModel: Model<AttendanceProps> = new Model('Attendance', AttendanceSchema);
