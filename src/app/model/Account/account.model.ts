import { IsInt, Length, MaxLength, Min, MinLength } from 'class-validator';
import {
   Column,
   CreateDateColumn,
   Entity,
   JoinColumn,
   OneToOne,
   PrimaryGeneratedColumn,
   UpdateDateColumn,
} from 'typeorm';
import { Detail_Information } from '../Detail_Information/detail_information.model';

const MAX_LENGTH = 20;
const MIN_LENGTH = 8;

@Entity('Account')
// id_RoleAccount
export class Account {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   @Length(MIN_LENGTH, MAX_LENGTH, {
      message: 'username is not enough lsong or too long',
   })
   username: string;

   @Column()
   @MaxLength(MAX_LENGTH, {
      message: 'password is too long',
   })
   @MinLength(MIN_LENGTH, {
      message: 'password is not enough length',
   })
   password: string;

   @Column({
      default: 0,
   })
   @Min(0)
   @IsInt()
   accumulated_Point: number;

   @Column({
      default: 0,
   })
   @Min(0)
   @IsInt()
   loyalty_Point: number;

   @Column({
      type: 'timestamptz',
      default: () => 'CURRENT_DATE',
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
   @OneToOne(() => Detail_Information)
   @JoinColumn({
      name: 'id_Detail_Information',
   })
   id_Detail_Information: Detail_Information;
}
