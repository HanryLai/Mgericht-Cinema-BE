import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Detail_Information')
export class Detail_Information {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   fullName: string;

   @Column()
   detail_address: string;

   @Column()
   birthday: Date;

   @Column()
   gender: Boolean;

   @Column()
   phone: string;

   @Column({ unique: true })
   email: string;
}
