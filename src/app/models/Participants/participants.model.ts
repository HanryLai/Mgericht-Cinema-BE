import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Seat } from '../Seat/seat.model';

@Entity('Participants')
export class Participant {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   name: string;

   @Column()
   description: string;

   @ManyToOne(() => Event)
   @JoinColumn({
      name: 'id_Event',
   })
   id_Event: Event;

   @ManyToOne(() => Seat)
   @JoinColumn({
      name: 'id_Seat',
   })
   id_Seat: Seat;
}
