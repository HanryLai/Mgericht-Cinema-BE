import { Column, Entity, JoinColumn, ObjectId, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from '../Account/account.model';

@Entity('Admin')
export class Admin {
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
         'Role intended for admin. Who is system owner, and have all permission in the system',
   })
   description: string;
}
