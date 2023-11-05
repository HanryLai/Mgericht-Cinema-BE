import { Column, PrimaryGeneratedColumn } from 'typeorm';

export enum Type_Discount {
   PERCENT = 'percent',
   MONEY = 'money',
   changePrice = 'chang_Price',
}

export class Voucher {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({
      length: 8,
   })
   name: string;

   @Column({
      type: 'enum',
      enum: Type_Discount,
      default: Type_Discount.PERCENT,
   })
   type_Discount: Type_Discount;

   @Column()
   discount: number;

   @Column()
   quantity: number;

   @Column()
   description: string;

   @Column()
   date_Effect: Date;

   @Column()
   date_Expire: Date;
}
