import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Review } from '../Review/review.model';
import { Account } from '../Account/account.model';

export enum Vote {
   LIKE = 'like',
   DISLIKE = 'dislike',
}

@Entity('Like_Or_Dislike')
export class LikeOrDislike {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({
      type: 'enum',
      enum: Vote,
      default: Vote.LIKE,
   })
   vote: Vote;

   @ManyToOne(() => Review)
   @JoinColumn({
      name: 'id_Review',
   })
   id_Review: Review;

   @ManyToOne(() => Account)
   @JoinColumn({
      name: 'id_Account',
   })
   id_Account: Account;
}
