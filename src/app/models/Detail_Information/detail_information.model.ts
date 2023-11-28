import { Max, Min } from 'class-validator';
import { Column, Entity, ObjectId, PrimaryGeneratedColumn } from 'typeorm';

export interface Detail_Information_Interface {
   id: ObjectId;
   fullName?: string;
   detail_address?: string;
   birthday?: Date;
   gender?: Boolean;
   phone?: string;
   email?: string;
}

@Entity('Detail_Information')
export class Detail_Information {
   @PrimaryGeneratedColumn('uuid')
   id: ObjectId;

   @Column({
      nullable: true,
   })
   @Max(20)
   fullName: string;

   @Column({
      nullable: true,
   })
   detail_address: string;

   @Column({
      nullable: true,
   })
   birthday: Date;

   @Column({
      nullable: true,
   })
   gender: Boolean;

   @Column({
      unique: true,
      length: 10,
      nullable: true,
   })
   @Min(10, {
      message: 'Phone too short',
   })
   phone: string;

   @Column({ unique: true, nullable: true })
   email: string;
}
