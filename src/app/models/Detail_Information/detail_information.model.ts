import { Max, Min } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Detail_Information')
export class Detail_Information {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   @Max(20)
   fullName: string;

   @Column()
   detail_address: string;

   @Column()
   birthday: Date;

   @Column()
   gender: Boolean;

   @Column({
      unique: true,
      length: 10,
   })
   @Min(10, {
      message: 'Phone too short',
   })
   phone: string;

   @Column({ unique: true })
   email: string;
}
