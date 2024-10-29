import { Column, Entity, JoinColumn, ObjectId, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from '../Account/account.model';

@Entity('Employee')
export class Employee {
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
      default: 'Role intended for employee on the cinema. Who have permission to support customer',
   })
   description: string;
}
