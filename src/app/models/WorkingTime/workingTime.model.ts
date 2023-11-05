import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WorkingTime {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   time_In: Date;

   @Column()
   time_Out: Date;
}
