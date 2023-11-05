import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from '../Account/account.model';
import { Movie } from '../Movie/movie.model';

@Entity('Review')
export class Review {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   rate: number;

   @Column()
   comment: string;

   @Column({
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP',
   })
   create_At: Date;

   //Foreign_Keys

   @ManyToOne(() => Account)
   @JoinColumn({
      name: 'id_Account',
   })
   account: Account;

   @ManyToOne(() => Movie)
   @JoinColumn({
      name: 'id_Movie',
   })
   id_Movie: Movie;
}
