import mongoose, { Schema, Model, ObjectId } from 'mongoose';

export type Address = {
   street: String;
   city: String;
   state: String;
};

export interface CinemaProps {
   name: String;
   address: [Address];
   phone: Number;
   seat: number;
   avaliable_seat: number;
   created_at: Date;
   showtimes: [ObjectId];
}

export const CinemaSchema: Schema<CinemaProps> = new Schema(
   {
      name: { type: String, required: true, unique: true, trim: true },
      address: {
         type: [
            {
               street: { type: String, required: true },
               city: { type: String, required: true },
               state: { type: String, required: true },
            },
         ],
         required: true,
      },
      phone: { type: Number, required: true },
      seat: { type: Number, required: true },
      avaliable_seat: { type: Number, required: true },
      created_at: { type: Date, default: Date.now },
      showtimes: [{ type: Schema.Types.ObjectId, ref: 'Showtime' }],
   },
   {
      timestamps: true,
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
      collection: 'Cinemas',
   }
);

export const CinemaModel: Model<CinemaProps> = mongoose.model('Cinema', CinemaSchema);
