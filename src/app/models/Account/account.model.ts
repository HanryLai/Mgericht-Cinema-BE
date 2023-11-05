import { IsInt, Length, MaxLength, Min, MinLength, min } from 'class-validator';
import {
   Column,
   CreateDateColumn,
   Entity,
   JoinColumn,
   ObjectId,
   OneToOne,
   PrimaryGeneratedColumn,
   UpdateDateColumn,
} from 'typeorm';
import { Detail_Information } from '../Detail_Information/detail_information.model';

const MAX_LENGTH = 20;
const MIN_LENGTH = 8;

export enum Role_Account {
   ADMIN = 'admin',
   EMPLOYEE = 'employee',
   CUSTOMER = 'customer',
}

@Entity('Account')
// id_RoleAccount
export class Account {
   // create id type uuid
   @PrimaryGeneratedColumn('uuid')
   id: ObjectId;

   @Column({
      unique: true,
   })
   @Length(MIN_LENGTH, MAX_LENGTH, {
      message: 'username is not enough long or too long',
   })
   username: string;

   @Column()
   password: string;

   @Column({
      nullable: true,
   })
   accumulated_Point: number;

   @Column({
      nullable: true,
   })
   loyalty_Point: number;

   @Column({
      nullable: true,
   })
   last_Login: Date;

   @Column({
      default: false,
   })
   is_Verified: Boolean;

   @Column({
      nullable: true,
   })
   verification_Token: string;

   @CreateDateColumn()
   create_At: Date;

   @UpdateDateColumn()
   update_At: Date;

   // Foreign_Key
   @OneToOne(() => Detail_Information, {
      nullable: true,
   })
   @JoinColumn({
      name: 'id_Detail_Information',
   })
   id_Detail_Information: Detail_Information;

   @Column({
      type: 'enum',
      enum: Role_Account,
      default: Role_Account.CUSTOMER,
   })
   tmp_Role: Role_Account;
}
