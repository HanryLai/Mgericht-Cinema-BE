import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { WorkingTime } from '../WorkingTime/workingTime.model';

@Entity('ScheduleWorking')
// employee_id
export class ScheduleWorking {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({
      default: true,
   })
   is_Active: Boolean;

   @ManyToOne(() => WorkingTime)
   @JoinColumn({
      name: 'id_WorkingTime',
   })
   id_WorkingTime: WorkingTime;
}
