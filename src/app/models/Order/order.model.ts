import {
   Column,
   Entity,
   JoinColumn,
   JoinTable,
   ManyToMany,
   ManyToOne,
   PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from '../Account/account.model';
import { Movie } from '../Movie/movie.model';
import { Voucher } from '../Voucher/voucher.model';
import { Review } from '../Review/review.model';
import { Seat } from '../Seat/seat.model';

export enum Payment_Methods {
   MOMO = 'momo',
   ZALOPAY = 'zalopay',
   BANKING = 'banking',
   DIRECTLY = 'directly',
}

export enum payment_Status {
   PAID = 'paid',
   UNPAID = 'unpaid',
}

@Entity('Order')
export class Order {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({
      type: 'enum',
      enum: Payment_Methods,
   })
   payment_Methods: Payment_Methods;

   @Column({
      type: 'enum',
      enum: payment_Status,
      default: payment_Status.UNPAID,
   })
   payment_Status: payment_Status;

   @Column()
   payment_Date: Date;

   //Foreign_Key
   @ManyToOne(() => Account)
   @JoinColumn({
      name: 'id_Account',
   })
   account: Account;

   @ManyToOne(() => Movie)
   @JoinColumn({
      name: 'id_Movie',
   })
   movie: Movie;

   @ManyToOne(() => Review)
   @JoinColumn({
      name: 'id_Voucher',
   })
   Voucher: Voucher;

   @ManyToMany(() => Seat)
   @JoinTable({
      name: 'OrderDetailSeat',
   })
   seats: Seat[];
}
