import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { WorkingTime } from '../WorkingTime/workingTime.model';

export enum Working_Status {
   EMPTY = 'empty',
   WORKED = 'worked',
   LATE = 'late',
}

@Entity('TimeSheet')
export class TimeSheet {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({
      type: 'enum',
      enum: Working_Status,
      default: Working_Status.WORKED,
   })
   working_Status: Working_Status;

   @Column()
   time_In: Date;

   @Column()
   time_Out: Date;

   @Column({
      default: 0,
   })
   total_Time: number;

   //Foreign_Keys

   @ManyToOne(() => WorkingTime)
   @JoinColumn({
      name: 'id_WorkingTime',
   })
   id_WorkingTime: WorkingTime;
}
