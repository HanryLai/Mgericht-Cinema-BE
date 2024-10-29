import { Column, Entity, JoinColumn, ObjectId, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from '../Account/account.model';

@Entity('Customer')
export class Customer {
   @PrimaryGeneratedColumn('uuid')
   id: ObjectId;

   @OneToOne(() => Account, {
      nullable: false,
   })
   @JoinColumn({
      name: 'id_Account',
   })
   id_Account: Account;

   @Column({
      default:
         'Role intended for customer. Who have permission to booking,paying,management account of their',
   })
   description: string;
}
